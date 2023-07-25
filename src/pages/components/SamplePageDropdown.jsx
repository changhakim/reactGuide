import {Dropdown} from "@components";
import {useState} from "react";

const SamplePageDropdown = () => {
  const options = [
    { label: '옵션 1', value: 'option1' },
    { label: '옵션 2', value: 'option2' },
    { label: '옵션 3', value: 'option3' },
  ];

  const options2 = [
    { label: '드롭다운 1', value: '드롭다운1' },
    { label: '드롭다운 2', value: '드롭다운2' },
    { label: '드롭다운 3', value: '드롭다운3' },
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
      <h1>Dropdown Test</h1>
      <Dropdown options={options} onSelect={handleOptionSelect}>
        옵션 선택
      </Dropdown>
      <p>선택된 옵션       : {selectedOption ? selectedOption.label : '없음'}</p>
      <p>선택된 옵션 value : {selectedOption ? selectedOption.value : '없음'}</p>

      <Dropdown options={options2} onSelect={handleDropdownSelect}>
        드롭다운 선택
      </Dropdown>
      <p>선택된 드롭다운       : {selectedDropdown ? selectedDropdown.label : '없음'}</p>
      <p>선택된 드롭다운 value : {selectedDropdown ? selectedDropdown.value : '없음'}</p>
    </div>
  );
};

export default SamplePageDropdown;