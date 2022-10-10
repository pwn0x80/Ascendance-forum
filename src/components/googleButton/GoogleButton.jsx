
import * as React from 'react'
import GoogleLogo from "../../image/gogbtn.png";
import "../../core-ui/styles/googleButton.css"
const GoogleBtn = ({ color, width, minWidth }) => {

  return (
    <>
      <div className="googleButton" >
        <a href={`${process.env.REACT_APP_API}/auth/google`} >
          <img src={GoogleLogo} alt="google logo" style={{
            backgroundColor: color,
            width: width == 'large' ? '70%' : '8px',
            minWidth: minWidth == 'large' ? '150px' : '8px',
          }}
          />
        </a>
      </div>
    </>
  )
}

function useGbttn() {
  const [click, setClick] = React.useState(false);
  const btnClick = () => setClick(!click);

  function gbtnprops({ onClick, ...props } = {}) {
    return {
      onClick: () => onClick(),
      ...props
    }
  }
  return {
    click,
    btnClick,
    gbtnprops
  }
}


const LoginBtn = props => {
  const { click, gbtnprops } = useGbttn();
  return (
    <GoogleBtn {...gbtnprops({
      onClick: () => { alert("loggin"); debugger }
      , color: 'white',
      width: 'large'
    })} />
  )
}

export default LoginBtn;
