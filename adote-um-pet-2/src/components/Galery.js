import { useState, useEffect } from 'react'

import { getPet } from '../services/services'

import DonateIcon from '../img/donate-icon.png'

import '../css/galery.css'

function Galery({ setGetText }) { 

    const [pets, setPets] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('olá')
                const {data: resp} = await getPet()
                const { pets } = resp
                console.log('olá2')
                setPets(pets)
                console.log(pets)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    // if (!pets) return null

    return (
        <main>
            <div className="galery">
                <h2>Pets para você adotar</h2>
                <p>Adotar é um ato consciente e abandonar é crime. Não adote por impulso, adote por amor!</p>
                <div className="main-container">
                    <div className="pets">
                        {pets.map((pet) => 
                        <div className="box-pets" key={pet.id}>
                            <img alt="imagens-pets" className="img" src={pet.url} />
                            <div className="box-text">
                                <h3>
                                    Nome: {pet.name} <br /> Sexo: {pet.gender} <br />
                                    Idade: {pet.age}
                                </h3>
                                <img
                                alt="Adopt"
                                style={{ width: "60px", height: "60px", cursor: "pointer" }}
                                src={DonateIcon}
                                title="Adotar"
                                onClick={() => setGetText(`Olá eu gostaria de adotar o ${pet.name}`)}
                                />
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </main>         
    )
}

export default Galery