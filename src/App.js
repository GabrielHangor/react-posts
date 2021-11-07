import React, { useState } from 'react';

function App() {
  return (
    <div className="App">
      <div className="post">
        <div className="post__content">
          <strong>1. Javascript</strong>
          <div>Javascript - язык программирования</div>
        </div>
      </div>
      <div className="post__btns">
        <button>Удалить </button>
      </div>
    </div>
  );
}

export default App;
