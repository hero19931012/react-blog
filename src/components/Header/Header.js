/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable import/no-unresolved */
import { useContext } from 'react'
import styled from 'styled-components'
import { Link, useLocation, useHistory } from "react-router-dom";
import { AuthContext } from '../../contexts'
import { setAuthToken } from '../../utils'

const HeaderContainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  padding: 0 32px;

  color: #555;
  background-color: white;

  /* color: white; */
  /* background-color: #000035;  */
  line-height: 64px;

  & * {
    color: #555;
    /* border: solid 1px rgba(0, 0, 0, 0.3) */
  }
`

const Brand = styled.h1`
  margin: 0 20px 0 0;
`
const NavLeftContainer = styled.div`
  display: flex;
  height: 100%;
`
const NavbarList = styled.div`
  display: flex;
  align-items: center;
`
const Nav = styled(Link)`
  padding: 0 10px;
  width: 100px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;

  /* &:hover {
    background-color: #9999aa
  } */

  ${props => props.$active && `background: rgba(0, 0, 0, 0.1)`}
`

function Header() {
  const location = useLocation()
  const { pathname } = location

  // get user
  const { user, setUser, isGettingUser } = useContext(AuthContext)
  const history = useHistory();

  // 8. handleLogout => 1. token 設為 '', 2. 透過 useHistory 導回首頁
  function handleLogout() {
    setAuthToken('');
    // 9. 由於登入會導回首頁，造成不能 push 首頁, 但不影響功能
    history.push('/');

    // 10. user => null
    setUser(null);
  }

  return (
    <HeaderContainer>
      <NavLeftContainer>
        <Brand>部落格</Brand>
        <NavbarList>
          <Nav to="/" $active={pathname === '/'}>首頁</Nav>
          <Nav to="/about" $active={pathname === '/about'}>關於</Nav>
          {!isGettingUser && user && <Nav to="/new-post" $active={pathname === '/new-post'}>發布文章</Nav>}
        </NavbarList>
      </NavLeftContainer>

      <NavbarList>
        {!isGettingUser && user && <div>{user.username}</div>}
        {!isGettingUser && user && <Nav to="/" onClick={handleLogout}>登出</Nav>}
        {!isGettingUser && !user && <Nav to="/login" $active={pathname === '/login'}>登入</Nav>
        }
        {!isGettingUser && !user && <Nav to="/register" $active={pathname === '/register'}>註冊</Nav>
        }
      </NavbarList>

    </HeaderContainer>
  );
}


export default Header;
