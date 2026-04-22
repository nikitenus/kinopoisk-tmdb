import s from './MovieItem.module.css'

type Props = {
    title: string,
    posterPath: string | null
    voteAverage: number
}

const getRating = (rating: number) => {
    if (rating >= 7) return s.ratingHigh
    if (rating >= 5) return s.ratingMedium
    return s.ratingLow
}

export const MovieItem = ({title, posterPath, voteAverage}: Props) => {
    return (
        <div
            className={s.movieContainer}
        >
            <div>
                <a href="#" className={s.posterLink}>
                    <div className={s.posterFrame}>
                        <div
                            className={s.posterBg}
                            style={{
                                backgroundImage: posterPath
                                    ? `url(https://image.tmdb.org/t/p/original${posterPath})`
                                    : 'none',
                            }}
                        />
                        <span className={`${s.rating} ${getRating(voteAverage)}`}>
                            {voteAverage.toFixed(1)}
                        </span>
                    </div>
                </a>
            </div>
            <div>{title}</div>
        </div>
    );
};
