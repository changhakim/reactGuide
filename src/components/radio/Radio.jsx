
import RadioStyle from './Radio.module.scss';

const Radio = ({children, value, name,defaultChecked,disabled,onClickRadioHandler})=>{
    
    const onClickRadio =(e)=>{
        console.log(e.target.value);
   
        onClickRadioHandler(e.target.value);
    }
    return( 

        <label className={RadioStyle["Radio-label"]}>

            <input className={RadioStyle["Radio-input"]}
                type = "radio"
                value ={value}
                name = {name}
                defaultChecked = {defaultChecked}
                disabled  = {disabled}
                onClick={(e)=>{onClickRadio(e)}}
            />
            {children}
        </label>
    )


}


export default Radio;