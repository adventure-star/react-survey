import React from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import './App.css';
import List from './pages/List';
import Detail from './pages/Detail';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <main className="w-full h-full" style={{ minHeight: "100vh" }}>
          <Switch>
            <Redirect from="/" exact to="/all" />
            <Route path="/all" component={List} />
            <Route path="/surveys/:id" component={Detail} />
          </Switch>
        </main>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
