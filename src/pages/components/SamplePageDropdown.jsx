import {Dropdown} from "@components";
import {useState} from "react";

const SamplePageDropdown = () => {
  const options = [
    { label: '옵션 1', value: 'option1' },
    { label: '옵션 2', value: 'option2' },
    { label: '옵션 3', value: 'option3' },
  ];

  const options2 = [
    { label: '드롭다운 1', value: 'dropdown1' },
    { label: '드롭다운 2', value: 'dropdown2' },
    { label: '드롭다운 3', value: 'dropdown3' },
  ];

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const [selectedDropdown, setSelectedDropdown] = useState('');

  const handleDropdownSelect = (selectedDropdown) => {
    setSelectedDropdown(selectedDropdown);
  };


  return (
    <div>    
      <Dropdown options={options} placeholder="드롭다운 옵션 선택" onSelect={handleOptionSelect} dropdownType="A" />
      <p>선택된 옵션 label : {selectedOption ? selectedOption.label : '없음'}</p>
      <p>선택된 옵션 value : {selectedOption ? selectedOption.value : '없음'}</p>

      <Dropdown options={options2} placeholder="드롭다운 선택" onSelect={handleDropdownSelect} dropdownType="B" />
      <p>선택된 드롭다운 label : {selectedDropdown ? selectedDropdown.label : '없음'}</p>
      <p>선택된 드롭다운 value : {selectedDropdown ? selectedDropdown.value : '없음'}</p>
    </div>
  );
};

export default SamplePageDropdown;