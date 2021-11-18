import { Link } from 'react-scroll'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { login as log } from '../services/auth'

import Logo from '../img/brand-logo.png'
import LogoLogin from '../img/brand-logo-login.png'

import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import '../css/nav.css'
import '../css/modal.css'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

function Nav() {

    const history = useHistory()

    const { register, handleSubmit } = useForm()

    const { login } = useContext(AuthContext)
    
    const onSubmit = async data => {
        try {
            const {data: resp} = await log(data)
            const { token } = resp
            localStorage.setItem('token', token)
            toast.success("Login realizado com sucesso!")
            login()
            history.push('/list')
            handleClose()
        } catch (error) {
            toast.error('Ops! Algo de errado não está certo! Verifique os campos digitados')            
        }
    }

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false)

    const [menu, setMenu] = useState(false)

    const openMenu = () => setMenu(true)
    const closeMenu = () => setMenu(false)

    return (
            <header>
            <nav className="container-nav">
                <img className="logo" src={Logo} alt="logo" onClick={() => history.push('/')}/>
                <div className="menu">
                    <ul className="menu-list">
                        <li><Link className="active" to="/login" onClick={handleShow}>LOGIN</Link></li>
                        <li><Link style={{a:"active", color: "#ffd18d"}} className="active" to="galery" spy={true} offset={-8} smooth={true} duration={1000}>GALERIA</Link></li>
                        <li><Link style={{a:"active", color: "#ffd18d"}} className="active" to="container-form" spy={true} offset={-150} smooth={true} duration={500}>CONTATO</Link></li>
                    </ul>
                </div>
                <div className="hamburguer">
                    {!menu ? 
                    (<FontAwesomeIcon icon={faBars} onClick={() => openMenu()}/>) : <FontAwesomeIcon icon={faTimes} onClick={() => closeMenu()}/>} 
                </div>
            </nav>
            {menu ? (<div className="menu-mobile">
                <ul>
                    <li><Link className="active" to="/login" onClick={handleShow}>LOGIN</Link></li>
                    <li><Link style={{a:"active", color: "#ffd18d"}} className="active" to="galery" spy={true} offset={-8} smooth={true} duration={1000}>GALERIA</Link></li>
                    <li><Link style={{a:"active", color: "#ffd18d"}} className="active" to="container-form" spy={true} offset={-150} smooth={true} duration={500}>CONTATO</Link></li>
                </ul>
                </div>) : null}
                <Modal size="sm" className="modal-login" show={show} onHide={handleClose}>
                    <div className="card-login">
                        <div className="img-card-login">
                            <img src={LogoLogin} alt="logo-login" />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label>Email</label>
                            <input type="email" required /*onChange={handleChange}*/ {...register('email')}></input>
                            <label>Senha</label>
                            <input type="password" required /*onChange={handleChange}*/ {...register('password')}></input>
                            <button className="btn-login" type="submit">Entrar</button>
                        </form>
                    </div>
                </Modal>
        </header>
    )
}

export default Nav