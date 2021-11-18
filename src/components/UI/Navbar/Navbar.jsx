import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../button/MyButton';
import { AuthContext } from './../../../context/context';

function Navbar() {
  const { isUserAuthorised, setIsUserAuthorised } = useContext(AuthContext);

  const logOut = () => {
    setIsUserAuthorised(false);
    localStorage.removeItem('auth');
  };

  return (
    <div className="navbar">
      <MyButton
        active={isUserAuthorised.toString()}
        style={{
          backgroundColor: isUserAuthorised
            ? 'rgba(0, 128, 128, 0.726)'
            : 'grey',
          color: isUserAuthorised ? 'white' : 'black',
        }}
        onClick={logOut}
      >
        Выйти
      </MyButton>
      <div className="navbar__links">
        <Link to="/about">О сайте</Link>
        <Link to="/posts">Посты</Link>
      </div>
    </div>
  );
}

export default Navbar;
