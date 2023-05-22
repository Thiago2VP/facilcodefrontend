import styled from 'styled-components';

import { pageBlue } from '../../config/colors';

export const Section404 = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 83vh;
  padding-bottom: 3rem;

  img {
    position: absolute;
    z-index: -1;
  }

  p {
    color: ${pageBlue};
    font-size: 1.8rem;
  }

  @media (max-width: 420px) {
    h1 {
      font-size: 3.8rem;
    }

    img {
      width: 70%;
    }
  }
`;
