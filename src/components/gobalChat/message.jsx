import { React, PureComponent } from "react"
import { render } from "react-dom"
import Tooltip from "../../core-ui/components/Tooltip"


const Te = (e) => {
  return (
    <div onClick={(e) => { e.stopPropagation(); console.log("test") }}>
      sadsadsadsad
    </div>
  )
}


class PureMsg extends PureComponent {
  render() {
    const { own, msg, userName, userId, navigate, profilePic } = this.props

    return (
      <>
        <div className={own ? "ownclass" : ""} >
          <div className="message--userId" onClick={(e) => { e.stopPropagation(); console.log(e.isPropagationStopped()); navigate("/user/" + userId) }}>

            <Tooltip text={<Te />}>
              {<img className="profileImg" src={profilePic} />}
            </Tooltip>

            <Tooltip>
              <span className="userNameBox">
                {own ? "Me" : userName}
              </span>

            </Tooltip>
          </div>
          <div className="userMessage">
            {msg}
          </div>
        </div>
      </>
    )
  }
}


export default PureMsg
