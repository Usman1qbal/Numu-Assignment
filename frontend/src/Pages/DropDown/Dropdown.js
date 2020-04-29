import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import "./Dropdown.css";
export default function Dropdown(props) {
  const handleChange = (event) => {
    props.setOption(event.target.value);
  };
  return (
    <div className="dropdownDiv">
      { props.label !== "User" ?

      <Select value={props.option} onChange={handleChange}>
        <MenuItem value="None">{props.label}</MenuItem>
        {props.optionList.map((item) => {
          return <MenuItem value={item}>{item}</MenuItem>;
        })}
      </Select>
      
      :
      <Select value={props.option} onChange={handleChange}>
      <MenuItem value="None">{props.label}</MenuItem>
      {props.optionList.map((item) => {
        return <MenuItem value={item.id}>{item.username}</MenuItem>;
      })}
    </Select>
}
    </div>
  );
}
