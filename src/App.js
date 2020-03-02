import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.scss';

import Books from './components/Books';

const App = () => {
    return ( 
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/books/1" />
                    </Route>
                    <Route path="/books" exact>
                        <Redirect to="/books/1" />
                    </Route>
                    <Route path="/books/:page" exact component={ Books } />
                    <Route path="*" exact>
                        <Redirect to="/books/1" />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
