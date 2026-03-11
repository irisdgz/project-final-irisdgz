import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuthStore } from "../store/authStore";

export default function Navbar() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);

  return (
    <Header>
      <Brand to="/">MiniStops</Brand>

      <Nav>
        {isLoggedIn && <NavItem to="/">Home</NavItem>}
        {isLoggedIn && <NavItem to="/add-place">Add place</NavItem>}
        {isLoggedIn && (
          <LogoutButton type="button" onClick={logout}>
            Log out
          </LogoutButton>
        )}
      </Nav>
    </Header>
  );
}

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px 40px;
  border-bottom: 1px solid #eee;
`;

const Brand = styled(Link)`
  font-size: 50px;
  font-weight: 800;
  text-decoration: none;
  color: black;
  letter-spacing: -1px;
  line-height: 1;

   &:hover {
    text-decoration: none;
  }
`;


const Nav = styled.nav`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const NavItem = styled(NavLink)`
  text-decoration: none;
  color: inherit;

  &.active {
    font-weight: 600;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  font: inherit;
  color: inherit;
`;