import { useState, useEffect } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'

import SingleContent from '../components/SingleContent'
import CustomPagination from '../components/CustomPagination'
import Genres from '../components/Genres'
import useGenre from '../hooks/useGenre'

const movieURL = 'https://api.themoviedb.org/3/discover/movie?'
const apiKey = `api_key=${process.env.REACT_APP_API_KEY}`

const Movies = () => {

    const [page, setPage] = useState(1)
    const [movies, setMovies] = useState([])
    const [numOfPages, setNumOfPages] = useState()

    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])

    const genreForURL = useGenre(selectedGenres)

    const fetchMovies = async () => {
        const {data} = await axios.get(`${movieURL}${apiKey}&page=${page}&with_genres=${genreForURL}`)

        // console.log(data)

        setMovies(data.results)
        setNumOfPages(data.total_pages)
    }

    useEffect(() => {
        fetchMovies()
        // eslint-disable-next-line
    }, [page, genreForURL])

    return (
        <div>
            <span className="page-title">Movies</span>
            <Helmet>
                <title>Explore Trending Movies</title>
                <meta 
                    name="description"
                    content="Explore New Movies with genres"
                />
                <meta name="keywords" content="movies with genres"/>
            </Helmet>
            <Genres 
                type="movie"
                genres={genres} 
                setGenres={setGenres}
                selectedGenres={selectedGenres} 
                setSelectedGenres={setSelectedGenres}
                setPage={setPage}
            />
            <div className="content-list">
                {movies && movies.map(movie => (
                    <SingleContent 
                        key={movie.id} 
                        id={movie.id} 
                        poster={movie.poster_path} 
                        title={movie.title || movie.name} 
                        date={movie.release_date || movie.first_air_date} 
                        media_type="movie"
                        vote_average={movie.vote_average}
                    />
                ))}
            </div>
            {numOfPages > 1 && 
                <CustomPagination 
                setPage={setPage} 
                numOfPages={numOfPages} 
            />}
        </div>
    )
}

export default Movies
