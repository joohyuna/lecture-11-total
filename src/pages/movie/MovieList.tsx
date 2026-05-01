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

const ListBox = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    padding-top: 30px
`;

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin: 0 auto;
    text-align: center;
    justify-content: center;
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
            <SearchTitle>
                Search Movies <span>: Keywords</span> <strong>{k} </strong>
            </SearchTitle>
            <SearchBox>
                <MovieSearchBar />
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
