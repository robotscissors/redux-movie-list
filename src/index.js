import { Provider } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import MovieLists from './components/MovieList';
import MovieSearchResults from './components/MovieSearchResults';

import configureStore from './redux/store';
import Navbar from './components/navigation/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <Provider store={configureStore()}>
    <HashRouter>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={MovieSearchResults} />
        <Route path="/movie-list" component={MovieLists} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);


