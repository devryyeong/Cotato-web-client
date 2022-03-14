import React, { useState, useEffect, useRef, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"
import CustomToolbar from "./CustomToolbar"
import { applyMiddleware } from "redux"
import ImageResize from "quill-image-resize"
Quill.register("modules/ImageResize", ImageResize)

const PostCreate = ({ postService }) => {
  const [PostTitle, setPostTitle] = useState("")
  const [PostDesc, setPostDesc] = useState("")
  const [FileName, setFileName] = useState("") //이미지 처리를 위한 상태
  const [PostList, setPostList] = useState([])
  const quillRef = useRef()

  const category = useParams()
  const navigate = useNavigate()

  const onTitleChange = (e) => {
    setPostTitle(e.target.value)
  }

  const onDescChange = (value) => {
    setPostDesc(value)
  }

  //////////////////////////// react-quill ////////////////////////////
  const imageHandler = () => {
    const input = document.createElement("input")

    input.setAttribute("type", "file")
    input.setAttribute("accept", "image/*")
    input.click()

    input.addEventListener("change", async () => {
      var file = input.files[0]
      var formData = new FormData()

      formData.append("img", file)

      console.log(formData)
      var filename = file.name
      console.log(filename)
      try {
        const result = await axios.post(
          "http://localhost:8080/cotato/img",
          formData
        )
        console.log(result)

        console.log("성공 시, 백엔드가 보내주는 데이터", result.data.url)
        const IMG_URL = result.data.url

        const editor = quillRef.current.getEditor()
        const range = editor.getSelection()
        editor.insertEmbed(range.index, "image", IMG_URL)
      } catch (error) {
        console.log("실패했어요ㅠ")
      }
    })
  }

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar",
        handlers: {
          //이미지 처리는 우리가 직접 imageHandler 함수로 처리할 것이다
          image: imageHandler,
        },
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
      },
    }
  }, [])

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "align",
    "color",
    "background",
    "image",
  ]

  //////////////////////////// react-quill ////////////////////////////

  // const createHandler = () => {
  //   const variable = {
  //     title: PostTitle,
  //     desc: PostDesc,
  //   }

  //   console.log(variable)

  //   axios
  //     .post(
  //       "http://localhost:8080/cotato/" + category.category + "/createPost",
  //       variable
  //     )
  //     .then((response) => {
  //       console.log(response.config.data)
  //       if (response.config.data) {
  //         console.log("여기가 이프문 콘솔")
  //         alert("작성 완료")
  //         setTimeout(() => {
  //           navigate("/cotato/" + category.category)
  //         }, 500)
  //       } else {
  //         alert("게시물 등록 실패")
  //       }
  //     })
  //     .catch(function (err) {
  //       if (err.response) {
  //         console.log(err.response.data)
  //       } else if (err.request) {
  //         //2.8 (화) request 오류. CORS때문일수도?
  //         console.log(err.request)
  //       }
  //     })
  // }

  const onSubmit = async (e) => {
    e.preventDefault()
    postService.createPost(PostTitle, PostDesc, category, attachment)
    setTimeout(() => {
      navigate("/cotato/" + category.category)
    }, 500)
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label for="formGroupExampleInput" className="form-label">
            제목
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="제목"
            onChange={onTitleChange}
            value={PostTitle}
            name="title"
          ></input>
        </div>
        <div className="mb-3">
          <label for="formGroupExampleInput2" className="form-label">
            내용
          </label>
          {/* <input type="text" className="form-control" id="formGroupExampleInput2" placeholder='내용' onChange={onContentsChange} value={PostContents} name='contents'></input> */}

          {/* react-quill */}
          <div className="text-editor">
            <CustomToolbar />
            <ReactQuill
              modules={modules}
              formats={formats}
              ref={quillRef}
              value={PostDesc}
              onChange={onDescChange}
              name="desc"
              theme="snow"
            />
          </div>

          <div class="form-group">
            <label for="attachment">Attachment</label>
            <input
              type="file"
              name="attachment"
              class="form-control-file"
              id="attachment"
            ></input>
          </div>
        </div>
        {/* <div>image_image_image TAT</div> */}
        <br />

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-warning"
            // onClick={createHandler}
          >
            등록
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostCreate
