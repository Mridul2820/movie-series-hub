import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import ModalContent from './ModalContent';

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
        backgroundColor: "#019130",
        outline: "none",
        borderRadius: 10,
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
        // console.log(data);
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
                    <ModalContent 
                        content={content}
                        videos={videos}
                        id={id}
                        media_type={media_type}
                    />
                </div>
                )}
            </Fade>
            </Modal>
        </>
    );
}

export default ContentModal
