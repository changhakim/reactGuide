import { useEffect, useState } from "react";
import {Nav} from 'react-bootstrap';
import TabStyle from './Tab.module.scss';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TabItem from './TabItem';

const Tab = ({
        tabData, 
        navColor,
        justify, 
        defaultTab,
        tabHandle
    })=>{   
        
    const [activeTab, setActiveTab] = useState(defaultTab);

    return (
        <>
            {/* {
                tabData && tabData.length >0 ? (
                    <>
                     <Nav
                        justify  
                        className={TabStyle["tab-nav"]}  
                        variant="tabs" 
                        defaultActiveKey={defaultTab}>
                    {
                        tabData.map((item,idx)=>{
                            return (

                                    <Nav.Item key ={`nav${item.title}`} style={{'color':navColor}} >
                                        <Nav.Link className={defaultTab ===idx}
                                            eventKey={`link${idx}`} onClick={()=>{ 
                                          // setActiveTab(idx);
                                           tabHandle(idx);
                                        }} >{item.title}</Nav.Link>
                                    </Nav.Item> 
                            )
                        })    
                    }
                      </Nav>
                    </>
                ) : null
            } */}

                <div className={TabStyle["tab-container"]}>
                        <ul className={TabStyle["tab-ul"]}>

                            {  
                                tabData&& tabData.length > 0 ? (
                                <>
                                    
                                    {  
                                        tabData.map((item,idx)=> {
                                            
                                                return (
                                                
                                                    <li className= { activeTab ===idx? TabStyle["tab_ul_li_active"] : TabStyle["tab_ul_li"]}
                                                        data-tab={`tab-${idx}`} key={idx} onClick={()=>{
                                                        //setActiveTab(idx);
                                                        tabHandle(idx);
                                                    }} >{item.title}</li>
                                                ) 

                                            })
                                    }
                                    <br/>

                                </>
                                ) :  null
                            }
                
                        </ul>
                    </div>
           
           
        </>
    );
}

Tab.prototype = { 

}

export default Tab; 