import logo from './logo.svg';
import './App.css';
import SongCard from './components/SongCard';
import Playlist from './pages/Playlist';
import Allsongs from './pages/Allsongs';

function App() {
  return (
    <div className="App">
    <Playlist/>
    <Allsongs/>
    </div>
  );
}

export default App;
