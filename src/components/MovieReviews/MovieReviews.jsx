import fetchData from "../../movies-api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function MovieReviews() {
    const { movieId } = useParams();
    const [review, setReview] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const defaultImg = "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg";
    
    useEffect(() => {
        if (!movieId) return;

        const getData = async () => {
            try {
                setIsLoading(true);
                setError(false);
                const data = await fetchData(`/movie/${movieId}/reviews`, movieId);
                setReview(data.results);
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };
        getData();
    }, [movieId]);

    return (
        <div>
            {review.length > 0 ? (
                <div>
                    {isLoading && <Loader />}
                    {error && <ErrorMessage />}

                    {!isLoading && (
                        <ul>
                            {review.map(
                                ({
                                    id, content, author_details: {
                                        name, username, rating, avatar_path
                                    },
                                }) => (
                                    <li key={id}>
                                        <img src={
                                            avatar_path ? `https://image.tmdb.org/t/p/w500${avatar_path}` : defaultImg
                                        }
                                            alt={`${username} avatar`} />
                                        <div>
                                            <div>
                                                {username && (
                                                    <p>{username}</p>
                                                )}
                                                {name && (
                                                    <p>{name}</p>
                                                )}
                                            </div>
                                            {rating && <p>{rating} / 10 ⭐</p>}
                                            <p>{content}</p>
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    )}
                </div>
            ) : (
                <p>No information is available...</p>
            )}
        </div>
    );
}