import logo from './logo.svg';
import './App.css';
import {default as AuthLayout} from './layouts/auth/Layout';
import {default as MainLayout} from './layouts/main/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import React, { Children, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Projects from './pages/Projects';
import Client from './pages/ClientDetails';
import Project from './pages/ProjectDetails';
import config from './config';

function RequireAuth({ children }){

    if(!config.getAuth()){
      config.logout();
      return <Navigate to="/" />;
    }else{
      return children;
    }
  }
function App() {
  // let navigate = useNavigate();

  return (
    <div>
      <Routes>
        {/* <Route path="/" exact render={() => <Navigate to="/app"/>}/>
        <Route path="/app" exact render={() => <Navigate to="/dashboard"/>}/>
        <Route path="/auth" element={<AuthLayout />}/>
        <Route path="/app" element={<MainLayout />} /> */}
        <Route path="/"  element={<AuthLayout />}>
          <Route path="" element={<Login />} />
          <Route
            // render={(props) => (
            //   <Signup {...props} />
            // )}
            path="signup" 
            element={<Signup />}
          
          />
        </Route>
        {/* <authRequired path="" element={<MainLayout />} >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
        </authRequired> */}
        <Route path="" element={<RequireAuth><MainLayout /></RequireAuth>} >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="clients/:id" element={<Client />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<Project />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
