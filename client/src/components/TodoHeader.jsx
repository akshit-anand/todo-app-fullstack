import React, { useState } from "react";
import IconMoon from "../images/icon-moon.svg";
import IconSun from "../images/icon-sun.svg";

const TodoHeader = () => {
  const [icon, setIcon] = useState(IconMoon);

  const toggleMode = () => {
    if (icon === IconMoon) {
      setIcon(IconSun);
    } else {
      setIcon(IconMoon);
    }
  };
  return (
    <div className="top-menu">
      <div className="left">
        <h1>TODO</h1>
      </div>
      <div className="right">
        <img
          src={icon}
          alt={icon}
          className="mode"
          id="mode"
          onClick={toggleMode}
        />
      </div>
    </div>
  );
};

export default TodoHeader;
