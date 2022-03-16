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
  const [FileName, setFileName] = useState([]) //이미지 처리를 위한 상태
  const quillRef = useRef()

  const category = useParams()
  const navigate = useNavigate()

  const onTitleChange = (e) => {
    setPostTitle(e.target.value)
  }

  const onDescChange = (value) => {
    setPostDesc(value)
  }

  const onfileChange = (e) => {
    console.log(e.target.value)
    const newFileName = [...FileName, e.target.value]
    setFileName(newFileName)
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

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(FileName)
    axios.post("http://localhost:8080/cotato/files", { file: FileName })
    postService.createPost(PostTitle, PostDesc, category, FileName)
    setTimeout(() => {
      navigate("/cotato/" + category.category)
    }, 500)
  }

  return (
    <div className="container">
      <form name="desc" onSubmit={onSubmit}>
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
        </div>
        <div>
          <input
            type="file"
            name="upload_file"
            multiple
            value={FileName}
            onChange={onfileChange}
          />
        </div>
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
