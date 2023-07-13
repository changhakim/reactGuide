import React, { useState } from "react";
import {Toggle} from "@components";

export default function NewsletterStates() {
  let [selectAll, setSelectAll] = useState(false);
  let [option1, setOption1] = useState(false);
  let [option2, setOption2] = useState(false);
  let [option3, setOption3] = useState(false);

  const onNewsletterChange = (checked) => {
    setSelectAll(checked);
    if (!checked) {
      setOption1(false);
      setOption2(false);
      setOption3(false);
    }else{
      setOption1(true);
      setOption2(true);
      setOption3(true);
    }
  };

  return (
    <div>
      <h2>Toggle Test</h2>
      <div>
        <Toggle
          id="selectAll"
          checked={selectAll}
          onChange={onNewsletterChange}
        />
        <label htmlFor="selectAll">Select All</label>
      </div>
      <div>
        <Toggle
          id="option1"
          small
          disabled={false}
          checked={option1}
          onChange={setOption1}
        />
        <label htmlFor="option1">옵션1</label>
      </div>
      <div>
        <Toggle
          id="option2"
          small
          disabled={false}
          checked={option2}
          onChange={setOption2}
        />
        <label htmlFor="option2">옵션2</label>
      </div>
      <div>
        <Toggle
          id="option3"
          small
          disabled={false}
          checked={option3}
          onChange={setOption3}
        />
        <label htmlFor="option3">옵션3</label>
      </div>
      <div>
        <h2>상태</h2>
        <p>전체선택: {String(selectAll)}</p>
        <p>옵션1: {String(option1)}</p>
        <p>옵션2: {String(option2)}</p>
        <p>옵션3: {String(option3)}</p>
      </div>
    </div>
  );
}
