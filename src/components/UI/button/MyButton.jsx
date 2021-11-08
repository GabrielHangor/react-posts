import React from 'react';
import classes from './MyButton.module.css';

function MyButton({ children, ...props }) {
  return (
    <button disabled={true} className={classes.myBtn}>
      {children}
    </button>
  );
}

export default MyButton;
