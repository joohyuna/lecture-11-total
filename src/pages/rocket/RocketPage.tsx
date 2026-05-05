import { useEffect, useState } from "react";
import RocketCard from "./components/RocketCard.tsx";
import styled from "styled-components";

export type RocketType = {
    id: string;
    name: string;
    description: string;
    active: boolean;
    cost_per_launch: number;
    country: string;
    first_flight: string;
    company: string;
    type: string;
    flickr_images: string[];
};

const Loading = styled.div`
    text-align: center;
    font-size: 1.2rem;
    color: ${props => props.theme.colors.text.disabled};
`;

const Container = styled.div`
    height: 100dvh;
    width: 100%;
    margin: 0 auto;
`;

const Title = styled.h2`
    font-size: 40px;
    color: ${props => props.theme.colors.primary};
    padding-bottom: 40px;
    text-align: center;
    width: 100%;
`;

const ContentBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 30px;
    padding: 40px;
`;


function RocketPage() {
    const [loading, setLoading] = useState(true); // true, false

    const [list, setList] = useState<RocketType[]>([]);

    useEffect(() => {
        // 비동기 함수의 반대는 동기 함수
        // 동기함수는 : 일반 함수들 => 원래부터 자바스크립튼에 엔진이 실행하면 결과가 나온 뒤에 다음줄로 넘어가는 함수
        fetch("https://api.spacexdata.com/v4/rockets")
            .then(response => {
                return response.json();
            })
            .then((json: RocketType[]) => {

                setList(json);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    return (
        <Container>
            <Title>SpaceX Archive</Title>
                {loading ? (
                    <Loading>SCANNING FOR ROCKET...</Loading>
                ) : (
                    <div>
                        <ContentBox>
                            {list.map((value, index) => (
                                <RocketCard key={index} rocket={value} />
                            ))}
                        </ContentBox>
                    </div>
                )}
        </Container>
    );
}

export default RocketPage;
