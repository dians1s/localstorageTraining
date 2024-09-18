import React from "react";
import classes from './MySelect.module.scss'

const MySelect = ({defaultValue, options, ...props}) => {
    return(
        <select {...props} className={classes.select}>
            <option value={defaultValue.value}>{defaultValue.name}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    )
};

export default MySelect;