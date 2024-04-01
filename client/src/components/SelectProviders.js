import React from 'react'
import { Field, ErrorMessage } from 'formik'


function SelectProviders(props) {
    const { label, name, options, ...rest} = props
    return (
        <div className='form-control'>
            <label htmlFor={name}>{label}</label>
            <Field as='select' id={name} name={name} {...rest}>
                {
                    options.map(option => {
                        return (
                            <option key={option.company} value={option.company}>
                                {option.company}
                            </option>
                        )
                    })
                }
            </Field>
            <ErrorMessage name={name} />
        </div>
    )
}

export default SelectProviders