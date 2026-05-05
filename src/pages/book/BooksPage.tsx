import styled from "styled-components";
import BooksSearchBar from "./components/BooksSearchBar.tsx";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
`;

const SearchBox = styled.div`
    display: flex;
    width: 60%;
    gap: 10px;
    padding: 20px;
    border-radius: 43px;
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.divider};
`;

const SearchTitle = styled.h2`
    font-size: 28px;
    padding: 20px;
    color: ${props => props.theme.colors.primary};
    text-align: center;
    span {
        font-weight: 300;
        font-size: 22px;
    }
`;

function BooksPage() {
    return (
        <Container>
            <SearchTitle>Search Books</SearchTitle>
            <SearchBox>
                <BooksSearchBar />
            </SearchBox>
        </Container>
    );
}

export default BooksPage;