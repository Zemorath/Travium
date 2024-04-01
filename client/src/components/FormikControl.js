import Select from './Select'
import SelectProviders from './SelectProviders'

function FormikControl (props) {
    const { control, ...rest } = props
    switch (control) {
        case 'selectServices':
            return <Select {...rest} />
        case 'selectProviders':
            return <SelectProviders {...rest} />
        default:
            return null
    }
}

export default FormikControl