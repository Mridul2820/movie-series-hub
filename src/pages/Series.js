import { useState, useEffect } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'

import SingleContent from '../components/SingleContent'
import CustomPagination from '../components/CustomPagination'
import Genres from '../components/Genres'
import useGenre from '../hooks/useGenre'

const seriesURL = 'https://api.themoviedb.org/3/discover/tv?'
const apiKey = `api_key=${process.env.REACT_APP_API_KEY}`

const Series = () => {

    const [page, setPage] = useState(1)
    const [series, setSeries] = useState([])
    const [numOfPages, setNumOfPages] = useState()

    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])

    const genreForURL = useGenre(selectedGenres)

    const fetchMovies = async () => {
        const {data} = await axios.get(`${seriesURL}${apiKey}&page=${page}&with_genres=${genreForURL}`)

        // console.log(data)

        setSeries(data.results)
        setNumOfPages(data.total_pages)
    }

    useEffect(() => {
        fetchMovies()
        // eslint-disable-next-line
    }, [page, genreForURL])

    return (
        <div>
            <span className="page-title">TV Series</span>
            <Helmet>
                <title>Explore Trending TV Series</title>
                <meta 
                    name="description"
                    content="Explore New TV Series with genres"
                />
                <meta name="keywords" content="TV Series with genres"/>
            </Helmet>
            <Genres 
                type="tv"
                genres={genres} 
                setGenres={setGenres}
                selectedGenres={selectedGenres} 
                setSelectedGenres={setSelectedGenres}
                setPage={setPage}
            />
            <div className="content-list">
                {series && series.map(tv => (
                    <SingleContent 
                        key={tv.id} 
                        id={tv.id} 
                        poster={tv.poster_path} 
                        title={tv.title || tv.name} 
                        date={tv.release_date || tv.first_air_date} 
                        media_type="tv"
                        vote_average={tv.vote_average}
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

export default Series
