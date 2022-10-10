import React, { useEffect, useRef, useState } from "react";
import "./topBar.css";
import UploadBox from "./FloatingUploadBar";

import { Link, useNavigate } from "react-router-dom";
// import { AiOutlineMenu } from "react-icons/ai"
import IconMiddleware from "../../core-ui/icons"
import { useSelector, useDispatch } from 'react-redux';
import { userDetail } from "../../redux/userSlice";
import { logoutCall } from "../../redux/apiCall";
import classNames from "classnames";
export default function() {

  const userState = useSelector(state => state.user);
  const navigation = useNavigate()
  let loginTrigger = () => {
    // handleClick();
    navigation("/login")
  }
  let logoutTrigger = () => {
    logoutCall()
  }

  const ref = useRef(null);
  const [uploadBox, setUploadBox] = useState(false);
  const handleClick = (e) => {
    console.log(ref.current.getAttribute('data-visible'))

    let navBartoggle = ref.current.getAttribute('data-visible');
    console.log(navBartoggle)
    if (ref.current.getAttribute('data-visible') === 'true') {
      ref.current.setAttribute('data-visible', 'false');
    } else if (ref.current.getAttribute('data-visible') === 'false') {

      ref.current.setAttribute('data-visible', 'true');
    }
  };






  return (
    <div className="top--wrapper">
      {/* logo logo text */}
      <div className="inner--left--wrapper">
        <Link to="/">
          <div className="animationlogo"> </div>
        </Link>
        <Link to="/">
          <div className="logoText">
            <span id="ascedance">A <span id="icolor">s</span> <span>ce </span> <span id="forum" >dan</span> ce</span>
            <div id="forum">F<span className="dimO" >O</span> R<span className="ushape">U</span>M</div>
          </div>
        </Link>

      </div>


      {/* search bar */}
      <div className="search--wrapper--box" >
        <div className="search--wrapper">
          < IconMiddleware Icon={"searchIcon"} color="green" />
          <input className="searchInputTopbar" placeholder="search..." />
        </div>
      </div>
      <div className="mob-nav-bar" style={{ color: "white" }} onClick={handleClick} >

        {/* < IconMiddleware Icon={"BsFillCloudUploadFill"} classStyle={('rankerList')} /> */}
        {/* {< AiOutlineMenu />} */}

      </div>

      <div className={"nav--wrapper"} ref={ref} data-visible="false">
        <div className="ranklist--wrapper">
          <div className="inner--left--wrapper">
            <div className="iconName">
              < IconMiddleware Icon={"awardIcon"} classStyle={('rankerList')} />
              <span className="spanText">Ranking</span>
            </div>
            <div className="iconName">
              < IconMiddleware Icon={"trendingIcon"} classStyle={('rankerList')} />
              <span className="spanText">Popular</span>
            </div>
            <div className="iconName">

              < IconMiddleware Icon={"randomIcon"} classStyle={('rankerList')} />
              <span className="spanText">Popular</span>

            </div>
            <div className="iconName">

              < IconMiddleware Icon={"uploadIcon"} classStyle={('rankerList')} />
              <span className="spanText" onClick={() => setUploadBox(true)} >Upload</span>
            </div>

          </div>
        </div>
        <div className="right--wrapper">
          <div className="inner--left--wrapper">
            {userState.userInfo.gId ?
              <button className="uploadFloat" type="button"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `${process.env.REACT_APP_API}/auth/logout`;
                }} >
                {/* <a href={`${process.env.REACT_APP_API}/auth/google`} >aaaa </a> */}
                Logout
              </button>
              : <button className="uploadFloat" onClick={() => { loginTrigger() }}>
                Login
              </button>
            }
          </div>
        </div>

        <div className="upload--wrapper" >
          <div className="inner--left--wrapper">
          </div>
        </div>


      </div>

      {uploadBox && <UploadBox uploadBoxClose={setUploadBox} />}

    </div >
  );
}
