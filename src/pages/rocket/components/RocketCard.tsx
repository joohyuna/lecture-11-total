import type { RocketType } from "../RocketPage.tsx";
import { Link } from "react-router";
import styled from "styled-components";

const Links = styled(Link)`
    text-decoration: none;
    color: ${props => props.theme.colors.text.default};
    position: relative;
    &:hover .RocketList {
        margin-top: -20px;
        opacity: 0.8;
    }
`;

const RocketList = styled.div`
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.background.default};
    border-radius: 15px;
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.06);
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
    transition: all 0.5s linear;
    position: relative;
    &:hover {
        transform: translateY(-8px);
    }
`;

const RocketListTxt = styled.ul`
    list-style: none;
    background-color: ${props => props.theme.colors.background.paper};
    padding: 20px 15px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    width: 100%;
`;


const ImgCover = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s;
`;

const RocketName = styled.li`
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
`;

function RocketCard({ rocket }: { rocket: RocketType }) {
    return (
        <Links to={`detail/${rocket.id}`}>
            <RocketList>
                {rocket.flickr_images[0] && (
                    <ImgCover src={rocket.flickr_images[0]} alt={rocket.name} />
                )}
                <RocketListTxt>
                    <RocketName>{rocket.name}</RocketName>
                    <li>{rocket.country}</li>
                </RocketListTxt>
            </RocketList>
        </Links>
    );
}

export default RocketCard;
