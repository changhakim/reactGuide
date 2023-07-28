import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DropdownStyle from './Dropdown.module.scss';

const Dropdown = ({ options, placeholder, onSelect, dropdownType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const dropdownRef = useRef();
  //const placeholderRef = useRef();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleOptionSelect = (event) => {
    const selectedValue = event.target.value;
    const selectedLabel = event.target.options[event.target.selectedIndex].text;
    setSelectedOption({ label: selectedLabel, value: selectedValue });
    if (onSelect) {
      onSelect({ label: selectedLabel, value: selectedValue });
    }
  };

  if(dropdownType === "A") {  // ul li태그 사용해서 드롭다운 만들기
    return (
      <div ref={dropdownRef} className={DropdownStyle["dropdownContainer"]}>
        <div className={DropdownStyle["dropdownHeader"]} onClick={()=>toggleDropdown()} 
              style={{
                width: dropdownRef.current ? `${dropdownRef.current.clientWidth}px` : "auto",
              }}>
          {selectedOption ? selectedOption.label : placeholder}
        </div>
        {isOpen && (
          <ul className={DropdownStyle["dropdownOptions"]}>
            {options.map((option) => (
              <li key={option.value} onClick={() => handleOptionClick(option)}>
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
 } else if (dropdownType === "B") { //select태그 사용해 드롭다운 만들기
    return (
      <div>
        <select onChange={handleOptionSelect} value={selectedOption ? selectedOption.value : ''} className={DropdownStyle["dropdownBox"]}>
          <option disabled hidden value="">
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value} className={DropdownStyle["selectOptions"]}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
 } else {
   return null;
 }
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder : PropTypes.string,
  onSelect: PropTypes.func,
  dropdownType : PropTypes.string.isRequired,
};


export default Dropdown;
