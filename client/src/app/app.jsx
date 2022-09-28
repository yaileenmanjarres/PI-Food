import './app.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Cover from '../components/pages/cover/cover';
import Explore from '../components/pages/explore/explore';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Route exact path={'/'}>
            <Cover />
          </Route>
          <Route exact path={'/explore'}>
            <Explore />
          </Route>
        </div>
      </BrowserRouter>
  );
}

export default App;