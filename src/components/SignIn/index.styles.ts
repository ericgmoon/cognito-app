import styled from 'styled-components';

import Button from '../Button';

const StyledSignIn = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TextFieldContainer = styled.div`
        margin: 12px;
`;

const StyledButton = styled(Button)`
    && {
        margin: 12px;
    }
`;

export { StyledSignIn, TextFieldContainer, StyledButton };
