import React from 'react'
import { useForm, type SubmitHandler } from "react-hook-form"
import "../App.css"
type FormType = {
    name: string
    email: string
    message: string
}
const ContactForm = () => {
    const { handleSubmit, register, formState: { errors } } = useForm<FormType>()
    const onSubmit: SubmitHandler<FormType> = (data) => {
        console.log(data)
    }
    return (
        <div className='container'>
            <h1>Contact Form</h1>
            <form action="submit" onSubmit={handleSubmit(onSubmit)} className='form'>
                <label htmlFor="name">Name</label>
                <input type="text" {...register("name", {
                    required: "Name is required"
                }
                )} />
                {errors.name && <p className='error'>{errors.name.message}</p>}
                <label htmlFor="email">Email</label>
                <input type="email" {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email format"
                    }
                })} />
                {errors.email && <p className='error'>{errors.email.message}</p>}

                <label htmlFor="">Message</label>
                <textarea {...register("message", {
                    required: "Message is required"
                })} rows={3} />
                {errors.message && <p className='error'>{errors.message.message}</p>}
                <button className='btn' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default ContactForm