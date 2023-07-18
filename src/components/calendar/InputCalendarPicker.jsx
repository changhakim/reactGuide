import { useState, useLayoutEffect, useEffect } from 'react';
import { any, bool } from 'prop-types';
import dayjs from 'dayjs';
import 'react-calendar/dist/Calendar.css';
import { Button } from 'react-bootstrap';
import CalendarPicker from './CalendarPicker';
import { store } from '@modules/redux';
import { modalActions } from '@modules/redux';


const InputCalendarPicker = ({    
	defaultDateValue,
	minDate = undefined,
	maxDate = undefined,
	getValue = null,
}) => {

	defaultDateValue = defaultDateValue === undefined ? undefined : dayjs(defaultDateValue);
	minDate = minDate === undefined ? undefined : dayjs(minDate);
	maxDate = maxDate === undefined ? undefined : dayjs(maxDate);

	const [resDate, setResDate] = useState(defaultDateValue.format('YYYY-MM-DD'));
	const [resDateDisp, setResDateDisp] = useState(defaultDateValue.format('YYYY-MM-DD'));
	const [isOk, setIsOk] = useState(false);


	useEffect(()=>{
		console.log('isOk:::' + isOk)
        if(isOk){
            setResDateDisp(resDate);
			setIsOk(false);
        }
		
		getValue(resDateDisp);
    },[getValue, resDateDisp, isOk, resDate]);

	const onClickBUtton = ()=>{

        store.dispatch(
            modalActions.modalPopupPortal({
                id:'calendarPicker',
                isOpen: true,
                uiType: "confirm",
                title:'calendar',
                content: () => (
                    <CalendarPicker
                        defaultDateValue={dayjs(defaultDateValue)}
                        minDate={minDate === undefined ? undefined : dayjs(minDate)}
                        maxDate={maxDate === undefined ? undefined : dayjs(maxDate)}
                        getValue={(value) => {
							setResDate(value.dateValue);
                            console.log('InputCalendarPicker getValue:' + JSON.stringify(value));
							console.log('InputCalendarPicker setSelDate:' + JSON.stringify(setResDate));
                        }}
                    />
                ),
                onConfirm: {
                    confirmClick: () => {
                        console.log('confirmClick');
                        setIsOk(true);
                    },
                },
                onCancel: {
                    cancelClick: () => {
                        console.log('cancelClick');
                        setIsOk(false);
                    },
                },
            }),
        );
    };

	return (
		<div className='calendar-wrap'>
			<input
                type='text'
                id="ipToday"
                value={resDateDisp}
                onChange={(e)=>{
					// setSelDate(e.target.value); console.log(selDate);
				}}
                name='선택날짜'
                // minLength='8'
                maxLength='8'
				readOnly={true}
            />
			<span>   </span>
			<Button
                onClick={onClickBUtton}
            >달력</Button>
		</div>
	);
};

InputCalendarPicker.propTypes = {
	defaultDateValue: any,
	minDate: any,
	maxDate: any,
	getValue: any,
};

export default InputCalendarPicker;
