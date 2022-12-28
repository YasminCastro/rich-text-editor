import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
  }

  img {
    pointer-events: none;
    user-select: none;
  }

  a {
    text-decoration:none;
    color: black;
    font-family: "Roboto", sans-serif;
  }

  p, h1, h2, h3, h4, span, li, a, button {
    transition: color 0.15s linear;
    font-family: "Roboto", sans-serif;
  }

  li, ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  body.modal-open{
    overflow: hidden;
  }

  button {
    cursor: pointer;
	border: none;
	padding: 0;
  }


  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "Roboto", sans-serif;
  }

 

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;
