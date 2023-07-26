import {Tab, TabContent, TabContents} from "@components";
import React ,{useState, useEffect, useCallback} from 'react';

const SamplePageTab = () => {

  const tabData = [ { title :'입출금'},{ title :'예적금'},{ title :'외화예적금'},{ title :'대출'} ];
  const [activeTab, setActiveTab] = useState(0);

  const onClickTabHandler = useCallback((idx)=>{
    setActiveTab(idx);
  }, [activeTab]);

    return(
      <>
        <Tab tabData={tabData} 
             activeTab ={activeTab} 
             onClickTabHandler ={onClickTabHandler}/>

        <TabContents activeTab={activeTab}>
          <TabContent id="TabPanel1"  key='TabPanel1'>
            <div>
              <img src='img/입출금.jpg'></img>
              <ul>
                <li>이 상품은 ‘금융거래 한도계좌＇로 신규됩니다.</li>
                <li>단, 신한은행 거래에 따라 일반계좌 및 거래 한도가 다른 계좌로 신규 될 수 있습니다.</li>
                <li>대포통장 근절 종합대책 및 보이스피싱 관련 행정규칙에 따라 이용이 제한되고, 금융회사별 1인당 1계좌만 개설 가능합니다.</li>
              </ul>
            </div>
        
          </TabContent>
          <TabContent id="TabPanel2" key='TabPanel2'>
            <div>
            <img src='img/예적금.jpg'></img>
            <ul>
              <li> 아래 ①~④의 요건을 모두 충족할 경우 가입 가능</li>
              <li>가입일 현재 만 19세 이상 만 34세 이하 인 사람주1</li>
              <li>②가입일 현재 아래 해당하는 소득요건을 충족하는 사람</li>
              <li>가. 직전년도 총급여액이 7,500만원 이하인 경우주2</li>
              <li>나. 직전 과세기간의 종합소득과세표준에 합산되는 종합소득금액이 6,300만원 이하인 경우주3</li>           
            </ul>
            </div>
          </TabContent>
          <TabContent id="TabPanel3" key='TabPanel3'>
            <div>
              <img src='img/외화예적금.jpg'></img>
              <ul>
                <li>가입대상 : 토지보상금 수령자로 증빙서류 제출하는 개인 및 개인사업자(1인 다계좌)</li>
                <li>예금과목: 정기예금</li>
                <li>이자지급방법 : 만기일시지급식</li>
              </ul>
            </div>
          </TabContent>
          <TabContent id="TabPanel4" key='TabPanel4'>
            <div>
            <img src='img/대출.jpg'></img>
            <ul>
              <li>대출대상</li>
              <li>신한은행이 선정한 기업에 1년 이상 재직중이고 연소득 2,800 만원 이상인 직장인</li>
              <li>만 19세 이상 내국인</li>
              <li>직장인으로 건강보험료를 납입 중인 고객</li>
              <li>납부한 건강보험료로 추정한 소득이 2,800만원 이상인 고객</li>
              <li>당행 심사기준을 충족하는 고객</li>
            </ul>
            </div>
        
          </TabContent>
        </TabContents>
     
      
       
      </>
    )

  };

  export default SamplePageTab;
    