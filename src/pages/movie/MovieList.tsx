import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import MovieCard from "./components/MovieCard.tsx";
import styled from "styled-components";
import MovieSearchBar from "./components/MovieSearchBar.tsx";

export type MovieItem = {
    imdbID: string;
    Poster: string;
    Title: string;
    Year: string;
};
type ApoResponseType = { Search: MovieItem[] };

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
    align-items: center;
`;

const ListBox = styled.div`
    display: flex;
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.divider};
    padding: 20px;
`;

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
`;

function Search() {
    const [list, setList] = useState<MovieItem[]>([]);
    const [loading, setLoading] = useState(true); // loading에 대한 상태값 관리
    const [error, setError] = useState(""); // 에러가 났을 때 화면에 출력해야 하는 string

    const [searchParams] = useSearchParams();
    const k = searchParams.get("keyword");

    useEffect(() => {
        if (!k) return;
        // 초기화시켜주기
        setLoading(true);
        setList([]);
        setError("");
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${k}`)
            .then(res => res.json())
            .then((json: ApoResponseType) => {
                setList(json.Search);
                setLoading(false);
            })
            .catch((err: Error) => {
                console.log(err);
                setError("검색하는데 오류가 발생하였습니다.");
                setLoading(false);
            });
    }, [k]);

    return (
        <Container>
            <SearchBox>
                <h2>검색 키워드 : {k}</h2> <MovieSearchBar />
            </SearchBox>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ListBox>
                <List>
                    {list.map((value, index) => (
                        <MovieCard movie={value} key={index} />
                    ))}
                </List>
            </ListBox>
        </Container>
    );
}

export default Search;
