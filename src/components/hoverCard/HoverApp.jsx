import './index.css';
import Tooltip from "./HoverCard.jsx"
const App = () => {
  return (
    <div className="App">
      asds
      <div className="tooltip-wrapper">
        <Tooltip content="I am a tooltip" direction="top">
          Hover your mouse here
        </Tooltip>
      </div>
    </div>
  )
}

export default App

