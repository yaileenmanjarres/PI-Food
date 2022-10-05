import './app.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Cover from '../components/pages/cover/cover';
import Explore from '../components/pages/explore/explore';
import Form from '../components/form/form';
import Modal from '../components/information/information';

function App() {

  return (
    <BrowserRouter>
        <div className="App">
          <Route exact path={'/'}>
            <Cover />
          </Route>
          <Route path={'/explore'}>
            <Explore />
          </Route>
          <Route exact path={'/explore/create-recipe'}>
            <Form />
          </Route>
          <Route path={'/explore/details/:id'}>
            <Modal />
          </Route>
        </div>
      </BrowserRouter>
  );
}

export default App;