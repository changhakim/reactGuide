import React, { cloneElement, Children } from 'react';

const TapContent = ({ children, activeTab = 0, id, active })=>{ 

    return (
        <div
          role="tabpanel"
          id ={id}
          hidden={!active}
        >
          {active && children}
        </div>
      );


}

export default TapContent;  