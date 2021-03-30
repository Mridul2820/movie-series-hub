import React from 'react'
import Trailers from './Trailers'
import ModalGenre from './ModalGenre'

import { img500, unavailable, unavailableLandscape } from "../config/config";

const ModalContent = ({ content, videos }) => {
    return (
        <div className="content-modal">
            <img src={content.poster_path 
                ? `${img500}/${content.poster_path}`
                : unavailable
            } 
            alt={content.name || content.title}
            className="content-modal-portrait"/>

            <img src={content.backdrop_path
                ? `${img500}/${content.backdrop_path}`
                : unavailableLandscape
            }
            alt={content.name || content.title}
            className="content-modal-landscape"
            />

            <div className="content-modal-about">
                <span className="content-modal-title">
                    {content.name || content.title} (
                    {(
                    content.first_air_date ||
                    content.release_date ||
                    "-----"
                    ).substring(0, 4)}
                    )
                </span>

                {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                )}

                <div className="chips">
                    {content.genres.map(genre => (
                        <ModalGenre key={genre.id} genre={genre} />
                    ))}
                </div>
                

                <p className="content-modal-description">
                    {content.overview}
                </p>

                <div>
                    {/* <Carousel id={id} media_type={media_type} /> */}
                </div>

                <div className="trailer">
                    {videos && videos.map(video => (
                        <Trailers key={video.id} video={video} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ModalContent
