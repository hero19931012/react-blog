import { useState, useContext } from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import { login, getMe } from '../../WebAPI'
import { setAuthToken } from '../../utils'
import { AuthContext } from '../../contexts';

const LoginForm = styled.form`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  text-align: center;
`
const LoginInputContainer = styled.div`
  & + & {
    margin-top: 10px;
  }
`

const ErrorMessage = styled.div`
  font-size: 16px;
  color: red;
`

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 5px 10px;
  width: 60px;
`

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const history = useHistory()

  const { setUser } = useContext(AuthContext)

  function handleSubmit(e) {
    e.preventDefault()
    login(username, password)
      .then((data) => {
        // login fail
        if (data.ok === 0) {
          return setErrorMessage(data.message)
        }

        // login success
        setErrorMessage(null)
        const { token } = data;
        setAuthToken(token);
        getMe().then((response) => {
          if (response.ok !== 1) {
            setAuthToken(null);
            return setErrorMessage(response.toString());
          }
          setUser(response.data)
          history.push('/')
        })
      })
  }

  return (
    <LoginForm onSubmit={handleSubmit}>
      <h1>登入</h1>
      <LoginInputContainer>
        Username:
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        />
      </LoginInputContainer>
      <LoginInputContainer>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </LoginInputContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <SubmitButton type="submit">登入</SubmitButton>
    </LoginForm>
  );
}

export default LoginPage;
