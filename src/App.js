import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { AuthProvider } from './context/Auth';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from "./Pages/Signin";
import Dashboard from "./Pages/Dashboard";
import DynamicRoutes from './utils/DynamicRoutes';
import SignUp from "./Pages/SignUp";

function App() {
  return (
      <AuthProvider>
          <Router>
              <Routes>
                  <Route exact path='/signin' element={<SignIn/>}/>
                  <Route exact path='/signup' element={<SignUp/>}/>

                  <Route exact path='/' element={<DynamicRoutes authenticated/>}>
                      <Route exact path='/' element={<Dashboard/>}/>
                  </Route>

              </Routes>
          </Router>
      </AuthProvider>
  );
}

export default App;
