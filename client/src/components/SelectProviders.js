import React from 'react'
import { Field, ErrorMessage } from 'formik'
import styled from "styled-components";


function SelectProviders(props) {
    const { label, name, options, ...rest} = props
    return (
        <div className='form-control'>
            <Label htmlFor={name}>{label}</Label>
            <br />
            <Field as='select' id={name} name={name} {...rest}>
                {
                    options.map((option, index) => {
                        index=index+1
                        return (
                            <option key={option.company} value={index}>
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

const Label = styled.label`
    color: black;
    font-size: 1rem;
    font-weight: 700;
    padding-top: 4%;
`

export default SelectProviders