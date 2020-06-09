import React, { useCallback, useContext, useState } from 'react'
import { withRouter, Redirect } from 'react-router'
import firebase from '../../firebase'
import { AuthContext } from './Auth.js'

const Login = ({ history }) => {
  const [loading, setLoading] = useState()
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault()
      setLoading(true)
      const { email, password } = event.target.elements
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
        setLoading(false)
        history.push('/home')
      } catch (error) {
        setLoading(false)
        alert(error)
      }
    },
    [history],
  )

  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to="/" />
  }

  const loadingComponent = () => {
    if (loading) {
      return <center>Loading...</center>
    }
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
      {loadingComponent()}
    </div>
  )
}

export default withRouter(Login)
