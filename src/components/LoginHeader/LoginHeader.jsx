import "../../core-ui/styles/loginHeader.css"

import classnames from "classnames";
const LoginHeader = ({ heading, subheading, size }) => {
  return (
    <div className={classnames('login__header', {
      [`login__header--${size}`]: size != null
    })}   >
      <div>
        <h1> {heading} </h1>
        <h1> {heading} </h1>

        <div style={{
          fontWeight: 900
          , textAlign: "start", color: "white", fontSize: "var(--fs-l)",
        }}>
          {subheading}
        </div>
      </div>
    </div>

  )
}

export default LoginHeader
