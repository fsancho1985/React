import {useState} from 'react'

function useAuth() {

    const [isAuthenticated, setIsAuthenticated] = useState()

    const login = () => {
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
    }

    return { isAuthenticated: isAuthenticated, login: login, logout: logout }
}

export default useAuth