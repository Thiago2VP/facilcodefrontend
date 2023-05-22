import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Main, MainTittle, SpecialParagraph } from '../../styles/GlobalStyles';
import { SectionHome } from './styled';
import banner from '../../assets/images/poiting-qrcode.png';
import banner2 from '../../assets/images/Email.png';

// image 1 = https://br.freepik.com/vetores-gratis/ilustracao-do-conceito-de-codigo-qr_13416094.htm#query=qr%20code&position=1&from_view=search
// image 2 = https://storyset.com/illustration/email-campaign/bro#00A0FDFF&hide=&hide=complete

export default function Home() {
  return (
    <Container>
      <Main>
        <SectionHome>
          <div className="content">
            <MainTittle>Crie seu próprio código QR em poucos segundos e sem nenhum custo.</MainTittle>
            <br />
            <SpecialParagraph>
              Rápido e sem precisar se registrar, podendo ser para transferência PIX ou um texto qualquer.
            </SpecialParagraph>
            <br />
            <br />
            <br />
            <div className="pageOptions">
              <Link to="/pix">Pix</Link>
              <Link to="/text">Texto</Link>
            </div>
            <br />
          </div>
          <div className="image">
            <img src={banner} alt="Homem apontando celular para QR Code" />
          </div>
        </SectionHome>
        <br />
        <br />
        <SectionHome>
          <div className="image">
            <img src={banner2} alt="Homem apontando celular para QR Code" />
          </div>
          <div className="content2">
            <MainTittle>Entre em contato</MainTittle>
            <br />
            <SpecialParagraph>
              Caso possua alguma dúvida, queira informar algo, ou necessite fazer contato por algum motivo mande um
              email.
            </SpecialParagraph>
            <br />
            <br />
            <br />
            <div className="pageOptions">
              <a href="mailto:thiagovasconcelosvp@protonmail.com">Email</a>
            </div>
            <br />
          </div>
        </SectionHome>
      </Main>
    </Container>
  );
}
