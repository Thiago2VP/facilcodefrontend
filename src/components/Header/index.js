import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Nav } from './styled';
import { Container } from '../../styles/GlobalStyles';
import qrImage from '../../assets/images/qr-code.png';
import enter from '../../assets/images/enter.png';
import user from '../../assets/images/user.png';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <header>
      <Container>
        <Nav>
          <Link to="/">
            <img src={qrImage} alt="Voltar para a página principal" />
          </Link>

          {isLoggedIn ? (
            <Link to="/user">
              <img src={user} alt="Página do usuário" />
            </Link>
          ) : (
            <Link to="/login">
              <img src={enter} alt="Fazer login" />
            </Link>
          )}
        </Nav>
      </Container>
    </header>
  );
}
