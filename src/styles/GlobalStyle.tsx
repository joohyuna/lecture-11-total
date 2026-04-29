import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: ${props => props.theme.colors.background.default};
        color: ${props => props.theme.colors.text.default};
        font-family: "Pretendard", sans-serif;
    }
    
    a {
        text-decoration: none;
        color: inherit;
    }
    
    
`;

export default GlobalStyle;
