import { useState, useEffect } from 'react'
import axios from "axios"

import SingleContent from '../components/SingleContent';

const trendURL = 'https://api.themoviedb.org/3/trending/all/day?'
const apiKey = `api_key=${process.env.REACT_APP_API_KEY}`

const Trending = () => {
    const [trends, setTrends] = useState([])

    const fetchTrending = async () => {
        const {data} = await axios.get(`${trendURL}${apiKey}`)

        console.log(data)

        setTrends(data.results)
    }

    useEffect(() => {
        fetchTrending()
    }, [])

    return (
        <div>
            <span className="page-title">Trending</span>
            <div className="trending">
                {trends && trends.map(trend => (
                    <SingleContent 
                        key={trend.id} 
                        id={trend.id} 
                        poster={trend.poster_path} 
                        title={trend.title || trend.name} 
                        date={trend.release_date || trend.first_air_date} 
                        media_type={trend.media_type}
                        vote_average={trend.vote_average}
                    />
                ))}
            </div>
        </div>
    )
}

export default Trending
