import styled from 'styled-components';

import { pageGreen, pageBlue, skinGradient, primaryDarkColor } from '../../config/colors';

export const SectionHome = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 2rem
  padding: 1rem;

  img {
    max-width: 45vw;
  }

  a {
    background: ${pageGreen};
    background: ${skinGradient};
    border: none;
    border-radius: 1.2rem;
    font-size: 2.2rem;
    padding: 0.5rem;
    margin-right: 2rem;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    color: ${primaryDarkColor};
    display: inline-block;
    width: 15rem;
    height: 4.2rem;
    border: 0.2rem solid ${primaryDarkColor};
  }

  a:hover {
    background: ${primaryDarkColor};
    color: ${pageBlue};
    border: 0.2rem solid ${pageGreen};
  }

  .content2 {
    text-align: right;
  }

  @media (max-width: 950px) {
    grid-template-columns: 1fr;
    position: relative;
    margin: 2rem auto;
    min-height: 40vh;

    img {
      width: 100%;
      opacity: 0.09;
    }

    .image {
      position: absolute;
      z-index: -1;
      width: 100%;
      margin: auto;
      display: flex;
      align-itens: center;
      justify-content: center;
    }

    .content {
      h1 {
        font-size: 4.3rem;
        text-align: center;
        padding: 1rem;
      }
      p {
        font-size: 3.3rem;
        text-align: center;
        padding: 1rem;
      }
      .pageOptions {
        width: 100%;
        margin: auto;
        padding: 1rem;
        display: flex;
        justify-content: space-evenly;
      }
      a {
        border: none;
        height: 5rem;
        width: 35vw;
        font-size: 3.5rem;
        padding: 0.5rem;
        margin-right: 1rem;
      }
    }
    .content2 {
      h1 {
        font-size: 4.3rem;
        text-align: center;
        padding: 1rem;
      }
      p {
        font-size: 3.3rem;
        text-align: center;
        padding: 1rem;
      }
      .pageOptions {
        width: 100%;
        margin: auto;
        padding: 1rem;
        display: flex;
        justify-content: space-evenly;
      }
      a {
        border: none;
        height: 5rem;
        width: 35vw;
        font-size: 3.5rem;
        padding: 0.5rem;
        margin-right: 1rem;
      }
    }
  }
`;
