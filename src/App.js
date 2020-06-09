import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Admin from './components/Admin/Admin'
import Home from './components/Home/Home';
import Nav from './components/Nav';
import Haj from './components/Home/Haj'
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp'
import { AuthProvider } from './components/Auth/Auth'
import PrivateRoute from './components/Auth/PrivateRoute'
import Test from './components/Test';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <PrivateRoute exact path="/admin" component={Admin}/>
          <Route path="/haj">
            <Haj />
          </Route>
          <Route path="/">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          {/* <Route path="/test">
            <Test />
          </Route> */}
        </Switch>
      </Router>
      </AuthProvider>
  )
}

export default App