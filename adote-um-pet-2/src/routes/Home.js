import { useState } from 'react'

import Header from '../components/Header'
import Galery from '../components/Galery'
import Form from '../components/Form'
import Footer from '../components/Footer'

function Home() {

    const [getText, setGetText] = useState("")

    return (
        <>
            <Header/>
            <Galery setGetText={setGetText} />
            <Form getText={getText} />
            <Footer />
        </>
    )
}

export default Home