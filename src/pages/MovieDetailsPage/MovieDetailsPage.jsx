import { useEffect, useState, useRef, Suspense } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import fetchData from "../../movies-api";
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import clsx from 'clsx';
import css from './MovieDetailsPage.module.css';



export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const location = useLocation();
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [movie, setMovie] = useState([]);
    const backLinkRef = useRef(location.state ?? "/");

    const defaultImg = "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg";

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                setError(false);
                const data = await fetchData(`/movie/${movieId}`, movieId);
                setMovie(data);
            } catch (error) {
                toast.error("Error! Please reload the page!");
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };
        getData();
    }, [movieId]);

    return (
        <div>
            <Link to={backLinkRef.current}>
                <FaArrowLeft />Go back
            </Link>

            {isLoading && <Loader />}

            {error && <ErrorMessage />}
            
            <div>
                <img src={
                    movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` :
                        defaultImg
                }
                    alt={`${movie.title} poster`} />
                <div>
                    <h2>{movie.title}</h2>
                    {movie.tagline && (
                        <p>{`"${movie.tagline}"`}</p>
                    )}
                    {movie.overview && (
                        <p><span>Overview: </span>{movie.overview}</p>
                    )}
                    {movie.genres && movie.genres.length > 0 && (
                        <p><span>Genres: </span>{movie.genres.map(genre => genre.name).join(", ")}</p>
                    )}
                    {movie.vote_average > 0 && (
                        <p><span>Average rating: </span>{Math.floor(movie.vote_average)} / 10 ⭐</p>
                    )}
                    {movie.vote_count > 0 && (
                        <p><span>Vote count: </span>{Math.floor(movie.vote_count)}</p>
                    )}
                    {movie.release_date && (
                        <p><span>Release date: </span>{movie.release_date}</p>
                    )}
                    {!isLoading && (
                        <nav>
                            <NavLink
                                className={({ isActive }) => {
                                    return clsx(css.navLink, isActive && css.isActive);
                                }}
                                to="cast">Cast</NavLink>
                            <NavLink
                                className={({ isActive }) => {
                                    return clsx(css.navLink, isActive && css.isActive);
                                }}
                                to="reviews">Reviews</NavLink>
                        </nav>
                    )}

                </div>
            </div>
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
            <Toaster />
        </div>
    );
    
}