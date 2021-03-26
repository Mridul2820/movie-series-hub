import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

// Icons
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import SearchIcon from '@material-ui/icons/Search';

const MainNav = () => {
    const [value, setValue] = useState(0);
    const history = useHistory()

    useEffect(() => {
        if(value === 0) {
            history.push('/')
        }

        else if(value === 1) {
            history.push('/movies')
        }

        else if(value === 2) {
            history.push('/series')
        }

        else if(value === 3) {
            history.push('/search')
        }
    }, [value, history])

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className="bottom-nav"
        >
            <BottomNavigationAction 
                className="bottom-nav-icon" 
                label="Trending" 
                icon={<WhatshotIcon />} 
            />

            <BottomNavigationAction 
                className="bottom-nav-icon" 
                label="Movies" 
                icon={<MovieIcon />} 
            />
            <BottomNavigationAction 
                className="bottom-nav-icon" 
                label="TV Series" 
                icon={<TvIcon />} 
            />
            <BottomNavigationAction 
                className="bottom-nav-icon" 
                label="Search" 
                icon={<SearchIcon />} 
            />
        </BottomNavigation>
    );
}

export default MainNav