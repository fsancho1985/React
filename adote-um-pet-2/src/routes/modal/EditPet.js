import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useHistory, useParams } from "react-router"
import { Modal } from "react-bootstrap"

import { editPet, getPetID } from '../../services/services'
import { toast } from "react-toastify"

import '../../css/editpet.css'

function EditPet() {

    const history = useHistory()

    const [showEdit, setShowEdit] = useState(false)

    const [getPet, setGetPet] = useState([])

    const [adoption, setAdoption] = useState("")

    const handleAdoption = (event) => setAdoption(event.target.value)
    
    const [species, setSpecies] = useState("")

    const handleSpecies = (event) => setSpecies(event.target.value)
    
    const [gender, setGender] = useState("")

    const handleGender = (event) => setGender(event.target.value)

    const {id} = useParams()

    const { register, handleSubmit, setValue} = useForm()

    const handleShowEdit = () => setShowEdit(true)
    const handleCloseEdit = () => setShowEdit(false)

    useEffect(() => {
        const fetchData = async (data) => {
            try {
                const { data: resp } = await getPetID(id, data)
                const { pet } = resp
                setValue("name", pet.name)
                setValue("breed", pet.breed)
                setValue("age", pet.age)
                setValue("species", pet.species)
                setValue("gender", pet.gender)
                setValue("url", pet.url)
                setValue("adopted", pet.adopted)
                setGetPet(pet)
            } catch (error) {
                
            }
        }
        fetchData()
    }, [id, setValue]);

    const handleEditPet = async (data) => {
        try {
            const {data: resp} = await editPet(id, {...data, adopted: Boolean(adoption)})
            toast.success("Pet editado com sucesso!")
            history.push('/list')
        } catch (error) {
            toast.error("Ops! Verifique os dados preenchidos")
        }
    }

    if(!getPet) return null
    
    return (
        <Modal size="xl" show={handleShowEdit} onHide={()=>history.push('/list')}>
                    <form className="register-edit" onSubmit={handleSubmit(handleEditPet)}>
                            <p>Editar pet</p>
                        {/* modal desktop */}
                        <div className="field-edit">
                            <label>Nome</label>
                            <label>Raça</label>
                            <label>Idade</label>
                        </div>
                        <div className="inputs-edit">
                            <input type="name" required {...register("name")} ></input>
                            <input type="name" required {...register("breed")} ></input>
                            <input type="age" required {...register("age")} ></input>
                        </div>
                        <div className="field-edit">
                            <label>Espécie</label>
                            <label>Sexo</label>
                            <label>URL imagem</label>
                        </div>
                        <div className="inputs-edit">
                            <select type="select" {...register("species")} value={species} onChange={handleSpecies}>
                                <option value=""></option>
                                <option value={"Cachorro"} >Cachorro</option>
                                <option value={"Gato"} >Gato</option>
                            </select>
                            <select type="select" {...register("gender")} value={gender} onChange={handleGender}>
                                <option value=""></option>
                                <option value={"Macho"}>Macho</option>
                                <option value={"Fêmea"}>Fêmea</option>
                            </select>
                            <input type="name" required {...register("url")}></input>
                        </div>
                            <div className="select-adoption">
                                <div className="btn-select-adoption">
                                    <label>Adotação</label>
                                </div>
                                    <select type="select" {...register("adopted")} value={adoption} onChange={handleAdoption}>
                                        <option value=""></option>
                                        <option value={true} >Sim</option>
                                        <option value={false} >Não</option>
                                    </select>
                            </div>
                        <div className="card-btn-pet">
                        <button className="btn-register" type="submit">Editar</button>
                        <button className="btn-cancel" onClick={()=> history.push('/list')}>Cancelar</button>
                        </div>
                        {/* modal mobile */}
                         <div className="mobile-register-edit">
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
                                <div className="card-btn-pet-mobile">
                                    <button className="btn-register" type="submit">Editar</button>
                                    <button className="btn-cancel" onClick={()=> history.push('/list')}>Cancelar</button>
                                </div>
                            </div>
                    </form>
                </Modal>
    )
}

export default EditPet