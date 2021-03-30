import React from 'react'
import { img300, unavailable } from "../config/config";

import Badge from '@material-ui/core/Badge';
import ContentModal from './ContentModal';

const SingleContent = ({ id, poster, title, date, media_type, vote_average}) => {

    const voteColor = (voteAvg) => {
        if(voteAvg > 7){
            return "primary"
        }
        else if(voteAvg < 7 && voteAvg > 4){
            return "secondary"
        }
        else {
            return "error"
        }
    }

    return (
        <ContentModal id={id} media_type={media_type} >
            <Badge 
                badgeContent={vote_average}
                color={voteColor(vote_average)}>
            </Badge>
            <img 
                src={ poster ? `${img300}${poster}` : unavailable} 
                alt={title} 
                className="poster"
            />
            <b className="title">{title}</b>
            <span className="sub-title">
                {media_type === "movie" ? "Movie" : "TV Series"}
                <span className="sub-title">{date}</span>
            </span>
        </ContentModal>
    )
}

export default SingleContent
