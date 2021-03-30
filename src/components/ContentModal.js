import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import Trailers from './Trailers'
import ModalGenre from './ModalGenre'

import { img500, unavailable, unavailableLandscape } from "../config/config";

const detailURL = 'https://api.themoviedb.org/3/'
const apiKey = `api_key=${process.env.REACT_APP_API_KEY}`

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: "90%",
        height: "80%",
        backgroundColor: "#39445a",
        border: "1px solid #282c34",
        borderRadius: 10,
        color: "white",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 3),
    },
}));



const ContentModal = ({ children, media_type, id }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState()
    const [videos, setVideos] = useState()
  
    const handleOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    const fetchData = async () => {
        const { data } = await axios.get(
          `${detailURL}${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
    
        setContent(data);
        console.log(data);
    };

    const fetchVideo = async () => {
        const { data } = await axios.get(
          `${detailURL}${media_type}/${id}/videos?${apiKey}&language=en-US`
        );

        // console.log(data)
    
        setVideos(data.results);
    };

    useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
    }, []);
  
    return (
        <>
            <div type="button" className="media" onClick={handleOpen}>
            {children}
            </div>
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            >
            <Fade in={open}>
                {content && (
                <div className={classes.paper}>
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
                </div>
                )}
            </Fade>
            </Modal>
        </>
    );
}

export default ContentModal
