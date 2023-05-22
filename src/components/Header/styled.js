import styled from 'styled-components';
import { primaryDarkColor } from '../../config/colors';

export const Nav = styled.nav`
  display: flex;
  align-itens: center;
  justify-content: space-between;

  a {
    color: ${primaryDarkColor};
    margin: 1rem 2rem;
  }

  img {
    width: 9.5rem;
  }

  @media (max-width: 420px) {
    img {
      width: 8rem;
    }
  }

  @media (max-width: 300px) {
    img {
      width: 5.5rem;
    }
  }
`;
