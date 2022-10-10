import { useState } from "react";
import "./hover.css"
const Tooltip = (props) => {
  // All the code that will make the
  // tooltip work resides here

  // Set up timer and state
  let TooltipTimeout;
  const [activeToolTip, setActiveToolTip] = useState(false);

  // Write a function to show the tooltip
  const showToolTip = () => {
    TooltipTimeout = setTimeout(() => {
      setActiveToolTip(true);
    }, props.delay || 300);
  };

  // Write a function to hide the tooltip
  const hideToolTip = () => {
    setActiveToolTip(false);
    clearInterval(TooltipTimeout);
  };

  // Return JSX which contains the HTML
  // data for the tooltip

  // Note the usage of the 2 supported event handlers
  // mentioned earlier in this article. They make
  // it is possible to create the hover event in React.
  return (
    <div
      className="Tooltip-Container"
      onMouseEnter={showToolTip}
      onMouseLeave={hideToolTip}
    >

      {props.children}

      {activeToolTip && (
        <div className={`Tooltip-Content ${props.direction} || "top"}`}>
          {props.content}
        </div>
      )}

    </div>
  );
};

// Export the tooltip
export default Tooltip
