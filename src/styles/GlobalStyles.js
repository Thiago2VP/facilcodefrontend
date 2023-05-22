import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/projectStyles.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  body {
    font-family: 'Rubik', sans-serif;
    background: ${colors.primaryDarkColor};
    color: ${colors.primaryDarkColor};
  }

  html, body, #root {
    height: 100%;
    scroll-behavior: smooth;
    font-size: 62.5%;
  }

  button {
    cursor: pointer;
    border: none;
    color: ${colors.pageGreen};
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;
    transition: all 300ms;
  }

  a {
    text-decoration: none;
    color: ${colors.primaryColor};
  }

  ul {
    list-style: none;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--success {
    background: ${colors.successColor};
    color: ${colors.primaryDarkColor};
    font-size: 1.6rem;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--error {
    background: ${colors.errorColor};
    color: ${colors.primaryDarkColor};
    font-size: 1.6rem;
  }
`;

export const Container = styled.main`
  max-width: 1200px;
  margin: auto;
  padding: 30px;

  @media (max-width: 420px) {
    padding: 10px;
  }
`;

export const Main = styled.main`
  min-height: 72vh;
  margin: auto;
`;

export const MainTittle = styled.h1`
  font-size: 5.3rem;
  background: ${colors.pageGreen};
  background: ${colors.skinGradient};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const SpecialParagraph = styled.p`
  font-size: 2.7rem;
  background: ${colors.pageGreen};
  background: ${colors.skinGradient};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Form = styled.form`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;

  label {
    color: ${colors.pageBlue};
    font-size: 2.7rem;
    padding: 0.7rem;
    margin: auto;
  }
  input {
    display: block;
    padding: 1rem;
    margin-top: 0.5rem;
    margin-left: -0.4rem;
    border-radius: 0.8rem;
    height: 4.5rem;
    width: 30rem;
    font-size: 2rem;
    border: 0.2rem solid ${colors.pageBlue};
    color: ${colors.pageBlue};
    background-color: ${colors.primaryDarkColor};
  }
  input::placeholder {
    color: ${colors.pageBlue};
    opacity: 0.65;
  }
  input[type='file'] {
    height: 5rem;
  }
  input::file-selector-button {
    background-color: ${colors.pageBlue};
    color: ${colors.primaryDarkColor};
    border: 0.2rem solid ${colors.primaryDarkColor};
    border-radius: 0.5rem;
    cursor: pointer;
  }
  input::file-selector-button:hover {
    background-color: ${colors.primaryDarkColor};
    color: ${colors.pageBlue};
    border: 0.2rem solid ${colors.pageBlue};
  }
  button {
    display: block;
    text-align: center;
    font-size: 1.7rem;
    padding: 1rem;
    margin: 1.5rem auto;
    width: 15rem;
    color: ${colors.primaryDarkColor};
    background-color: ${colors.pageBlue};
    border-radius: 0.8rem;
    border: 0.2rem solid ${colors.primaryDarkColor};
  }
  button:hover {
    color: ${colors.pageBlue};
    background: ${colors.primaryDarkColor};
    border: 0.2rem solid ${colors.pageBlue};
  }
  fieldset {
    border: 0.2rem solid ${colors.pageBlue};
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    padding-bottom: 3rem;
  }
  legend {
    font-size: 3rem;
    background: ${colors.pageGreen};
    background: ${colors.skinGradient};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    padding: 1rem;
    margin: 1rem;
  }

  @media (max-width: 350px) {
    input {
      max-width: 19rem;
    }
    input[type='file'] {
      margin-left: 0;
    }
    label {
      max-width: 19rem;
    }
  }
`;
