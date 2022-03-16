import React from "react"

const categoryList = [
  {
    navname: "Notice",
    category: "Notice",
  },
  {
    navname: "IT issue",
    category: "ITissue",
  },
  {
    navname: "Session",
    category: "Session",
  },
  {
    navname: "Study",
    category: "Study",
  },
  {
    navname: "Project",
    category: "Project",
  },
]

const NavBar = ({ onLogout }) => {
  const NavItem = ({ navname, href }) => {
    return (
      <li className="nav-item">
        <a className="nav-link active" aria-current="nav" href={href}>
          {navname}
        </a>
      </li>
    )
  }
  const NavBtn = ({ href, title }) => {
    return (
      <a
        href={href}
        className="btn btn-outline-primary"
        style={{ marginRight: "12px", padding: "0.375rem 1.5rem" }}
      >
        {title}
      </a>
    )
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            {/* <img src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" /> */}
            <i className="bi bi-cloud"></i>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <NavItem navname={"Home"} href={"/"} />
              {categoryList
                ? categoryList.map((item, index) => {
                    return (
                      <NavItem
                        key={index}
                        navname={`${item.navname}`}
                        href={`/cotato/${item.category}`}
                      />
                    )
                  })
                : ""}
              <NavItem navname={"My Page"} href={"/myPage"} />
            </ul>
            <NavBtn href={"/users/signin"} title={"Login"} />
            <NavBtn href={"/users/signup"} title={"Register"} />

            <button onClick={onLogout}>로그아웃</button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
