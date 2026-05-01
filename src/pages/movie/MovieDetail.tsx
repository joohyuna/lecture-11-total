import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IoChevronBack } from "react-icons/io5";

type MovieDetail = {
    Title: string;
    Year: string;
    Poster: string;
    Plot: string;
    Genre: string;
    Director: string;
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px;
`;

const ContentBox = styled.div`
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.divider};
    border-radius: 8px;
    padding: 20px;
    display: flex;
    gap: 10px;
    img {
        height: 600px;
        border-radius: 12px;
    }
`;

const BackButton = styled.button`
    display: flex;
    align-items: center;
    background: none;
    border: none;
    color: ${props => props.theme.colors.error};
    font-size: 16px;
    cursor: pointer;
    padding: 0;
    text-align: left;
    gap: 3px;

    &:hover {
        text-decoration: underline;
    }
    svg {
        font-size: 20px;
    }
`;

const DetailBox = styled.div`
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h1 {
        color: ${props => props.theme.colors.primary};
        border-bottom: 1px solid ${props => props.theme.colors.divider};
        font-size: 42px;
        padding: 16px 0;
        opacity: 0.9;
    }
`;
const DetailInfo = styled.div`
    width: 100%;
`;

const DetailInfoList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 18px;
    li {
        display: flex;
        strong {
            width: 80px;
            color: ${props => props.theme.colors.text.disabled};
        }
    }
`;


const Plot = styled.p`
    border-top: 1px solid ${props => props.theme.colors.divider};
    line-height: 1.6;
    margin-top: 20px;
    padding-top: 20px;
    opacity: 0.86;
    max-height: 360px;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: ${props => props.theme.colors.divider};
    }
`;



function Detail() {
    const { id } = useParams();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${id}&plot=full`)
            .then(res => res.json())
            .then((json: MovieDetail) => {
                setMovie(json);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    return (
        <Container>
            <BackButton onClick={() => navigate(-1)}>
                <IoChevronBack /> Back
            </BackButton>
            <ContentBox>
                <img src={movie.Poster} alt={movie.Title} />

                <DetailBox>
                    <h1>{movie.Title}</h1>
                    <DetailInfo>
                        <DetailInfoList>
                            <li>
                                <strong>Year </strong>
                                {movie.Year}
                            </li>
                            <li>
                                <strong>Genre </strong>
                                {movie.Genre}
                            </li>
                            <li>
                                <strong>Director </strong>
                                {movie.Director}
                            </li>
                        </DetailInfoList>
                        <Plot>{movie.Plot}</Plot>
                    </DetailInfo>
                </DetailBox>
            </ContentBox>
        </Container>
    );
}

export default Detail;
