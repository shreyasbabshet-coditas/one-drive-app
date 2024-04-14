import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Folders from "./components/Folders/Folders";
import { withProvider } from "./App.state";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="one-drive" element={<Folders />} />
          <Route path=":id" element={<Folders />}>
            <Route path=":id" element={<Folders />}>
              <Route path=":id" element={<Folders />}>
                <Route path=":id" element={<Folders />}>
                  <Route path=":id/*" element={<Folders />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default withProvider(App);
