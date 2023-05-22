import React from 'react';

import { Container, MainTittle } from '../../styles/GlobalStyles';
import { Section404 } from './styled';
import signal from '../../assets/images/sinal-de-aviso.png';

export default function Page404() {
  return (
    <Container>
      <Section404>
        <MainTittle>Erro 404</MainTittle>
        <p>Página não encontrada</p>
        <img src={signal} alt="" />
      </Section404>
    </Container>
  );
}
