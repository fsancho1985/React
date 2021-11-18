import { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { AuthContext } from '../contexts/AuthContext'

import { Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'


import '../css/list.css'
import '../css/registerpet.css'
// import '../css/register.css'
import DeleteIcon from '../img/delete-icon.png'
import DonateIcon from '../img/donate-icon.png'
import EditIcon from '../img/edit-icon.png'
import { delPet, getPet, postPet } from '../services/services'


function List() {

    const { logout } = useContext(AuthContext)

    const getOut = () => {
        logout()
        history.push('/')
        toast.success("Usuário deslogado")
    }

    const history = useHistory()

    const [pets, setPets] = useState([])

    const [showCadastro, setShowCadastro] = useState(false)

    const [showDelete, setShowDelete] = useState(false)

    const handleShowCadastro = () => setShowCadastro(true)
    
    const handleCloseCadastro = () => setShowCadastro(false)

    const handleShowDelete = (id) => setShowDelete(id)
    const handleCloseDelete = () => setShowDelete(false)

    const handleNavigationEdit = (id) => {history.push(`/modal/${id}`)}

    const handleNavigationAdoption = (id) => {history.push(`/adopted/${id}`)}

    const {register, handleSubmit} = useForm()

    const onSubmit = async data => {
        try {
            const { data: resp } = await postPet(data)
            const { pets } = resp 
            console.log(pets)
            toast.success("Pet cadastrado com sucesso")
            const {data: response} = await getPet()
            setPets(response.pets)
            handleCloseCadastro()
        } catch (error) {
            toast.error("Algo de errado não está certo! Verifique se não existem campos vazios")            
        }
    }
    
    const deletePet = async id => {
        try {
            const {data: resp } = await delPet(id)
            toast.success("Pet deletado com sucesso!")
            handleCloseDelete()
            setPets(resp)
        } catch (error) {
            toast.error("Ops! Houve aulgum erro na deleção do pet!")            
        }
    }

    useEffect(() => {
        const fetchData = async() => {
            try {
                const {data: resp} = await getPet()
                const { pets } = resp
                setPets(pets)
            } catch (error) {
                console.log(error)                
            }
        }
        fetchData()
    }, [])

    if (!pets) return null

    return (
        <>
            <section className="container">
                <div className="container-pets">
                    <div className="total">
                        <h6>Total de pets</h6>
                        <p>{pets.length}</p>
                    </div>
                    <div className='adopted'>
                        <h6>Total de pets adotados</h6>
                        <p>{pets.reduce((acc, elem) => {
                            return acc + elem.adopted
                        },0)}</p>
                    </div>
                </div>
                <div className="table-pets">
                    <p>Lista de pets</p>
                        <table>
                            <thead>
                                <tr>
                                    <th className="name">Nome</th>
                                    <th className="breed">Raça</th>
                                    <th className="age">Idade</th>
                                    <th className="species">Espécie</th>
                                    <th className="gender">Sexo</th>
                                    <th className="adoption">Adotado(a)</th>
                                    <th className="action">Ações</th>
                                </tr>
                            </thead>
                    {pets.map((pet) => 
                            <tbody key={pet.id}>
                                <tr>
                                    <td className="name">{pet.name}</td>
                                    <td className="breed">{pet.breed}</td>
                                    <td className="age">{pet.age}</td>
                                    <td className="species">{pet.species}</td>
                                    <td className="gender">{pet.gender}</td>
                                    <td>{pet.adopted ? "Sim" : "Não"}</td>
                                    <td>{pet.adopted ? <img alt="donate" style={{width: "20px", height: "20px", opacity:"0.5"}} src={DonateIcon}/>
                                    : <img alt="donate" style={{width: "20px", height: "20px", cursor: "pointer"}} src={DonateIcon} onClick={()=>handleNavigationAdoption(pet.id)}/>}
                                        <img alt="edit" style={{width: "20px", height: "20px", cursor: "pointer"}} src={EditIcon} onClick={()=>handleNavigationEdit(pet.id)}/>
                                        <img alt="delete" style={{width: "20px", height: "20px", cursor: "pointer"}} src={DeleteIcon} onClick={() => handleShowDelete(pet.id)}/>
                                    </td>
                                </tr>
                            </tbody>
                            )}
                        </table>
                </div>
                <div className="btn-list">        
                    <button className="insert-pet" onClick={handleShowCadastro}>ENTRADA DE PET</button>
                    <button className="logout" onClick={()=>getOut()}>SAIR</button>
                </div>

                {/* Modal de cadastro de pet */}
                    <Modal size="xl" show={showCadastro} onHide={handleCloseCadastro}>
                        <form className="register" onSubmit={handleSubmit(onSubmit)}>
                            <p>Entrada de pet</p>
                            {/* form mobile */}
                            <div className="mobile-register">
                                <label>Nome</label>
                                <input type="name" required {...register("name")}></input>
                                <label>Raça</label>
                                <input type="name" required {...register("breed")}></input>
                                <label>Idade</label>
                                <input type="age" required {...register("age")}></input>
                                <label>Espécie</label>
                                <select>
                                    <option value=""></option>
                                    <option value="Cachorro" {...register("species")}>Cachorro</option>
                                    <option value="Gato" {...register("species")}>Gato</option>
                                </select>
                                <label>Sexo</label>
                                <select>
                                    <option value=""></option>
                                    <option value="Macho" {...register("gender")}>Macho</option>
                                    <option value="Fêmea" {...register("gender")}>Fêmea</option>
                                </select>
                                <label>URL imagem</label>
                                <input type="name" required {...register("url")}></input>
                            </div>
                            <div className="card-btn-pet-mobile">
                            <button className="btn-register" type="submit">Cadastrar</button>
                            <button className="btn-cancel" onClick={handleCloseCadastro}>Cancelar</button>
                            </div>
                            {/* form desktop */}
                            <div className="labels">
                                <label>Nome</label>
                                <label>Raça</label>
                                <label>Idade</label>
                            </div>
                            <div className="inputs">
                                <input type="name" required {...register("name")}></input>
                                <input type="name" required {...register("breed")}></input>
                                <input type="age" required {...register("age")}></input>
                            </div>
                            <div className="labels">
                                <label>Espécie</label>
                                <label>Sexo</label>
                                <label>URL imagem</label>
                            </div>
                            <div className="inputs">
                                <select>
                                    <option value=""></option>
                                    <option value="Cachorro" {...register("species")}>Cachorro</option>
                                    <option value="Gato" {...register("species")}>Gato</option>
                                </select>
                                <select>
                                    <option value=""></option>
                                    <option value="Macho" {...register("gender")}>Macho</option>
                                    <option value="Fêmea" {...register("gender")}>Fêmea</option>
                                </select>
                                <input type="name" required {...register("url")}></input>
                            </div>
                            <div className="card-btn-pet">
                            <button className="btn-register" type="submit">Cadastrar</button>
                            <button className="btn-cancel" onClick={handleCloseCadastro}>Cancelar</button>
                            </div>
                        </form>
                    </Modal> 

                {/* Modal de deleção de pet */}
                <Modal size="lg" show={showDelete} onHide={handleCloseDelete}>
                        <div className="card-delete">
                            <h4>Certeza de que deseja remover o pet da lista de adoção?</h4>
                            <div className="card-btn-delete">
                                <button className="btn-delete" onClick={() => deletePet(showDelete)}>Sim</button>
                                <button className="btn-deny" onClick={handleCloseDelete}>Não</button>
                            </div>
                        </div>
                </Modal> 
            </section>
        </>
    )
}

export default List