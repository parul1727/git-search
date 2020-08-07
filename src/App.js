import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import GitSearch from "./components/GitSearch";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route
            exact
            path="/"
            render={() => <GitSearch />}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
