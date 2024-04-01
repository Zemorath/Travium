import React from 'react'
import { Field, ErrorMessage } from 'formik'


function Select(props) {
    const { label, name, options, ...rest} = props
    return (
        <div className='form-control'>
            <label htmlFor={name}>{label}</label>
            <Field as='select' id={name} name={name} {...rest}>
                {
                    options.map(option => {
                        return (
                            <option key={option.type} value={option.type}>
                                {option.type}
                            </option>
                        )
                    })
                }
            </Field>
            <ErrorMessage name={name} />
        </div>
    )
}

export default Select