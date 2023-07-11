import { useState } from "react";
import {Nav} from 'react-bootstrap';


const Tab = ()=>{  
    const [activeTab, setActiveTab] = useState(0);
    const selectTab = (idx)=>{  
        setActiveTab(idx);
    }
   
    const tabData = [ 
        { title :'탭1', body: 'StringUtil.jsx'},
        { title :'탭2', body: 'DateUtil.jsx'},
        { title :'탭3', body: 'validationUtil.jsx'},
        { title :'탭4', body: 'commonUtil.jsx'}
    ]
 
   
    

    return (
        <>
            {
                tabData.length >0 ? (
                    <>
                    {
                        tabData.map((item,idx)=>{
                            return (
                                <Nav key= {idx} variant="tabs"  defaultActiveKey="link0">
                                    <Nav.Item key ={`nav+${item.title}`}>
                                        <Nav.Link eventKey={`link+${idx}`} onClick={()=>{ 
                                            setActiveTab(idx);
                                        }}>{item.title}</Nav.Link>
                                    </Nav.Item>
                                </Nav>
    
                            )
                        })    
                    }

                    <p>{tabData[activeTab].body}</p>
                    </>
                ) : null
            }
           
           
        </>
    );
}



export default Tab; 