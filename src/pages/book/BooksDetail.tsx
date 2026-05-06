import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { BookItem } from "./BooksSearch.tsx";
import styled from "styled-components";
import { IoChevronBack } from "react-icons/io5";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

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

const BackBtn = styled.button`
    display: flex;
    background: none;
    border: none;
    color: ${props => props.theme.colors.error};
    font-size: 16px;
    cursor: pointer;
    padding: 0;
    text-align: left;
    gap: 3px;
    width: 100%;

    &:hover {
        text-decoration: underline;
    }
    svg {
        font-size: 20px;
    }
`;

const Cover = styled.img`
    width: 200px;
    height: 300px;
    border-radius: 8px;
    margin-bottom: 20px;
`;

const NoCover = styled.div`
    width: 200px;
    height: 300px;
    border-radius: 8px;
    margin-bottom: 20px;
`;

const DetailTitle = styled.h2`
    font-size: 28px;
    padding: 20px;
    color: ${props => props.theme.colors.primary};
    text-align: center;
    span {
        font-weight: 300;
        font-size: 22px;
    }
`;

const Content = styled.div`
    background-color: ${props => props.theme.colors.background.paper};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px
`;

const Authors = styled.p`
    color: ${props => props.theme.colors.text.default};
    opacity: 0.76;
`;

const Text = styled.p`
    color: ${props => props.theme.colors.text.default};
    border-top: 1px solid ${props => props.theme.colors.divider};
    margin-top: 20px;
    padding-top: 20px;
`;

function BooksDetail() {
    // 들어온 주소값을 가지고, API 요청을 해서 받아온 데이터를 저장하고, 화면을 출력해준다
    const { id } = useParams();
    const navigate = useNavigate();

    // 받아오는 데이터가 1개인 API를 대상으로 하고 있기 때문에,
    // 그 response는 객체이고, 이럴 경우엔 초기값은 null로 설정
    const [book, setBook] = useState<BookItem | null>(null);

    useEffect(() => {
        if (!id) return;
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`)
            .then(response => response.json())
            .then(json => {
                setBook(json);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    if (!book) return <p>Loading...</p>;

    return (
        <Container>
            <BackBtn
                onClick={() => {
                    navigate(-1);
                }}>
                <IoChevronBack /> Back
            </BackBtn>

            <Content>
                <DetailTitle>{book.volumeInfo.title}</DetailTitle>
                {book.volumeInfo.imageLinks ? (
                    <Cover src={book.volumeInfo.imageLinks.thumbnail} />
                ) : (
                    <NoCover>No Cover</NoCover>
                )}
                <Authors>{book.volumeInfo.authors?.join(", ")}</Authors>
                <Text
                    dangerouslySetInnerHTML={{
                        __html: book.volumeInfo.description || "설명 없음",
                    }}></Text>
            </Content>
        </Container>
    );
}

export default BooksDetail;
