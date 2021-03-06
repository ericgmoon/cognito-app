import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 4px;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #00000015; 
    border-radius: 4px;
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #00000062; 
  }
`;
