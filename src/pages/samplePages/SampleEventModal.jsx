import React, { useEffect, useCallback, useState } from "react";
import Styles from "./Develop.module.scss";
import { Radio, RadioGroup } from "@components";
import { Button } from "react-bootstrap";
import img2 from "@styles/assets/images/temp/cal_1.png";
import { CalendarPicker, InputCalendarPicker } from "@components";
import { store, modalActions } from "@modules/redux";
import dayjs from "dayjs";
function SampleEventModal() {
  console.log("== SampleEventModal ==");
  let today = new Date();
  let strToday = dayjs(today).format("YYYYMMDD");
  const [selDate, setSelDate] = useState(strToday);
  const [minDate, setMinDate] = useState("20230101");
  const [maxDate, setMaxDate] = useState("20231231");
  const [resDate, setResDate] = useState("");
  const [resDateDisp, setResDateDisp] = useState("");
  const [isOk, setIsOk] = useState("");
  const [inputCalendarPickerDate, setInputCalendarPickerDate] =
    useState("2023-07-03");

  const [radioValue, setradioValue] = useState("email");

  const onClickRadioHandler = useCallback(
    (val) => {
      setradioValue(val);
    },
    [radioValue]
  );

  const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = week[date.getDay()];

    return year + "." + month + "." + day + "(" + dayOfWeek + ")";
  };

  const onClickButton = () => {
    store.dispatch(
      modalActions.modalPopupPortal({
        id: "calendarPicker",
        isOpen: true,
        uiType: "confirm",
        title: "calendar",
        content: () => (
          <CalendarPicker
            defaultDateValue={dayjs(selDate)}
            minDate={dayjs(minDate)}
            maxDate={dayjs(maxDate)}
            getValue={(value) => {
              console.log("getValue:" + JSON.stringify(value));
              setResDate(value.dateValue);
              console.log("resDate;;" + resDate);
            }}
          />
        ),
        onConfirm: {
          confirmClick: () => {
            console.log("confirmClick");
            console.log("confirmClickresDate;;" + resDate);
            // debugger
            // setResDateDisp(resDate);
            setIsOk(true);
          },
        },
        onCancel: {
          cancelClick: () => {
            console.log("cancelClick");
            setIsOk(false);
          },
        },
      })
    );
  };

  return (
    <div className={Styles.eventModal}>
      <div className={Styles.modal}>
        <ul className={Styles.mylist} style={{ width: "420px" }}>
          <span
            style={{
              marginLeft: "170px",
              fontWeight: "bold",
            }}
          >
            {getToday()}
          </span>
          <span>
            <img
              src={img2}
              onClick={onClickButton}
              alt="달력"
              style={{
                position: "absolute",
                left: "370px",
                width: "25px",
                height: "25px",
              }}
            ></img>
          </span>
          <RadioGroup label="">
            <li style={{ fontWeight: "bold", fontSize: "15px" }}>
              Q. 다음 프로야구 구단 중, 원정팀 응원단이 3루방향이 아닌 구장은
              어디인가요?
            </li>
            <li>
              <Radio
                name="marketing"
                value="0"
                onClickRadioHandler={onClickRadioHandler}
              >
                잠실
              </Radio>
            </li>
            <li>
              <Radio
                name="marketing"
                value="1"
                checked="checked"
                onClickRadioHandler={onClickRadioHandler}
              >
                고척
              </Radio>
            </li>
            <li>
              <Radio
                name="marketing"
                value="2"
                onClickRadioHandler={onClickRadioHandler}
              >
                인천
              </Radio>
            </li>
            <li>
              <Radio
                name="marketing"
                value="3"
                onClickRadioHandler={onClickRadioHandler}
              >
                대구
              </Radio>
            </li>
            <li>
              <Radio
                name="marketing"
                value="4"
                onClickRadioHandler={onClickRadioHandler}
              >
                사직
              </Radio>
            </li>
          </RadioGroup>
        </ul>
        <div>
          <input
            type="button"
            className={Styles.bottomButton}
            value="제출하기"
            onClick={() => {
              alert("제출");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SampleEventModal;
