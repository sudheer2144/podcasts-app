import React, { useState } from 'react';
import "./styles.css"
import { NavLink } from 'react-router-dom';

const Header = ({ user }) => {

    const [navBackground, setNavBackground] = useState(false);

    const changeNavBackground = () => {
        if (window.scrollY > 16) {
            setNavBackground(true);
        }
        else {
            setNavBackground(false);
        }
    }

    window.addEventListener("scroll", changeNavBackground);

    return (
        <div className={`navbar`}>
            <div className="gradient"></div>
            <div className={`links ${navBackground ? "change-back" : ""}`}>
                {!user && <NavLink to={"/"}>Login/SignUp</NavLink>}
                {
                    user && <><NavLink to={"/podcasts"}>Podcasts</NavLink>
                        <NavLink to={"/create-podcast"}>Create Podcast</NavLink>
                        <NavLink to={"/profile"}>Profile</NavLink></>
                }
            </div>
        </div>
    );
}

export default Header;
