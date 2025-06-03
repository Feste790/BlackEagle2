import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, CircleUserRound, Filter } from 'lucide-react';
import './App.css';

const Header = ({ searchQuery, setSearchQuery }) => {
    return (
        <header className="header-container">
            <div className="header-left">
                <div className="logo">
                    <a href="/">
                        <img src="blackeaglelogo.png" alt="logo" />
                    </a>
                </div>
                <nav className="nav-links">
                    <Link to="/movies">Filmy</Link>
                    <Link to="/series">Seriale</Link>
                    <Link to="/watched">Obejrzane</Link>
                </nav>
            </div>

            <div className="header-right">
                <input
                    type="text"
                    className="search-header"
                    placeholder="Szukaj"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="Header_icons">
                    <Filter className="icon-funnel" />
                    <Settings className="icon-settings" />
                    <Link to="/login" title="Zaloguj się" className='Header_icons'>
                        <CircleUserRound className="icon-CircleUserRound" />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
