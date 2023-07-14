import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const Login = props => {
  const jwtToken = Cookies.get('jwt_token')

  const submitSuccess = Token => {
    const {history} = props
    Cookies.set('jwt_token', Token, {expires: 30})
    history.replace('/')
  }

  const submitData = async event => {
    event.preventDefault()
    const userDetails = {username: 'rahul', password: 'rahul@2021'}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      submitSuccess(data.jwt_token)
    }
  }

  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <div className="login-container">
      <h1>Please Login</h1>
      <button type="button" onClick={submitData}>
        Login with Sample Creds
      </button>
    </div>
  )
}

export default Login
