import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

export default function Navbar({ isLoggedIn = false, onLogout = () => {} }) {
  return (
    <Header>
      <Brand to="/">MiniStops</Brand>

      <Nav>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/add-place">Add place</NavItem>

        {isLoggedIn ? (
          <LogoutButton type="button" onClick={onLogout}>
            Log out
          </LogoutButton>
        ) : (
          <NavItem to="/login">Log in</NavItem>
        )}
      </Nav>
    </Header>
  );
}

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
`;

const Brand = styled(Link)`
  font-weight: 700;
  text-decoration: none;
  color: inherit;
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
  padding: 8px 10px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 8px;
  cursor: pointer;
`;