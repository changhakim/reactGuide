import RadioStyle from './Radio.module.scss';
const RadioGroup = ({label, children})=>{ 

    return( 

        <fieldset className={RadioStyle["Radio-fieldset"]}>
            
            <legend>{label}</legend>
            {children}
        </fieldset>
    )
}

export default RadioGroup;