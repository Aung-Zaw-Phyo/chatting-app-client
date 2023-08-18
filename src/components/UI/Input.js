import React from "react";

const Input = (props) => {
    const focus = props.focus
    const type = props.type
    const name = props.name;
    const label = props.label;
    const conditionalLabel = props.conditionalLabel
    const changeHandler = props.onChange;
    const blurHandler = props.onBlur;
    const value = props.value
    const defaultValue = props.defaultValue
    const placeholder = props.placeholder
    const error = props.error
    const inputClasses = `${props.className} block rounded w-full p-2 outline-none border-[1.5px] border-[#2a2a2a] bg-[#2a2a2a] text-white duration-300`
    return (
        <div className="mb-3 w-full">
            {/* <div  className="block mb-2">
                <label htmlFor={name} className="me-4">{label}</label>
                <span className="text-[red]">{conditionalLabel && '( ' + conditionalLabel + ' )'}</span>
            </div> */}
            <input type={type} id={name} name={name} autoFocus={focus}
                onChange={changeHandler} onBlur={blurHandler} 
                value={value} defaultValue={defaultValue}
                className={inputClasses}
                placeholder={placeholder}
            />
            {
                error && <p className="mt-1 text-red-700">Please enter a valid {name}.</p>
            }
        </div>
    );
};

export default Input;
