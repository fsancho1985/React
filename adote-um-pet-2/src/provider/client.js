import axios from 'axios'

export const client = axios.create({
    baseURL: 'http://otterwise-fake-api.herokuapp.com/pets'
})

client.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
        return config
    }
    return config
})

export const client2 = axios.create({
    baseURL: 'http://otterwise-fake-api.herokuapp.com/'
})