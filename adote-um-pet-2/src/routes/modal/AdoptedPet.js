/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { Modal } from "react-bootstrap"

import { editPet, getPetID } from '../../services/services'
import { toast } from "react-toastify"

import '../../css/adoptedpet.css'

function AdoptedPet() {

    const history = useHistory()

    const [getPet, setGetPet] = useState([])

    const [showAdoption, setShowAdoption] = useState(false)

    const handleShowadoption = () => setShowAdoption(true)

    const {id} = useParams()

    useEffect(() => {
        const fetchData = async (data) => {
            try {
                const { data: resp } = await getPetID(id, data)
                const { pet } = resp
                setGetPet(pet)
            } catch (error) {
                
            }
        }
        fetchData()
    }, [id]);

    const handleAdoptiontPet = async (data) => {
        try {
            const {data: resp} = await editPet(id, {...getPet, adopted: Boolean(true)})
            toast.success("Pet adotado com sucesso!")
            history.push('/list')
        } catch (error) {
            toast.error("Ops! Verifique os dados preenchidos")
        }
    }

    if(!getPet) return null

    return (
        <Modal size="lg" show={handleShowadoption} onHide={()=>history.push('/list')}>
                        <div className="card-adopt">
                            <h4>O pet da lista foi adotado? {"<3"}</h4>
                            <div className="card-btn-edit">
                                <button className="btn-edit"  onClick={()=>handleAdoptiontPet(id)}>Sim</button>
                                <button className="btn-deny" onClick={()=>history.push('/list')}>Não</button>
                            </div>
                        </div>
        </Modal>

    )
}

export default AdoptedPet