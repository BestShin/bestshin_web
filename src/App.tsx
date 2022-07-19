import React from 'react';
import './App.css';

function App() {

  const lintTestFnc = () => {
    let a = 1;
    let b = 2;
    a += 1;
    b += 2;
    if (a == b) console.log('a equals b');
  }

  return (
    <div className='App'>
      <span>Hello MUG!</span>
    </div>
  );
}

export default App;