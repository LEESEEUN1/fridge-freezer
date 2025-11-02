import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Fridge Freezer</h1>
        <p>냉장고 관리 앱에 오신 것을 환영합니다!</p>
        <button onClick={() => {
          console.log('Add Item');
        }}>Add Item</button>
      </header>
    </div>
  );
}

export default App;

