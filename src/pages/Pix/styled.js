import styled from 'styled-components';
import { skinGradient, pageGreen, pageBlue, primaryDarkColor } from '../../config/colors';

export const SectionPix = styled.section`
  min-height: 85vh;
  display: grid;
  grid-template-columns: 4fr 3fr;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    width: 90%;
    margin: auto;
  }
`;

export const PixTittle = styled.h1`
  font-size: 3rem;
  background: ${pageGreen};
  background: ${skinGradient};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

export const QrDiv = styled.div`
  position: relative;
  margin-top: 2rem;
`;

export const QrMov = styled.div`
  display: flex;
  flex-direction: column;
  align-itens: center;
  position: sticky;
  top: 3rem;
`;

export const QrArea = styled.div`
  border: 0.2rem solid ${pageGreen};
  border-radius: 2rem;
  margin: 2rem auto;
  width: 30rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  align-itens: center;
  justify-content: center;
  position: relative;

  div {
    margin: auto;
    width: 20rem;
    height: 20rem;
  }

  @media (max-width: 350px) {
    width: 23rem;
    height: 23rem;
  }
`;

export const QrAction = styled.img`
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  margin: 1rem 2rem;
`;

export const DownOptions = styled.a`
  text-decoration: none;
  background-color: ${pageBlue};
  color: ${primaryDarkColor};
  border: 0.2rem solid ${primaryDarkColor};
  border-radius: 1rem;
  font-size: 1.8rem;
  padding: 1rem;
  cursor: pointer;
  margin: 0.5rem 1rem;

  :hover {
    background-color: ${primaryDarkColor};
    color: ${pageBlue};
    border: 0.2rem solid ${pageBlue};
  }
`;

export const SavOptions = styled.button`
  text-decoration: none;
  background-color: ${pageGreen};
  color: ${primaryDarkColor};
  border: 0.2rem solid ${primaryDarkColor};
  border-radius: 1rem;
  font-size: 1.9rem;
  padding: 1rem;
  cursor: pointer;
  margin: 0.5rem 1rem;
  font-weight: normal;

  :hover {
    background-color: ${primaryDarkColor};
    color: ${pageBlue};
    border: 0.2rem solid ${pageGreen};
  }
`;
