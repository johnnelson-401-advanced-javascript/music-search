import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import SearchPage from '../container/SearchPage';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import NotFound from './NotFound/NotFound';

export default function App() {

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={SearchPage} />
        {/* <Route path="/artist/:id" component={artistPage} /> */}
        <Route path="/" component={NotFound} />
      </Switch>
      <Footer />
    </Router>

  );
}
