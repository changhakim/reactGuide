
import RadioStyle from './Radio.module.scss';

const Radio = ({children, value, name,checked,disabled,onClickRadioHandler})=>{
    
    const onClickRadio =(e)=>{
       
        onClickRadioHandler(e.target.value);
    }
    return( 

        <label className={RadioStyle["Radio-label"]}>

            <input className={RadioStyle["Radio-input"]}
                type = "radio"
                value ={value}
                name = {name}
                defaultChecked = {checked}
                disabled  = {disabled}
                onClick={(e)=>{onClickRadio(e)}}
            />
            {children}
        </label>
    )


}


export default Radio;