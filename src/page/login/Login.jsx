import "../../core-ui/styles/login.css"
import { LoginHeader } from "../../components"

import { GoogleButton } from "../../components"
import { BsGoogle } from "react-icons/bs"
var classNames = require('classnames');
export function GoogleLogo() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <BsGoogle className={classNames('login__googleLogo')} />
    </div>
  )
}


const login = () => {
  return (

    // @param {string} [size={'l'} {'xl'}] header size
    <div className="login">
      <GoogleLogo />
      <LoginHeader heading={"ASCENDANCE"} subheading={"TURN UP YOUR COLLEGE LIFE"} size={'xl'} />
      <GoogleButton />
      {/* <a href={`${process.env.REACT_APP_API}/auth/google`}>gooogle login</a> */}
    </div >

  )
}

export default login
