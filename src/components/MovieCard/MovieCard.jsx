import css from './MovieCard.module.css'

export default function MovieCard ({
    movie: {title, poster_path, vote_average},
}) {

    const defaultImg = "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg";

    return (
        <div>
            <img src={
                poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` :
                    defaultImg
            }
                alt={`${title} poster`}/>
            <p className={css.vote}>{Math.floor(vote_average)} / 10 ⭐</p>
        </div>
    );

}