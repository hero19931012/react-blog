/* eslint-disable consistent-return */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable import/no-unresolved */
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

  // show error message
  const [errorMessage, setErrorMessage] = useState('')

  // useHistory
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
        // 把 token 寫入 localStorage
        // 也可以另開 utils.js => setAuthToken, 再引入
        // localStorage.setItem('token', token)
        setAuthToken(token);

        // 4. 存取 getMe API, 取得 user data => setUser(data)
        getMe().then((response) => {
          console.log(response);
          if (response.ok !== 1) {
            // login fail => set token to null, show errorMessage
            setAuthToken(null);
            return setErrorMessage(response.toString());
          }

          setUser(response.data)

          // redirect to home page
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
