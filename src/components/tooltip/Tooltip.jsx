import { useState } from 'react';
import TooltipStyle from './Tooltip.module.scss';
import PropTypes from 'prop-types';


const Tooltip = ({ 
  content, 
  children,
  position}) => {
    const [isVisible, setVisible] = useState(false);

    const handleMouseEnter = () => {
      setVisible(true);
    };
  
    const handleMouseLeave = () => {
      setVisible(false);
    };
    
    return (
      <>
      <div
        className={TooltipStyle["tooltip-wrapper"]}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        {isVisible && <div className={`${TooltipStyle["tooltip"]} ${TooltipStyle[`tooltip-${position}`]}`}>{content}</div>}
        
      </div>
      </>
    );
  };

Tooltip.propTypes = {
  content: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'center'])
};

Tooltip.defaultProps = {
  position: 'center'
};

export default Tooltip;