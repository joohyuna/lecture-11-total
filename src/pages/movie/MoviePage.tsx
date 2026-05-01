import styled from "styled-components";
import MovieSearchBar from "./components/MovieSearchBar.tsx";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
const SearchBox = styled.div`
    display: flex;
    gap: 10px;
    padding: 20px;
    border-radius: 16px;
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.divider};
`;


function Home() {
    return (
        <Container>
            <SearchBox>
                <MovieSearchBar />
            </SearchBox>
        </Container>
    );
}

export default Home;
