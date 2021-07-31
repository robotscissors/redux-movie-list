import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import MovieSearch from './components/MovieSearch';

import configureStore from './redux/store';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router>
      <Navbar/> 
      <Switch>
        <Route exact path="/redux-movie-list/" component={MovieSearch} />
        <Route exact path="/redux-movie-list/movie-list" component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);


