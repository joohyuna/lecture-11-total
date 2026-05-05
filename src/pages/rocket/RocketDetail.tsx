import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { RocketType } from "./RocketPage.tsx";
import styled from "styled-components";
import { IoChevronBack } from "react-icons/io5";

const Loading = styled.div`
    text-align: center;
    padding: 100px;
    color: ${props => props.theme.colors.text.disabled};
`;

const Container = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 60px 24px;
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
    background-color: ${props => props.theme.colors.background.paper};
    border-radius: 24px;
    border: 1px solid ${props => props.theme.colors.text.disabled};
    overflow: hidden;
`;

const ImageWrapper = styled.div`
    width: 100%;
    height: 400px;
    overflow: hidden;
`;

const RocketImage = styled.img`
    width: 100%;
    height: 400px;
    overflow: hidden;
    transition: all 0.5s;
    &:hover {
        transform: scale(1.1);
    }
`;

const Info = styled.div`
    padding: 40px;
    color: ${props => props.theme.colors.primary};
`;

const Name = styled.span`
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 16px;
    background: linear-gradient(
        to right,
        ${props => props.theme.colors.primary},
        ${props => props.theme.colors.text.default}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const Description = styled.div`
    font-size: 1.2rem;
    color: ${props => props.theme.colors.text.default};
    line-height: 1.8;
    margin-bottom: 32px;
`;

const Specs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 24px;
    border-top: 1px solid ${props => props.theme.colors.divider};
`;

const SpanItem = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Label = styled.span`
    color: ${props => props.theme.colors.text.disabled};
    font-weight: 600;
`;

const Value = styled.span`
    color: ${props => props.theme.colors.text.default};
`;


function RocketDetail() {
    const { id } = useParams();

    const [loading, setLoading] = useState<boolean>(true);
    const [rocket, setRocket] = useState<RocketType | null>(null);

    useEffect(() => {
        if (!id) return;
        fetch(`https://api.spacexdata.com/v4/rockets/${id}`)
            .then(res => res.json())
            .then((json: RocketType) => {
                setRocket(json);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [id]); // 의존성
    if (loading) {
        return <Loading>접속 중....</Loading>;
    }
    if (!rocket) {
        // 로켓에 내용을 없을 때
        return <Loading>로켓 정보를 찾을 수 없습니다. </Loading>;
    }
    return (
        <Container>
            <BackLink to={"/rocket"}>
                <IoChevronBack /> 목록으로 돌아가기
            </BackLink>
            <Article>
                {rocket.flickr_images[0] && (
                    <ImageWrapper>
                        <RocketImage src={rocket.flickr_images[0]} alt={rocket.name} />
                    </ImageWrapper>
                )}
                <Info>
                    <h1>
                        {/*
                            h1은 block 요소라, background가 width: 100%; 로 적용중
                         그래서, 그 안에 span으로 inline을 주고, style 적용
                         */}
                        <Name>{rocket.name}</Name>
                    </h1>
                    <Description>{rocket.description}</Description>

                    <Specs>
                        <SpanItem>
                            <Label>발사 비용</Label>
                            <Value>$ {rocket.cost_per_launch.toLocaleString()}</Value>
                        </SpanItem>
                        <SpanItem>
                            <Label>제조국가</Label>
                            <Value>$ {rocket.country}</Value>
                        </SpanItem>
                        <SpanItem>
                            <Label>상태</Label>
                            <Value style={{ color: rocket.active ? "#10b981" : "#ef4444" }}>
                                {rocket.active ? "운용중" : "비운용"}
                            </Value>
                        </SpanItem>
                    </Specs>
                </Info>
            </Article>
        </Container>
    );
}

export default RocketDetail;
