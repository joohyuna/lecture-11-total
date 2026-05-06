import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export type BookItem = {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        description?: string;
        publishedDate: string;
        imageLinks?: {
            thumbnail?: string;
            smallThumbnail?: string;
        };
    };
};

type ApiResponseType = { items: BookItem[] };

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    max-width: 1000px;
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

const StyleLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-radius: 8px;
    background: ${props => props.theme.colors.background.paper};
    margin-bottom: 10px;
    border: 1px solid ${props => props.theme.colors.divider};
    transition: all 0.5s;
    flex: 1;
    width: 100%;
    &:hover {
        background-color: ${props => props.theme.colors.divider};
    }
`;

const Cover = styled.img`
    width: 60px;
    height: 90px;
    object-fit: cover;
    border-radius: 4px;
`;

const NoCover = styled.div`
    width: 60px;
    height: 90px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
    font-weight: 600;
    margin-bottom: 4px;
`;

const Authors = styled.div`
    font-size: 12px;
    color: ${props => props.theme.colors.text.default};
    opacity: 0.7;
`;

function BooksSearch() {
    // 사용자가 요청한 keyword를 받아서, 그것을 가지고 google API 요청을 하고, 받아온 결과를 화면에 출력해주는 일

    // keyword를 쿼리스트링으로 받겠다
    const [searchParams] = useSearchParams();
    // 이렇게 가져온 searchParams라고 하는 state의 값은 객체
    const keyword = searchParams.get("keyword");

    const [list, setList] = useState<BookItem[]>([]);

    useEffect(() => {
        if (!keyword) {
            return;
        }

        fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=20&key=${API_KEY}`,
        )
            .then(response => response.json())
            .then((json: ApiResponseType) => {
                // 데이터를 받아왔고, 그거에 대해서 자바스크립트 형태로 가공도 했으니
                // 그걸 list라고 하는 state에 저장해야지
                setList(json.items);
            })
            .catch(err => {
                console.log(err);
            });
    }, [keyword]);

    return (
        <Container>
            <SearchTitle>Search Books : <span>Keywords</span> {keyword}</SearchTitle>

            {list.map((value, index) => (
                <StyleLink key={index} to={`/book/detail/${value.id}`}>
                    {value.volumeInfo.imageLinks ? (
                        <Cover
                            src={value.volumeInfo.imageLinks?.thumbnail}
                            alt={value.volumeInfo.title}
                        />
                    ) : (
                        <NoCover>No Cover</NoCover>
                    )}
                    <div>
                        <Title>{value.volumeInfo.title}</Title>
                        <Authors>{value.volumeInfo.authors?.join(", ")}</Authors>
                    </div>
                </StyleLink>
            ))}
        </Container>
    );
}

export default BooksSearch;
