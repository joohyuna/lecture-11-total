import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { PostType } from "./BoardDetail.tsx";
import styled from "styled-components";
import { FaMinus } from "react-icons/fa";

const Loading = styled.div`
    padding: 100px;
    text-align: center;
    font-size: 1.1rem;
    color: ${props => props.theme.colors.text.disabled};
`;

const Container = styled.div`
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 20px;
`;

const Title = styled.h2`
    font-size: 1.8rem;
    font-weight: 700;
    padding-bottom: 40px;
    color: ${props => props.theme.colors.primary};
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    svg {
        padding-top: 10px;
        color: ${props => props.theme.colors.primary};
        font-size: 40px;
    }
`;

const BoardTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    thead {
        border-bottom: 3px solid ${props => props.theme.colors.text.disabled};
    }
    tbody {
    }

    th {
        padding: 14px;
        font-size: 16px;
        font-weight: 700;
        color: ${props => props.theme.colors.text.default};
        text-align: center;
        &:nth-child(2) {
            text-align: left;
        }
    }
    td {
        border-bottom: 1px solid ${props => props.theme.colors.divider};
    }
`;

const TableRow = styled.tr`
    transition: all 0.2s;
    &:hover {
        background-color: ${props => props.theme.colors.background.paper};
    }
`;

const IdCell = styled.td`
    width: 80px;
    text-align: center;
    padding: 16px 14px;
    color: ${props => props.theme.colors.text.default};
`;

const TitleCell = styled.td`
    text-align: left;
    color: ${props => props.theme.colors.text.default};
    padding: 0;
`;

const Alink = styled(Link)`
    text-decoration: none;
    color: ${props => props.theme.colors.text.default};
    width: 100%;
    display: inline-block;
    padding: 16px 14px;
    &:hover {
        color: ${props => props.theme.colors.primary};
    }
`;

const UserCell = styled.td`
    text-align: center;
    padding: 16px 14px;
`;

function BoardPage() {
    // 초기값이 이미 true로 들어가기 때문에, 타입스크립트 엔진이 loading에 대해 boolean으로 고정시킴
    // loading이라는 state는 usdState 메소느를 통해 만들어지는 것이기 때문에,
    // useState<만들어지는 대상의 타입>(초기값)으로 타입 지정을 하줄 수 있음
    const [loading, setLoading] = useState<boolean>(true);

    // const [스테이트, 스테이트를 변경할수 있는 함수] = useState(초기값);
    // const result = useState

    // 초기값을 [] 해줘서, posts가 [], 배열이 되는것은 아는데
    // 그 배열 안에 어떠한 타입의 요소가 들어올지 타입스크립트는 모름 => never[] 타입으로 강제됨
    // never[] => 배열은 배열인데, 안에 결코 요소가 들어갈 수 없는 상태

    // 앞으로 지정해 줘야 함
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts") // 비동기 함수 promise
            .then(res => res.json()) // res 에 가로 치고 : string을 쓸 수 있음
            .then((json: PostType[]) => {
                setPosts(json);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    if (loading) {
        return <Loading>데이터를 로드 중입니다...</Loading>;
    }
    return (
        <Container>
            <Title>
                커뮤니티 게시판
                <FaMinus />
            </Title>
            <BoardTable>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자 ID</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((value, index) => (
                        <TableRow key={index}>
                            <IdCell>{value.id}</IdCell>
                            <TitleCell>
                                <Alink to={`detail/${value.id}`}>{value.title}</Alink>
                            </TitleCell>
                            <UserCell>{value.userId}</UserCell>
                        </TableRow>
                    ))}
                </tbody>
            </BoardTable>
        </Container>
    );
}

export default BoardPage;
