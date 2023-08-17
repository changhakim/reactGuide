import { RadioGroup, Radio ,Drawer} from "@components";
import { InputCalendarPicker } from '@components';
import {useState} from 'react';
import Style from "./InquiryOption.module.scss";
import { Button } from 'react-bootstrap';
import { useDrawer } from '@modules/hooks';

const InquiryOption =()=> { 

    const drawerKey = 'accountTypeSelectDrawer';
	const [, showAcctTypeDrawer] = useDrawer(drawerKey);
    const [drawOpen, setDrawOpen] = useState(false);
    const handleDrawer =()=>{ 
        showAcctTypeDrawer(!drawOpen);
    }
    
    const [radioValue, setradioValue] = useState('1Month');
    const [inputCalendarPickerDate, setInputCalendarPickerDate] = useState('2023-08-16');
    const [minDate, setMinDate] = useState('20230101');
    const [maxDate, setMaxDate] = useState('20231231');

    const [inputCalendarPickerDate2, setInputCalendarPickerDate2] = useState('2023-08-16');
    const [minDate2, setMinDate2] = useState('20230101');
    const [maxDate2, setMaxDate2] = useState('20231231');
    const onClickRadioHandler = ()=>{ 

    }
    
    return(
        <>
        <Button className={Style["inquiryBtn"]}
        onClick={handleDrawer}>조회옵션</Button>
           <Drawer
           key={drawerKey}
           opts={{
               drawerKey,
               isPuller: false,
               height: 426,
               isPercentH: false,
               afterOpen: () => {},
               afterClose: null,
               header: {
                   title: '조회옵션',
               },
           }}
       >
        <div className={Style["modal"]}> 
        <RadioGroup label="조회기간" className={Style["radioGroup-label"]}>
            <Radio name="inqPeriod" value="1Month" 
            onClickRadioHandler={onClickRadioHandler}>
                1개월
            </Radio>
            <Radio name="inqPeriod" value="3Month" checked="checked"
            onClickRadioHandler={onClickRadioHandler}>
                3개월
            </Radio>
            <Radio name="inqPeriod" value="6Month" 
            onClickRadioHandler={onClickRadioHandler}>
                6개월
            </Radio>
            <Radio name="inqPeriod" value="12Month" 
            onClickRadioHandler={onClickRadioHandler}>
                1년
            </Radio>
        </RadioGroup>
        <div className="calWrap" style={{display:'flex', paddingLeft:'10px'}}>
        <InputCalendarPicker 
            style = {{display:'flex', marginRight:'20px'}}
            defaultDateValue={inputCalendarPickerDate}
            minDate={minDate}
            getValue={(value) => {
               
                setInputCalendarPickerDate(value);
            }}
        ></InputCalendarPicker>
           <InputCalendarPicker
            defaultDateValue={inputCalendarPickerDate2}
            minDate={minDate2}
            getValue={(value) => {
           
                setInputCalendarPickerDate(value);
            }}
        ></InputCalendarPicker>
        </div>
       
          <RadioGroup label="거래구분">
            <Radio name="transation" value="all" checked="checked"
            onClickRadioHandler={onClickRadioHandler}>
                전체
            </Radio>
            <Radio name="transation" value="deposit" 
            onClickRadioHandler={onClickRadioHandler}>
                입금
            </Radio>
            <Radio name="transation" value="withdraw" 
            onClickRadioHandler={onClickRadioHandler}>
                출금
            </Radio>
        </RadioGroup>``
        <RadioGroup label="정렬순서">
            <Radio name="sortOrder" value="latest" checked="checked"
            onClickRadioHandler={onClickRadioHandler}>
                최신순
            </Radio>
            <Radio name="sortOrder" value="past" 
            onClickRadioHandler={onClickRadioHandler}>
                과거순
            </Radio>
        </RadioGroup>
      
        
    </div>
      </Drawer>
        
        </>
    )
}

export default InquiryOption;