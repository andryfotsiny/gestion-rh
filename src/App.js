import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import dashboardWrapper from "./pages/DashboardWrapper";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" component={dashboardWrapper} />
        {/* Ajoutez ici d'autres routes si nécessaire */}
      </Switch>
    </Router>
  );
}

export default App;

