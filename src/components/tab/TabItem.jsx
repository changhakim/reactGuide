import { useEffect, useState } from 'react';
import TabStyle from './Tab.module.scss';

const TabItem = ({tabData, defaultTab}) =>{ 

    const [activeTab, setActiveTab] = useState(defaultTab);
    useEffect(()=>{ 
      
    },[activeTab]);

    return (
        <div className="container">
        <ul className={TabStyle["tab-ul"]}>

            {  
                 tabData.length > 0 ? (
                <>
                    
                    {  
                        tabData.map((item,idx)=> {
                              
                                return (
                                
                                    <li className= { activeTab ===idx? TabStyle["tab_ul_li_active"] : TabStyle["tab_ul_li"]}
                                        data-tab={`tab-${idx}`} key={idx} onClick={()=>{
                                        setActiveTab(idx);
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
    )
 }
 


 export  default TabItem;