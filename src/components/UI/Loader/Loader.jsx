import React from 'react';
import classes from './Loader.module.css';

function Loader() {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
    >
      <div className={classes.loader}></div>
    </div>
  );
}

export default Loader;
