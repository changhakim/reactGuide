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
        <Tab tabData={tabData} navColor={'pink'}
             tabHandle={tabHandle} activeTab= {activeTab}
             defaultTab ='2' />

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
  

  // function TabPanels ({children, activeTab, id}){ 

  //   const act = activeTab;
  //   const temp  = Children.map(children, (el, idx)=>{ 
  //         return cloneElement(el, {
  //             'mom':'miss',
  //             'active' : idx ===act,
  //             id,
  //             idx
  //         });
  //   });

  //   return <div className="test">{temp}</div>
  // }

  // function TabPanel ({ children, activeTab = 0, id, active }){  
  //   return (
  //     <div
  //       role="tabpanel"
  //       id ={id}
  //       hidden={!active}
     
  //     >
  //       {active && children}
  //     </div>
  //   );

  // }

  export default SamplePageTab;
    