import TabStyle from './Tab.module.scss';

const TabContent = ({ children, activeTab = 0, id, active })=>{ 

    return (
        <div
          className={TabStyle["div_tabContent"]}
          role="tabpanel"
          id ={id}
          hidden={!active}
        >
          {active && children}
        </div>
      );


}

export default TabContent;  