import { useState } from 'react'

import { Button, createMuiTheme, Tabs, Tab, TextField, ThemeProvider } from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search";

const Search = () => {
    const [type, setType] = useState(0)
    const [page, setPage] = useState(1)

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

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div className="search">
                <TextField
                    className="searchbox"
                    label="Search"
                    variant="filled"
                    // onChange={e => setSearchText(e.target.value)}
                />
                <Button 
                    className="search-btn"
                    variant='contained'
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
                >
                    <Tab style={{ width: "50%" }} label="Search Movies" />
                    <Tab style={{ width: "50%" }} label="Search TV Series" />
                </Tabs>
            </ThemeProvider>
        </div>
    )
}

export default Search
