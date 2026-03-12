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

  @media (max-width: 768px) {
    padding: 18px 20px;
  }

  @media (max-width: 480px) {
    padding: 14px 12px;
  }
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

  @media (max-width: 768px) {
    font-size: 40px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 18px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const NavItem = styled(NavLink)`
  text-decoration: none;
  color: var(--text);
  font-size: 16px;
  font-weight: 500;
  padding: 4px 6px;
  border-radius: 6px;
  transition: color 0.2s ease;

  &:hover {
    color: var(--muted);
  }

  &.active {
    font-weight: 700;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 2px 4px;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  padding: 4px 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: var(--text);
  transition: color 0.2s ease;

  &:hover {
    color: var(--muted);
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 2px 4px;
  }
`;