import styled from 'styled-components';

import App from './App';

export default styled(App)`
  /* width */
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 1px;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #00000015; 
    border-radius: 1px;
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #00000062; 
  }
`;
