import {client, client2} from "../provider/client";

const apiCode = '0n5tc3h'

export const getPet = () => {
    return client.get(`/${apiCode}`)
}

export const getPetID = (id) => {
    return client.get(`/${apiCode}/${id}`)
}

export const postPet = (body) => {
    return client.post(`/${apiCode}`, body)
}

export const editPet = (id, body) => {
    return client.put(`/${apiCode}/${id}`, body)
}

export const delPet = (id) => {
    return client.delete(`/${apiCode}/${id}`)
}

export const postForm = (body) => {
    return client2.post(`/contact`, body)
}