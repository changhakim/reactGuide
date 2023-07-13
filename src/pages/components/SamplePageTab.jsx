import {Tab, TabContent, TabContents} from "@components";
import React, { cloneElement, Children } from 'react';
import {useState } from 'react';

const SamplePageTab = () => {

  const tabData = [ 
    { title :'탭1'},
    { title :'탭2'},
    { title :'탭3'},
    { title :'탭4'}
  ]

  const [activeTab, setActiveTab] = useState(2);
  const tabHandle = (idx)=>{ 
   
    setActiveTab(idx);
  }

    return(
      <>
        <Tab tabData={tabData} 
             tabHandle={tabHandle} 
             activeTab ={activeTab} />

        <TabContents activeTab={activeTab}>
          <TabContent id="TabPanel1"  key='TabPanel1'>
            <div key="a">
              <p>panel1입니다</p>
            </div>
            <div key="b">
            <p>panel1입니다</p>
            </div>
            <div key="c">
            <p>panel1입니다</p>
            </div>

          </TabContent>
          <TabContent id="TabPanel2" key='TabPanel2'>
            <div  key="d">
            <p>panel2입니다</p>
            </div>
            <div key="e">
            <p>panel2입니다</p>
            </div>
            <div key="f">
            <p>panel2입니다</p>
            </div>
          </TabContent>
          <TabContent id="TabPanel3" key='TabPanel3'>
            <div>
              <p>리액트 프로젝트 테스트</p>
              <p>2023-07-13</p>
            </div>
          </TabContent>
          <TabContent id="TabPanel4" key='TabPanel4'>
            <div  key="d">
            <p>44444</p>
            </div>
        
          </TabContent>
        </TabContents>
     
      
      </>
    )
    
  };

  export default SamplePageTab;
    