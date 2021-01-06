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
  line-height: 64px;

  & * {
    color: #555;
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
  ${props => props.$active && `background: rgba(0, 0, 0, 0.1)`}
`

function Header() {
  const location = useLocation()
  const { pathname } = location
  const { user, setUser, isGettingUser } = useContext(AuthContext)
  const history = useHistory();

  function handleLogout() {
    setAuthToken('');
    history.push('/');
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
