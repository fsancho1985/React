import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

import { toast } from 'react-toastify'

import { postForm } from '../services/services'

import '../css/form.css'

function Form({getText}) {

    const { register, handleSubmit, setValue } = useForm()
    
    useEffect(() => {
        setValue('message', getText)
    }, [setValue, getText])
    
    const sendForm = async (data) => {
            try {
                const {data: resp} = await postForm(data)
                console.log("Resp: ", resp)
                toast.success("Obrigado por seu interesse, em breve retornaremos o contato!")
            } catch (error) {
                toast.error("Favor preencher todos os dados para contato!")
            }
        }


    return (
        <section className="container-form">
            <div className="card-form">
                <form className="form" onSubmit={handleSubmit(sendForm)}>
                    <label className="form-name" for="name">Nome Completo</label>
                    <input {...register("name")} type="text" />
                    <label className="form-email" for="email">E-mail</label>
                    <input {...register("email")} type="email" />
                    <label className="form-phone" for="phone">Telefone</label>
                    <input {...register("phone")} type="tel" />
                    <label className="form-message" >Mensagem</label>
                    <textarea {...register("message")} className="message"></textarea>
                    <button className="btn-send" type="submit">ENVIAR</button>
                </form>
            </div>
        </section>
    )
}

export default Form