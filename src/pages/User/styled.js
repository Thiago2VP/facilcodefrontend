import styled from 'styled-components';
import { pageBlue, pageGreen, primaryDarkColor, errorColor } from '../../config/colors';

export const SectionUser = styled.section`
  min-height: 85vh;
  display: grid;
  grid-template-columns: 1fr 3fr;
  justfy-content: start;
  align-itens: center;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export const UserData = styled.div`
  padding: 4rem 2rem 2rem 2rem;
  text-align: center;
  background-color: ${pageBlue};
  border-radius: 2rem;
  position: relative;

  p {
    font-size: 2.3rem;
  }

  @media (max-width: 800px) {
    padding: 4rem;
  }
`;

export const DataInfo = styled.div`
  position: sticky;
  top: 3rem;
  display: flex;
  flex-direction: column;

  div {
    margin-top: 15rem;
  }
  a {
    color: ${primaryDarkColor};
    font-size: 2rem;
  }
  a:hover {
    text-decoration: underline;
  }
  #edt {
    color: ${pageGreen};
  }
  #exc {
    color: ${errorColor};
  }
`;

export const H1User = styled.h1`
  color: ${primaryDarkColor};
  text-align: center;
  font-size: 3.5rem;
  margin-bottom: 3rem;
`;

export const H1Qrs = styled.h1`
  color: ${pageBlue};
  text-align: center;
  font-size: 3.5rem;
`;

export const QrCodes = styled.div`
  padding: 2rem;
`;

export const QrGalery = styled.div`
  border: 0.3rem solid ${pageBlue};
  border-radius: 2rem;
  margin-top: 2rem;
  min-height: 40rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-itens: center;
  justify-content: center;
  text-align: center;
  padding-bottom: 2rem;

  @media (max-width: 650px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 450px) {
    grid-template-columns: 1fr;
  }
`;

export const Download = styled.a`
  padding: 1.2rem;
  img {
    width: 2.4rem;
  }
`;

export const Trash = styled.button`
  background-color: rgba(0, 0, 0, 0);
  padding: 1.2rem;
`;
