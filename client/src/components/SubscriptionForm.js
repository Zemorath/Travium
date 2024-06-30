import React, { useEffect } from "react";
import { useHistory } from "react-router"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styled from "styled-components";
import FormikControl from './FormikControl'
import "../styles/SubForm.css"
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProviders, selectProviders} from '../redux/ProviderSlice'
import { fetchServices, selectServices } from '../redux/ServicesSlice'


function SubForm({ user }) {

    const dispatch = useDispatch()
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchProviders())
        dispatch(fetchServices())
    }, [dispatch])

    const providers = useSelector(selectProviders)
    const services = useSelector(selectServices)

    // const [providers, setProviders] = useState([])
    // useEffect(() => {
    //     fetch('/providers').then((r) => {
    //         if (r.ok) {
    //             r.json().then((providers) => setProviders(providers))
    //         }
    //     });
    // }, []);

    // const [services, setServices] = useState([])
    // useEffect(() => {
    //     fetch('/availableservices').then((r) => {
    //         if (r.ok) {
    //             r.json().then((services) => setServices(services))
    //         }
    //     });
    // }, []);

    // const id = user.id

    const handleSubmit = async (values) => {

        const payload = {
            ...values,
            user_id: user.id
        }

        try {
            const response = await fetch("/subscriptionsusing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });
            
            if (response.ok) {
                console.log("Form submitted", payload)
                history.push('/services')
            } else {
                console.error("An error occurred when submitting the form")
            }
        } catch (error) {
            console.error("An error occurred when submitting the form", error)
        }
    }

    const intitialValues = {
        type: 'Pharmacy',
        sub_price: 10,
        description: '',
        status: 'active',
        user_id: id,
        provider_id: 1,
        provider_price: null,
    }

    const validationSchema = Yup.object({
        type: Yup.string().required('Service Type Required'),
        description: Yup.string().required('Please give a brief description'),
        provider_price: Yup.number().required('Price Required'),
        provider_id: Yup.number().required('Provider Required')
    })


    return (
        <Formik 
            initialValues={intitialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            <Form className="sub-form">
                <h1>Add New Subscription</h1>
                <FieldContainer>
                    <FormikControl
                        control='selectServices'
                        label='Select a service'
                        name='type'
                        options={services}
                    />
                    <ErrorMessage name='type' />
                </FieldContainer>
                <FieldContainer>
                    <FormikControl 
                        control='selectProviders'
                        label="Select a Provider"
                        name='provider_id'
                        options={providers}
                    />
                    <ErrorMessage name='provider_id' />
                </FieldContainer>
                <FieldContainer>
                    <Field 
                        type='number'
                        id='sub_price'
                        name='sub_price'
                        className='user_id'
                    />
                    <ErrorMessage name='sub_price' />
                </FieldContainer>
                <FieldContainer>
                    <Label>Please enter how much your service typically costs: </Label>
                    <Field
                        type="number"
                        id="provider_price"
                        name="provider_price"
                    />
                    <ErrorMessage name='provider_price' />
                </FieldContainer>    
                <FieldContainer>
                    <Label>Please write a brief description about your service: </Label>
                    <Field
                        type="text"
                        id="description"
                        name="description"
                        className='description'
                    />
                    <ErrorMessage name='description' />
                </FieldContainer>
                <FieldContainer>
                    <button variant="fill" color="primary" type="submit">
                        Submit
                    </button>
                </FieldContainer> 
            </Form>
        </Formik>
    )
}


const FieldContainer = styled.div`
    padding-top: 15px;
`


const Label = styled.label`
    color: black;
    display: block;
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 8px;
    margin-top: 20px;
`


export default SubForm