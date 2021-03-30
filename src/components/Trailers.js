import React from 'react'

const Trailers = ({ video }) => {
    return (
        <div>
            <br/>
            <h3 className="trailer-title">{video.name}</h3>
            <iframe 
                
                width="560" 
                height="315" 
                src={`https://www.youtube.com/embed/${video.key}`}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
            >
            </iframe>
        </div>
    )
}

export default Trailers
