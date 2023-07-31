import { useState } from "react";
{
  /* Style */
}

const apppadding = {
  padding: "10px",
};

const textareastyle = {
  width: "100%",
  height: "150px",
  padding: "10px",
  boxSizing: "border-box",
  border: "solid 2px #1E90FF",
  borderRadius: "5px",
  fontSize: "16px",
  resize: "both",
};

const TextArea = () => {
  const [textValue, setTextValue] = useState("");
  const handleSetValue = (e) => {
    setTextValue(e.target.value);
  };

  return (
    <div style={apppadding}>
      <textarea
        style={textareastyle}
        placeholder="여기에 입력하세요"
        value={textValue}
        onChange={(e) => handleSetValue(e)}
      ></textarea>
      <hr />
      <p>{textValue}</p>
    </div>
  );
};

export default TextArea;
