import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IoChevronBack } from "react-icons/io5";

export type PostType = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

const Loading = styled.div`
    text-align: center;
    padding: 100px;
    font-size: 1.1rem;
    color: ${props => props.theme.colors.text.disabled};
`;
const Container = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 60px 20px;
`;

const BackLink = styled(Link)`
    text-decoration: none;
    color: ${props => props.theme.colors.warning};
    font-size: 14px;
    padding-bottom: 10px;
    display: inline-block;
    &:hover {
        opacity: 0.7;
    }
`;

const Article = styled.article`
    padding: 40px;
    background-color: ${props => props.theme.colors.background.paper};
    border-radius: 8px;
`;

const Title = styled.h2`
    font-size: 2.5rem;
    font-weight: 800;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 24px;
`;

const Meta = styled.div`
    color: ${props => props.theme.colors.text.default};
    padding-bottom: 30px;
`;

const PostBody = styled.div`
    font-size: 1.15rem;
    line-height: 1.8;
    white-space: pre-wrap;
    border-top: 1px solid ${props => props.theme.colors.divider};
    padding-top: 24px;
`;

function BoardDetail() {
    // 우리가 생각할 때, 이미 App에서 Routing 통해 /:id가 들어왔으면, Detail 뜨지 않나?
    // 그렇다면 당연히 id는 string이여야 되 않나? (URL값은 무조건 sting)
    // 이렇게 생각하는 이유는, 우리가 전체 프로그램을 알고 잇기 때문
    // IDE, 그리고 타입스크립트 엔진은 "이 파일만 보고 생각함"
    const { id } = useParams();

    const [loading, setLoading] = useState<boolean>(true);
    // 배열을 [] 빈배열을 해도 상관 없지만, 왜나하면 얘는 그 형태의 요소가 없을 뿐
    // string[] : 빈배열을 허용하지만, 그 배열 안에 들어가는 요소는 무조건 string
    // 객체는 {name: string}라고 써줬다면, 무조건 이 모양만 허용됨

    // 그리로 fetch 되기 전 상태를 따져보면, 값이 아직 도작되지 않는 상황이니깐 null값이 초기값으로 논리적으로 맞음
    const [post, setPost] = useState<PostType | null>(null);

    useEffect(() => {
        // useParams로 가져온 id는 값이 없을 수 있음, 타입이 string | undefined
        // 그래서 fetch를 실행시키 전에, if를 통ㅇ해 id값이 없다면 실행하지 말고 이 함수를 종료해라라고
        if (!id) return;
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then((json: PostType) => {
                setPost(json);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);
    if (loading) {
        return <Loading>본문을 불러오는 중입니다....</Loading>;
    }
    // 에러 처리
    // 1. 초기 상태 : loading: true, post: null
    //          -> 그럼 첫번째 if만 실행될 것임
    // 2. fetch 실행이 된 이후 : loading: false, post: PostType OR null
    //              실패라면 : loading: false, post: null
    //              성공이라면 : loading: false, post: PostType
    if (!post) {
        return <Loading>존재하지 않는 게시글입니다.</Loading>;
    }

    return (
        <Container>
            <BackLink to={"/board"}>
                <IoChevronBack />  목록으로 돌아가기
            </BackLink>

            <Article>
                <Title>{post.title}</Title>
                <Meta>
                    <span>게시글 번호 : {post.id}</span>
                    <span style={{ margin: "0 12px" }}>|</span>
                    <span>작성자 : {post.userId}</span>
                </Meta>
                <PostBody>{post.body}</PostBody>
            </Article>
        </Container>
    );
}

export default BoardDetail;
