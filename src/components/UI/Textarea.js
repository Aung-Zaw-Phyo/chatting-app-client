import React from "react";

const Textarea = (props) => {
    const type = props.type
    const name = props.name;
    const label = props.label;
    const conditionalLabel = props.conditionalLabel
    const changeHandler = props.onChange;
    const blurHandler = props.onBlur;
    const value = props.value
    const defaultValue = props.defaultValue
    const error = props.error
    const inputClasses = `${props.className} block rounded w-full outline-none border-[1.5px] border-gray-400 p-2  focus:border-[#222811b1] duration-300`
    return (
        <div className="mb-3 w-full">
            <div  className="block mb-2">
                <label htmlFor={name} className="me-4">{label}</label>
                <span className="text-[red]">{conditionalLabel && '( ' + conditionalLabel + ' )'}</span>
            </div>
            <textarea type={type} id={name} name={name}
                onChange={changeHandler} onBlur={blurHandler} value={value} defaultValue={defaultValue}
                className={inputClasses}
            ></textarea>
            {
                error && <p className="mt-1 text-red-700">Please enter a valid {name}.</p>
            }
        </div>
    );
};

export default Textarea;
