import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const isUsers = isAuthenticated && user;

  return (
    <Wrapper>
      {isUsers && user.picture && <img src={user.picture} alt={user.name} />}
      {
        isUsers && user.name && (
          <h4>
            welcome, <strong>{user.name.toUpperCase()}</strong>
          </h4>
        )
      }
      {
        isUsers ? (
          <button onClick={() => {
            logout({ returnTo: window.location.origin });
          }}>
            Logout
          </button>
        ) : (
            <button onClick={loginWithRedirect}>
              logout
            </button>
        )
      }
    </Wrapper>
  )
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`;

export default Navbar;
