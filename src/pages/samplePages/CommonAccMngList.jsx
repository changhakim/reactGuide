import { useState, useEffect, useRef, useCallback } from "react";

import { Tab, TabContent, TabContents } from "@components";
import { Accordion } from "@components";
import { _ } from "@utils";
import Styles from "./Develop.module.scss";

//RegistrationList
//UnregisteredList
const RegistrationList = [
  {
    value: "110-251-369493",
    description: "신한\n110-251-369493",
    disabled: false,
  },
  {
    value: "110-525-092986",
    description: "신한\n110-525-092986",
    disabled: false,
  },
  {
    value: "180-006-795477",
    description: "신한\n180-006-795477",
    disabled: false,
  },
];

const UnRegisteredList = [
  {
    value: "110-251-369493",
    description: "국민\n110-251-369412",
    disabled: false,
  },
  {
    value: "110-525-092986",
    description: "국민\n110-525-092983",
    disabled: false,
  },
  {
    value: "180-006-795477",
    description: "국민\n180-006-795473",
    disabled: false,
  },
];

const accordionData = [
  {
    title: "알아 두세요.",
    content: `출금계좌 등록을 하시면, 등록하신 계좌에서 출금을 하실 수 있습니다.`,
  },
];

function CommonAccMngList() {
  console.log("== CommonAccMngList ==");

  const [activeTab, setActiveTab] = useState(0);
  const [checkItems1, setCheckItems1] = useState([]);
  const [checkItems2, setCheckItems2] = useState([]);

  const data1 = [
    { id: 0, title: "국민\n110-251-369412" },
    { id: 1, title: "국민\n110-251-369234" },
    { id: 2, title: "국민\n110-251-369555" },
    { id: 3, title: "국민\n110-251-369777" },
  ];

  const data2 = [
    { id: 0, title: "신한\n110-251-369412" },
    { id: 1, title: "제주\n110-251-369234" },
    { id: 2, title: "기업\n110-251-369555" },
    { id: 3, title: "하나\n110-251-369655" },
  ];

  const tabData = [
    { title: "등록된 출금계좌" },
    { title: "미등록된 출금계좌" },
  ];

  const handleSingle1Check = (checked, id) => {
    if (checked) {
      setCheckItems1((prev) => [...prev, id]);
    } else {
      setCheckItems1(checkItems1.filter((el) => el !== id));
    }
  };

  const handleSingle2Check = (checked, id) => {
    if (checked) {
      setCheckItems2((prev) => [...prev, id]);
    } else {
      setCheckItems2(checkItems2.filter((el) => el !== id));
    }
  };

  const handleAllCheck1 = (checked) => {
    if (checked) {
      const idArray = [];
      data1.forEach((el) => idArray.push(el.id));
      setCheckItems1(idArray);
    } else {
      setCheckItems1([]);
    }
  };

  const handleAllCheck2 = (checked) => {
    if (checked) {
      const idArray = [];
      data2.forEach((el) => idArray.push(el.id));
      setCheckItems2(idArray);
    } else {
      setCheckItems2([]);
    }
  };

  const onClickTabHandler = useCallback(
    (idx) => {
      setCheckItems1([]);
      setCheckItems2([]);
      setActiveTab(idx);
    },
    [activeTab]
  );

  return (
    <div className={Styles.page}>
      <div className={Styles.header}>
        <h1>출금계좌 관리</h1>
      </div>
      <Tab
        tabData={tabData}
        activeTab={activeTab}
        onClickTabHandler={onClickTabHandler}
      />

      <TabContents activeTab={activeTab}>
        <TabContent id="TabPanel1" key="TabPanel1">
          <div>
            <ul className={Styles.mylist}>
              <li>
                전체 선택
                <input
                  type="checkbox"
                  style={{ marginLeft: "340px" }}
                  name="select-all"
                  onChange={(e) => handleAllCheck1(e.target.checked)}
                  checked={checkItems1.length === data1.length ? true : false}
                />
              </li>
            </ul>
            <ul className={Styles.mylist}>
              {data1?.map((data, key) => (
                <li key={key}>
                  {data.title}
                  <input
                    type="checkbox"
                    name={`select-${data.id}`}
                    onChange={(e) =>
                      handleSingle1Check(e.target.checked, data.id)
                    }
                    checked={checkItems1.includes(data.id) ? true : false}
                  />
                </li>
              ))}
            </ul>
          </div>
        </TabContent>
        <TabContent id="TabPanel2" key="TabPanel2">
          <ul className={Styles.mylist}>
            <li>
              전체 선택
              <input
                type="checkbox"
                style={{ marginLeft: "340px" }}
                name="select-all"
                onChange={(e) => handleAllCheck2(e.target.checked)}
                checked={checkItems2.length === data2.length ? true : false}
              />
            </li>
          </ul>
          <ul className={Styles.mylist}>
            {data2?.map((data, key) => (
              <li key={key}>
                {data.title}
                <input
                  type="checkbox"
                  name={`select-${data.id}`}
                  onChange={(e) =>
                    handleSingle2Check(e.target.checked, data.id)
                  }
                  checked={checkItems2.includes(data.id) ? true : false}
                />
              </li>
            ))}
          </ul>
        </TabContent>
      </TabContents>

      <div>
        <Accordion sections={accordionData} />
      </div>

      <div>
        <input type="button" className={Styles.bottomButton} value="등록해지" />
      </div>
    </div>
  );
}

export default CommonAccMngList;
