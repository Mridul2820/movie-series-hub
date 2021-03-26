import React from 'react'
import { img300, unavailable } from "../config/config";

const SingleContent = ({ id, poster, title, date, media_type, vote_average}) => {
    return (
        <div className="media">
            <img 
                src={ poster ? `${img300}${poster}` : unavailable} 
                alt={title} 
                className="poster"
            />
            <b className="title">{title}</b>
            <span className="sub-title">
                {media_type === "movie" ? "Movie" : "TV"}
                <span className="sub-title">{date}</span>
            </span>
        </div>
    )
}

export default SingleContent
