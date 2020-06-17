import React, { Component } from 'react';
import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PlayersList from '../pages/PlayersList';
import PlayersInsert from '../pages/PlayersInsert';
import PlayersTable from '../pages/PlayersTable';
import PlayersUpdate from '../pages/PlayersUpdate';
import Toss from '../pages/Toss';
import Results from '../pages/Results';

class App extends Component {

  render() {

    return(
      <div>
        <Router>
          <Header />
            <Switch>
              <Route path="/players/list" exact component={PlayersList} />
              <Route path="/players/create" exact component={PlayersInsert} />
              <Route path="/players/updateList" exact component={PlayersTable} />
              <Route path="/players/update/:id" exact component={PlayersUpdate} />
              <Route path='/toss' exact component={Toss} />
              <Route path='/toss/results' exact component={Results} />
              <Redirect to="/players/list" />
            </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
