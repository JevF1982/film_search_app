import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useWindowScrollPosition from "@rehooks/window-scroll-position";
import {
  LOGOUT_SUCCES,
  CLEAR_MOVIELIST,
  CLEAR_FAVORITES,
} from "../actions/types";
import "../Navbar.scss";

const NavBar = () => {
  const login = [
    {
      to: "/",
      text: "SEARCH",
    },

    {
      to: "/login",
      text: "LOGIN",
    },
    {
      to: "/register",
      text: "REGISTER",
    },
  ];
  const logout = [
    {
      to: "/",
      text: "SEARCH",
    },
    {
      to: "/favorites",
      text: "FAVORITES",
    },
    {
      to: "/",
      text: "LOGOUT",
    },
  ];

  const [toggle, setToggle] = useState(false);
  const [change, setChange] = useState(false);
  const changePosition = 1;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  const activeLinks = isAuthenticated ? logout : login;

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleClick = (e) => {
    handleToggle();
    if (e === "LOGOUT") {
      dispatch({ type: LOGOUT_SUCCES });
      dispatch({ type: CLEAR_MOVIELIST });
      dispatch({ type: CLEAR_FAVORITES });
    }

    handleToggle();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  /////////NAVBAR SCROLL EFFECT///////////////

  let position = useWindowScrollPosition();
  // position == { x: 0, y: 0 }

  if (position.y > changePosition && !change) {
    setChange(true);
  }

  if (position.y <= changePosition && change) {
    setChange(false);
  }

  //////////////////////EXTRA STYLING FOR SCROLL EFFECT///////////////////
  const style = {
    backgroundColor: change ? "black" : "transparent",
    transition: "400ms ease",
    height: "120px",
    position: !position.y ? " " : "fixed",
    right: 0,
    left: 0,
    top: !position.y ? "0px" : "-20px",
    zIndex: 3000,
    link: {
      marginTop: !position.y ? " " : "65px",
    },
    logo: {
      marginTop: !position.y ? " " : "10px",
    },
    hamburger: {
      marginTop: !position.y ? " " : "20px",
    },
  };

  return (
    <>
      <div>
        <nav className={toggle ? "navbar active" : "navbar"} style={style}>
          <div>
            <img
              className="logo"
              src="assets/logo_transparent.png"
              alt="pic"
              style={style.logo}
            />
          </div>
          <button onClick={handleToggle} className="toggle"></button>
          <ul
            className={toggle ? "link-list active" : "link-list"}
            style={style.link}
          >
            {activeLinks.map((link, index) => {
              return (
                <li key={index} onClick={() => handleClick(link.text)}>
                  <Link
                    to={link.to}
                    style={{
                      listStyle: "none",
                      textDecoration: "none",
                      color: "wheat",
                    }}
                  >
                    {link.text}
                  </Link>
                  <hr />
                </li>
              );
            })}
          </ul>
          <div className="hamburger-menu" style={style.hamburger}>
            <div className={toggle ? "line1 turn" : "line1"}></div>
            <div className={toggle ? "line2 turn" : "line2"}></div>
            <div className={toggle ? "line3 turn" : "line3"}></div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
