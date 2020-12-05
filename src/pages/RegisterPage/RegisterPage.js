/* eslint-disable consistent-return */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable import/no-unresolved */
import { useState, useContext } from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import { register, getMe } from '../../WebAPI'
import { setAuthToken } from '../../utils'
import { AuthContext } from '../../contexts';

const RegisterForm = styled.form`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  text-align: center;
`
const RegisterInputContainer = styled.div`
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

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')

  // show error message
  const [errorMessage, setErrorMessage] = useState('')

  // useHistory
  const history = useHistory()

  const { setUser } = useContext(AuthContext)

  function handleRegisterSubmit(e) {
    e.preventDefault()
    register({
      username,
      nickname,
      password,
    }).then((data) => {
      // Register fail
      if (data.ok === 0) {
        return setErrorMessage(data.message)
      }

      // Register success
      setErrorMessage(null)
      console.log(data);
      const { token } = data;
      // 把 token 寫入 localStorage
      // 也可以另開 utils.js => setAuthToken, 再引入
      // localStorage.setItem('token', token)
      setAuthToken(token);

      // 4. 存取 getMe API, 取得 user data => setUser(data)
      getMe().then((response) => {
        console.log(response);
        if (response.ok !== 1) {
          // Register fail => set token to null, show errorMessage
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
    <RegisterForm onSubmit={handleRegisterSubmit}>
      <h1>註冊</h1>
      <RegisterInputContainer>
        Username:
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        />
      </RegisterInputContainer>
      <RegisterInputContainer>
        Nickname:
        <input
          type="text"
          name="nickname"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value)
          }}
        />
      </RegisterInputContainer>
      <RegisterInputContainer>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </RegisterInputContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <SubmitButton type="submit">註冊</SubmitButton>
    </RegisterForm>
  );
}

export default RegisterPage;
