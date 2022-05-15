import './App.css';
import Comments from './components/Comments/Comments'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Comment Posting App</h1>
      </header>
      <Comments/>
      <footer className='footer'>
        <span>
          Copyright © 2022 Comment App
        </span>
      </footer>
    </div>
  );
}

export default App;
