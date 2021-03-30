import { useState, useEffect } from 'react'
import axios from 'axios'

import { img300, noPicture } from "../config/config";

const castnCrewURl = 'https://api.themoviedb.org/3/'
const apiKey = `api_key=${process.env.REACT_APP_API_KEY}`

const CastnCrew = ({ id, media_type }) => {
    const [credits, setCredits] = useState()

    const fetchCastnCrew = async () => {
        const {data} = await axios.get(`${castnCrewURl}${media_type}/${id}/credits?${apiKey}&language=en-US`)

        setCredits(data.cast)

        // console.log(data.cast)
    }


    useEffect(() => {
        fetchCastnCrew();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="casts">
            {credits && credits.map(credit => (
                <div className="cast" key={credit.id}>
                    <img 
                        src={credit.profile_path 
                            ? `${img300}/${credit.profile_path}` 
                            : noPicture
                        } 
                        alt={credit?.name}
                        className="cast-img"
                    /> 
                    <div className="cast-name">
                        <h4>Character : {credit.character}</h4>
                        <h4>By : {credit.name}</h4>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CastnCrew
