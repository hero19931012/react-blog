/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import {
  HashRouter as Router, Switch, Route,
} from 'react-router-dom';
import Header from '../Header';
import HomePage from '../../pages/HomePage';
import RegisterPage from '../../pages/RegisterPage';
import LoginPage from '../../pages/LoginPage';
import PostPage from '../../pages/PostPage';
import NewPostPage from '../../pages/NewPostPage';
import AboutPage from '../../pages/AboutPage';


import { AuthContext } from '../../contexts';
import { getMe } from '../../WebAPI';
import { getAuthToken } from '../../utils';

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  const [user, setUser] = useState(null);
  const [isGettingUser, setIsGettingUser] = useState(true);

  useEffect(() => {
    if (getAuthToken) {
      getMe().then((response) => {
        if (response.ok) {
          setUser(response.data);
          setIsGettingUser(false);
        }
      });
    }
  }, []);


  return (
    <AuthContext.Provider value={{ user, setUser, isGettingUser }}>
      <Root>
        <Router>
          <Header />
          <Switch>
            {/* 加上 exact 表示完全匹配 */}
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/posts/:id">
              <PostPage />
            </Route>
            <Route path="/new-post">
              <NewPostPage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
          </Switch>

        </Router>
      </Root>
    </AuthContext.Provider>
  );
}


export default App;
