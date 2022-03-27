import React from 'react';

import './App.css';
import ReactSimplePassword from './lib/ReactSimplePassword';

function App() {
  return (
    <div className="App">
      <div>
        <ReactSimplePassword
          theme="BROWN"
          title="React Simple Password"
          onFull={(e) => {
            console.log(e);
          }}
        />
      </div>
    </div>
  );
}

export default App;
