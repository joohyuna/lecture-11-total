import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { BookItem } from "./BooksSearch.tsx";
import styled from "styled-components";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const Wrap = styled.div`
    padding: 30px;
`;

const BackBtn = styled.button`
    display: flex;
    align-items: center;
    padding: 8px 14px;
    border-radius: 6px;
    border: 1px solid #ccc;
    background-color: #f3f3f3;
    color: #333;
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
        background: #e0e0e0;
        border-color: #999;
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

    if (!book) return <Wrap>Loading...</Wrap>;

    return (
        <Wrap>
            <BackBtn
                onClick={() => {
                    navigate(-1);
                }}>
                &larr; 뒤로 가기
            </BackBtn>

            <h2>{book.volumeInfo.title}</h2>
            {book.volumeInfo.imageLinks ? (
                <Cover src={book.volumeInfo.imageLinks.thumbnail} />
            ) : (
                <NoCover>No Cover</NoCover>
            )}
            <p>{book.volumeInfo.authors?.join(", ")}</p>
            <p dangerouslySetInnerHTML={{ __html: book.volumeInfo.description || "설명 없음" }}></p>
        </Wrap>
    );
}

export default BooksDetail;
