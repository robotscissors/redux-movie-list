import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import MovieList from './components/MovieList';
import MovieSearchResults from './components/MovieSearchResults';

import configureStore from './redux/store';
import Navbar from './components/navigation/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router>
      <Navbar/> 
      <Switch>
        <Route exact path="/redux-movie-list/" component={MovieSearchResults} />
        <Route exact path="/redux-movie-list/movie-list" component={MovieList} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);


