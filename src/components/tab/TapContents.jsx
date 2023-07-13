import React, { cloneElement, Children } from 'react'; 


const TapContents = ({children, activeTab, id})=>{ 

    const act = activeTab;
    const temp  = Children.map(children, (el, idx)=>{ 
          return cloneElement(el, {
              'mom':'miss',
              'active' : idx ===act,
              id,
              idx
          });
    });

    return <div className="test">{temp}</div>

}

export default TapContents;