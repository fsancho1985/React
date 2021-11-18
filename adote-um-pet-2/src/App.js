import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css"

import Nav from './components/Nav'
import Home from './routes/Home';
import List from './routes/List';
import PrivateRoute from './routes/PrivateRoute'

import {AuthContext} from './contexts/AuthContext'
import useAuth from './hooks/useAuth'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import EditPet from './routes/modal/EditPet';
import AdoptedPet from './routes/modal/AdoptedPet';

function App() {
  const auth = useAuth()
  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <ToastContainer/>
          <Switch>
            <Route exact path="/">
            <Nav/>
              <Home/>
            </Route>
            <PrivateRoute exact path="/list" >
              <List />
            </PrivateRoute>
            <Route exact path="/modal/:id" >
              <EditPet />
            </Route>
            <Route exact path="/adopted/:id">
              <AdoptedPet />
            </Route>
          </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
