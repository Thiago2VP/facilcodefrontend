import styled from 'styled-components';
import * as colors from '../../config/colors';

export const SectionExclusion = styled.section`
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-itens: center;
  justify-content: start;
  text-align: center;
  padding-top: 4rem;

  @media (max-width: 420px) {
    justify-content: center;
    padding-top: 2rem;
  }
`;

export const ExclusionTittle = styled.h1`
  background: ${colors.pageGreen};
  background: ${colors.skinGradient};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 3.2rem;
`;

export const BtnsArea = styled.div`
  margin: 4rem auto;
  width: 20rem;
  display: flex;
  flex-direction: row;
  align-itens: center;
  justify-content: space-evenly;
`;

export const BtnNo = styled.button`
  padding: 0;
  margin: 0;
  a {
    background-color: ${colors.primaryDarkColor};
    color: ${colors.pageBlue};
    border: 0.2rem solid ${colors.pageBlue};
    padding: 1rem 2rem;
    font-size: 1.8rem;
    border-radius: 1rem;
  }
  a:hover {
    background-color: ${colors.pageBlue};
    color: ${colors.primaryDarkColor};
    border: 0.2rem solid ${colors.primaryDarkColor};
  }
`;

export const BtnYes = styled.button`
  background-color: ${colors.errorColor};
  color: ${colors.primaryDarkColor};
  border: 0.2rem solid ${colors.primaryDarkColor};
  padding: 1rem 2rem;
  font-size: 1.8rem;
  border-radius: 1rem;

  :hover {
    background-color: ${colors.primaryDarkColor};
    color: ${colors.errorColor};
    border: 0.2rem solid ${colors.errorColor};
  }
`;
