import {Radio, RadioGroup} from "@components";
import {useState, useCallback} from 'react';


const SamplePageRadio =()=>{ 

    const [radioValue, setradioValue] = useState('email');

    const onClickRadioHandler =useCallback((val)=>{
        setradioValue(val);
    },[radioValue]);

    return ( 

        <RadioGroup label="marketing">
            <Radio name="marketing" value="email" defaultedChecked
             onClickRadioHandler={onClickRadioHandler}>
                Email
            </Radio>
            <Radio name="marketing" value="phone"
            onClickRadioHandler={onClickRadioHandler}>
                Phone
            </Radio>
            <Radio name="marketing" value="sms"
            onClickRadioHandler={onClickRadioHandler}>
                Sms
            </Radio>
            <Radio name="marketing" value="fax" disabled
            onClickRadioHandler={onClickRadioHandler}>
                Fax
            </Radio>
        </RadioGroup>
    )
}


export default SamplePageRadio;