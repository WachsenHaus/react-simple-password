import React from 'react';

import './App.css';
import ReactSimplePassword from 'react-simple-password';

function App() {
  return (
    <div className="App">
      <div>
        <ReactSimplePassword
          theme="BROWN"
          title="React Simple Password"
          onFull={(e: any) => {
            console.log(e);
          }}
        />
        {/* <ReactSimplePassword
          theme="BROWN"
          title="React Simple Password"
          onFull={(e) => {
            console.log(e);
          }}
        /> */}
      </div>
    </div>
  );
}

export default App;
