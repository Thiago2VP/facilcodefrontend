import styled from 'styled-components';
import { primaryDarkColor, skinGradient } from '../../config/colors';

export const MF = styled.footer`
  background: ${skinGradient};
  min-height: 7rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: rgba(${primaryDarkColor}, 1);

  p {
    font-size: 1.5rem;
    text-align: center;
  }
`;
