import { Link } from "react-router";
import styled from "styled-components";
import type { MovieItem } from "../MovieList.tsx";

type Props = {
    movie: MovieItem;
};

const Card = styled(Link)`
    width: 200px;
    border-radius: 12px;
    padding: 10px;
    background-color: white;
    color: #333;
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: all 0.5s;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    img {
        width: 100%;
        border-radius: 8px;
    }

    &:hover {
        transform: scale(1.03);
    }
`;
function MovieCard({ movie }: Props) {
    return (
        <Card to={`/movie/detail/${movie.imdbID}`}>
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <span>{movie.Year}</span>
        </Card>
    );
}
export default MovieCard;
