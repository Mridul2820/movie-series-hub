import { useState, useEffect } from 'react'

import { Button, createMuiTheme, Tabs, Tab, TextField, ThemeProvider } from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search?";
import SingleContent from '../components/SingleContent';
import CustomPagination from '../components/CustomPagination';
import axios from 'axios';

const searchURL = 'https://api.themoviedb.org/3/search/'
const apiKey = `api_key=${process.env.REACT_APP_API_KEY}`

const Search = () => {
    const [type, setType] = useState(0)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState('')
    const [contents, setContents] = useState([])
    const [numOfPages, setNumOfPages] = useState()

    const darkTheme = createMuiTheme({
        palette: {
            type: "light",
            primary: {
                main: "#000",
            },
        },
    });

    const handleChange = (event, newValue) => {
        setType(newValue);
        setPage(1)
    };

    const fetchSearch = async () => {
        const {data} = await axios.get(`${searchURL}${type ? 'tv' : 'movie'}?${apiKey}&language=en-US&query=${searchText}&page=${page}`)

        setContents(data.results)
        setNumOfPages(data.total_pages)
    }

    useEffect(() => {
        window.scroll(0, 0)
        fetchSearch()
        // eslint-disable-next-line
    }, [page, type])

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div className="search">
                <TextField
                    className="searchbox"
                    label="Search"
                    variant="filled"
                    onChange={e => setSearchText(e.target.value)}

                />
                <Button 
                    className="search-btn"
                    variant='contained'
                    onClick={fetchSearch}
                >
                    <SearchIcon fontSize="large"/>
                </Button>
                </div>

                <Tabs 
                    value={type} 
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange} 
                    className="tabs"
                    aria-label="disabled tabs example"
                >
                    <Tab style={{ width: "50%" }} label="Search Movies" />
                    <Tab style={{ width: "50%" }} label="Search TV Series" />
                </Tabs>
            </ThemeProvider>
            <div className="content-list">
                {contents && contents.map(content => (
                    <SingleContent 
                        key={content.id} 
                        id={content.id} 
                        poster={content.poster_path} 
                        title={content.title || content.name} 
                        date={content.release_date || content.first_air_date} 
                        media_type={type ? "tv" : "movie"}
                        vote_average={content.vote_average}
                    />
                ))}
                {searchText &&
                    !contents &&
                    (type ? 
                        <h2>No Series Found</h2> : 
                        <h2>No Movies Found</h2>
                    )
                }
            </div>
            {numOfPages > 1 && 
                <CustomPagination 
                setPage={setPage} 
                numOfPages={numOfPages} 
            />}
        </div>
    )
}

export default Search
