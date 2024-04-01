import Select from './Select'

function FormikControl (props) {
    const { control, ...rest } = props
    switch (control) {
        case 'select':
            return <Select {...rest} />
        default:
            return null
    }
}

export default FormikControl