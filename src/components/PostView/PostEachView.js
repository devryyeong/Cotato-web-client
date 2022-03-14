import React from "react"
import { Link } from "react-router-dom"

import Comment from "./comments/Comment"
import parse from "html-react-parser"

// props: data, comments, getPrev, getNext, refreshFunc
function PostEachView(props) {
  const data = props.data
  const category = props.data.category
  const postNumber = props.data.postNumber
  const getPrev = props.getPrev
  const getNext = props.getNext
  const comments = props.comments
  const refreshFunction = props.refreshFunction

  return (
    <div className="container mt-5">
      {/* ---------------------------- 카테고리, 글쓰기 ---------------------------- */}
      <div className="row border-top border-3 border-dark">
        <div
          className="col-11 p-3"
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >
          {category}
        </div>
        <div className="col-1 p-3 d-grid gap-2 d-flex justify-content-end">
          <button type="button" className="btn btn-outline-secondary">
            <Link
              to={"/cotato/" + category + "/createPost"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              글쓰기
            </Link>
          </button>
        </div>
      </div>

      {/* ---------------------------- 제목, 수정, 삭제 ---------------------------- */}
      <div className="row border-top border-dark">
        <div
          className="col-10 p-3"
          style={{ fontSize: "25px", fontWeight: "bolder" }}
        >
          {data.title}
        </div>
        <div className="col-2 p-3 d-grid gap-2 d-flex justify-content-end">
          <button type="button" className="btn btn-outline-secondary">
            <Link
              to={"/cotato/" + category + "/createPost"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              수정
            </Link>
          </button>
          <button type="button" className="btn btn-outline-secondary">
            <Link
              to={"/cotato/" + category + "/createPost"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              삭제
            </Link>
          </button>
        </div>
      </div>

      {/* ---------------------------- 아이디, 날짜, 조회수, 좋아요 ---------------------------- */}
      <div className="row border-top border-dark">
        <div className="col-md-1 p-2">{data.username}</div>
        <div className="col-md-2 p-2">{data.date}</div>
        <div className="col-1 offset-7 p-2 text-end">
          조회수&nbsp;&#124;&nbsp;{data.views}
        </div>
        <div className="col-1 p-2 text-end">
          좋아요&nbsp;&#124;&nbsp;{data.liked}
        </div>
      </div>

      {/* ---------------------------- 내용 ---------------------------- */}

      <div className="row border-top border-dark">
        <div
          className="col-12 p-4 mt-3 mb-5 min-vh"
          style={{ fontSize: "18px" }}
        >
          {parse("" + data.desc)}
          {data.fileURL}
        </div>
      </div>

      {/* ---------------------------- 좋아요, 목록, 이전글, 다음글 ---------------------------- */}
      <div className="row border-top border-dark">
        <div className="col-2 p-2">
          <img src="public/images/heartfilled.png" alt={"엑박"} />
          {/* <LikeBtn
              like={liked}
              onClick={() => {
                putLike()
              }}
            /> */}
        </div>
        <div className="col-10 p-2 d-grid gap-2 d-flex justify-content-end">
          <button type="button" className="btn btn-outline-secondary">
            <Link
              to={`/cotato/${data.category}`}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              목록
            </Link>
          </button>
          <button type="button" className="btn btn-outline-secondary">
            <Link
              to={`/cotato/${data.category}/${data.postNumber}`}
              onClick={getPrev}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              이전글
            </Link>
          </button>
          <button type="button" className="btn btn-outline-secondary">
            <Link
              to={`/cotato/${category}/${postNumber}`}
              onClick={getNext}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              다음글
            </Link>
          </button>
        </div>
      </div>

      {/* ---------------------------- 댓글 ---------------------------- */}
      <Comment
        postId={data._id}
        username={data.username}
        commentList={comments}
        refreshFunction={refreshFunction}
      />
    </div>
  )
}

export default PostEachView
