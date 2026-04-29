import type { ReactNode } from "react";
import {
    FaBitcoin,
    FaBook,
    FaCheckSquare,
    FaClipboardList,
    FaFilm,
    FaSpaceShuttle,
} from "react-icons/fa";
import styled from "styled-components";
import { Link } from "react-router";

type ProjectType = {
    title: string;
    desc: string;
    path: string;
    icon: ReactNode;
};

const projectList: ProjectType[] = [
    {
        title: "투두리스트",
        desc: "체계적인 일정 관리와 할 일 목록 기록",
        path: "/todo",
        icon: <FaCheckSquare />,
    },
    {
        title: "코인트래커",
        desc: "실시간 가상화폐 시세 확인 및 정보 트래킹",
        path: "/coin",
        icon: <FaBitcoin />,
    },
    {
        title: "무비검색앱",
        desc: "영화 데이터베이스 API를 활용한 영화 검색",
        path: "/movie",
        icon: <FaFilm />,
    },
    {
        title: "게시판",
        desc: "기본적인 커뮤니티 게시판",
        path: "/board",
        icon: <FaClipboardList />,
    },
    {
        title: "로켓앱",
        desc: "스페이스X의 로켓 발사 상태 및 상세 정보 조회",
        path: "/rocket",
        icon: <FaSpaceShuttle />,
    },
    {
        title: "구글북스 검색앱",
        desc: "구글 도서 데이터를 활용한 온라인 책 검색",
        path: "/book",
        icon: <FaBook />,
    },
];

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const WelcomeSection = styled.section`
    padding: 40px;
    border-radius: 20px;
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.divider};
`;

const Title = styled.h2`
    font-size: 32px;
    font-weight: 800;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 10px;
`;

const Description = styled.p`
    font-size: 14px;
    color: ${props => props.theme.colors.text.disabled};
`;

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;
const Card = styled(Link)`
    width: calc((100% - 40px) / 3);
    padding: 30px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 15px;
    transition: all 0.5s;
    background-color: ${props => props.theme.colors.background.paper};
    border: ${props => props.theme.colors.divider};
    &:hover {
        transform: translateY(-5px);
        border-color: ${props => props.theme.colors.primary};
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    }
`;

const IconBox = styled.div`
    font-size: 40px;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 10px;
`;

const ProjectTitle = styled.h3`
    font-size: 20px;
    font-weight: 700;
    color: ${props => props.theme.colors.text.default};
`;
function Home() {
    return (
        <Container>
            <WelcomeSection>
                <Title>My Project Dashboard</Title>
                <Description>지금까지 구축한 포트폴리오 리스트입니다.</Description>
            </WelcomeSection>

            <CardContainer>
                {projectList.map((value, index) => (
                    <Card key={index} to={value.path}>
                        <IconBox>{value.icon}</IconBox>
                        <ProjectTitle>{value.title}</ProjectTitle>
                        <Description>{value.desc}</Description>
                    </Card>
                ))}
            </CardContainer>
        </Container>
    );
}

export default Home;
