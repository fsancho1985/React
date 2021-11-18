import { useContext } from 'react'

import {Route, Redirect} from 'react-router-dom'

import {AuthContext} from '../contexts/AuthContext'

function PrivateRoute({children, ...rest}) {

    const {isAuthenticated} = useContext(AuthContext)

    return (
        <Route {...rest}
        render={() => isAuthenticated ? children : <Redirect to= "/" />}/>
    )
}

export default PrivateRoute