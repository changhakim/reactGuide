import { useEffect, useState } from "react";
import {Nav} from 'react-bootstrap';
import TabStyle from './Tab.module.scss';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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