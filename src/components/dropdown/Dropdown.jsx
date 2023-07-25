import { useState } from 'react';
import PropTypes from 'prop-types';
import DropdownStyle from './Dropdown.module.scss';

const Dropdown = ({ options, onSelect, children}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (event) => {
    const selectedValue = event.target.value;
    const selectedLabel = event.target.options[event.target.selectedIndex].text;
    setSelectedOption({ label: selectedLabel, value: selectedValue });
    if (onSelect) {
      onSelect({ label: selectedLabel, value: selectedValue });
    }
  };

  return (
    <div>
      <select onChange={handleOptionSelect} value={selectedOption.value} className={DropdownStyle["dropdownBox"]}>
        <option disabled hidden selected>
           {children}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value} className={DropdownStyle["selectOptions"]}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func,
  children: PropTypes.node,
};

export default Dropdown;