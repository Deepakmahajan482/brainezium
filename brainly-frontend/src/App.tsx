import SideBar from './SideBar';
import RightPart from './RightPart';
import Signin from './Signin';
import Signup from './Signup';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import ShareFullContent from './ShareFullContent';
import ShareSingleContent from './ShareSingleContent';

const App = () => {
  const [LoggedIn, setLoggedIn] = useState( !!localStorage.getItem("token"));

  return (
    <Router>

      <Routes>

        <Route
          path="/dashboard"
          element={
          LoggedIn ?
            <div className="flex flex-row">
              <SideBar setLoggedIn={setLoggedIn} />
              <RightPart />
            </div>:(
      <Navigate to="/" />
    )

          }
        />

        <Route
          path="/"
          element={<Signin setLoggedIn={setLoggedIn} />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/share/:id"
          element={<ShareFullContent/>}
          />


          <Route
          path="/Content/share/:id"
          element={<ShareSingleContent/>}
          />
      </Routes>

    </Router>
  )
}

export default App