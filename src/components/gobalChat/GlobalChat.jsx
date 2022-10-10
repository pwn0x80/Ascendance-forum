
import { createSelector } from "@reduxjs/toolkit";
import React, { useEffect, useRef, useState, PureComponent, useMemo, useCallback, Component, Children } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { userDetail } from "../../redux/userSlice";
import "../../core-ui/styles/globalChat.css"
import Messages from "./message"
import { useNavigate } from "react-router-dom";

import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  EmojiClickData
} from "emoji-picker-react";

class Emojipure extends PureComponent {
  render() {
    const { onEmojiClick, emojibtn } = this.props
    return (<>
      <div style={{ position: "absolute", paddingTop: '55px' }} >

        {emojibtn ? <EmojiPicker

          autoFocusSearch={false}
          onEmojiClick={onEmojiClick}
          theme={Theme.AUTO}
          // lazyLoadEmojis={true}
          // previewConfig={{
          //   defaultCaption: "Pick one!",
          //   defaultEmoji: "1f92a" // 🤪
          // }}
          // skinTonesDisabled
          // searchPlaceHolder="Filter"
          // defaultSkinTone={SkinTones.MEDIUM}
          emojiStyle={EmojiStyle.NATIVE}
        // categories={[
        //   {
        //     name: "Fun and Games",
        //     category: Categories.ACTIVITIES
        //   },
        //   {
        //     name: "Smiles & Emotions",
        //     category: Categories.SMILEYS_PEOPLE
        //   },
        //   {
        //     name: "Flags",
        //     category: Categories.FLAGS
        //   },
        //   {
        //     name: "Yum Yum",
        //     category: Categories.FOOD_DRINK
        //   }
        // ]}
        />

          : ""}
      </div>
    </>
    )
  }
}


let TextArea = ({ children }) => {
  const navigate = useNavigate()
  const [msg, setMsg] = useState("")
  const [recMsg, setRecMsg] = useState([{
    userId: 324234,
    userName: "aditya",
    text: "coolna",

  }])
  const [emojibtn, setEmojibtn] = useState(false)
  const userDetail = useSelector((state) => state.user.userInfo, () => { console.log('test') })


  const socket = useRef();
  let submitTrigger = (e) => {
    let msgObj = {
      userId: userDetail.gId,
      userName: userDetail?.name,
      text: msg,
      profilePic: userDetail?.photo
    }
    // socket.current.emit("sendMessage", msgObj);
  }

  const onEmojiClick = useCallback((event, emojiObject) => {

    let emo = event?.emoji
    setMsg(msgs => msgs + emo)
  }, [])


  useEffect(() => {

    // socket.current = io("ws://localhost:8100");
    // socket.current.on("welcome", (data) => {
    // });
    // socket.current.on("getMessage", (data) => {
    //   setRecMsg(list => [...list, JSON.parse(data)])
    // })

    return () => {

      // socket.current.disconnect()
    }

  }, []);

  return (
    <div className="chatBox">
      {React.cloneElement(children, { emojibtn: emojibtn, onEmojiClick: onEmojiClick })}
      {/* {children(onEmojiClick)} */}


      {/* {children(onEmojiClick)} */}

      <div className="chatBox--wrapper" >

        <div className="chatBox--wrapper__chat">


          {recMsg.map((e, key) => {
            return (

              < div key={key} >
                <Messages key={key} profilePic={e.profilePic} userId={e.userId} userName={e.userName} msg={e.text} own={e?.userId == userDetail?.gId} navigate={navigate} />

              </div>
            )
          })}


        </div>

        <div className="chatBox__textBox">
          <span onClick={() => setEmojibtn(!emojibtn)}> Emoji </span>
          <input value={msg} className="chatBox__textBox--input" onChange={(e) => setMsg(e.target.value)} ></input>
          <button className="chatBox__textBox--btn" onClick={submitTrigger} type="button">submit</button>
        </div>

      </div>
    </div>


  )
}

const GlobalChat = () => {
  const outside = useRef()






  return (
    <>
      <TextArea >
        <Emojipure />
      </TextArea>
    </>
  )
}

export default GlobalChat
