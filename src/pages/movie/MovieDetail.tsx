import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";

type MovieDetail = {
    Title: string;
    Year: string;
    Poster: string;
    Plot: string;
    Genre: string;
    Director: string;
};

const Wrap = styled.div`
    padding: 40px;

    img {
        width: 240px;
        border-radius: 12px;
    }
`;

const BackButton = styled.button`
    display: block;
    margin-bottom: 20px;
    background: none;
    border: none;
    color: #ff5959;
    font-size: 16px;
    cursor: pointer;
    padding: 0;

    &:hover {
        text-decoration: underline;
    }
`;

const Plot = styled.p`
    line-height: 1.6;
    margin-top: 20px;
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
        <Wrap>
            <BackButton onClick={() => navigate(-1)}>&larr; Back</BackButton>

            <img src={movie.Poster} alt={movie.Title} />

            <h1>{movie.Title}</h1>
            <p>
                <strong>Year:</strong> {movie.Year}
            </p>
            <p>
                <strong>Genre:</strong> {movie.Genre}
            </p>
            <p>
                <strong>Director:</strong> {movie.Director}
            </p>
            <Plot>{movie.Plot}</Plot>
        </Wrap>
    );
}

export default Detail;
