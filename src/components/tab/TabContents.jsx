import React, { cloneElement, Children } from 'react'; 
import TabStyle from './Tab.module.scss';

const TabContents = ({children, activeTab, id})=>{ 
    
    const act = activeTab;
    const temp  = Children.map(children, (el, idx)=>{ 
          return cloneElement(el, {
              'active' : idx ===act,
              id,
              idx
          });
    });

    return <div className={TabStyle["div_tabContents"]}>{temp}</div>
   

}

export default TabContents;