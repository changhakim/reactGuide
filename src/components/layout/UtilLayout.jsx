import { useState } from "react";
import { InputGroup, Button, Form } from "react-bootstrap";
import UtilStyle from "./Util.module.scss";
import { arrayOf, func, shape, string } from "prop-types";

const UtilLayout = ({ title, description, calFunc, inputTitArr }) => {
  const [inputValue2, setInputValue2] = useState({});
  const [result, setResult] = useState();
  const calFuncBase = () => {
    setResult(calFunc(inputValue2));
  };

  return (
    <>
      <div className={UtilStyle["fnList"]}>
        <p className={UtilStyle["fnTitle"]}>{title}</p>
        <span>{description}</span>
        <br />
        <hr></hr>

        {inputTitArr && inputTitArr.length > 0 ? (
          inputTitArr.map((item, idx) => {
            return (
              <InputGroup className="mb-3" key={`group${idx}`}>
                <InputGroup.Text id={`title${idx}`}>
                  {item.title}
                </InputGroup.Text>
                <Form.Control
                  key={`text${idx}`}
                  placeholder={item.placeholder}
                  aria-label=""
                  aria-describedby={idx}
                  onChange={(val) => {
                    setInputValue2((prev) => {
                      return {
                        ...prev,
                        [item.title]: val.target.value,
                      };
                    });
                  }}
                />
              </InputGroup>
            );
          })
        ) : (
          <InputGroup className="mb-3">
            {/* <InputGroup.Text id="basic-addon1">{}</InputGroup.Text>
              <Form.Control
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
                onChange={(val) => {
                  setInputValue(val.target.value);
                }}
              /> */}
          </InputGroup>
        )}

        <div style={{ textAlign: "right" }}>
          <Button variant="outline-dark" onClick={calFuncBase}>
            확인
          </Button>
        </div>

        <br />
        <p>
          결과값: <span>{result}</span>
        </p>
      </div>
    </>
  );
};

UtilLayout.propType = {
  title: string,
  description: string,
  calFunc: func,
  inputTitArr: arrayOf(
    shape({
      title: string,
      placeholder: string,
    })
  ),
};

export default UtilLayout;
