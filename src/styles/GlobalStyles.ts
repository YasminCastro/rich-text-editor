import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
 
  button {
    cursor: pointer;
	  border: none;
	  padding: 0;
    margin: 0; 
    background: transparent;
  }


  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }  
 
`;
