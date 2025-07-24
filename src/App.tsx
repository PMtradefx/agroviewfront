import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/login';
import Dashboardold from './components/dashboardold/Dashboard';
import Index from './components/Home/index'; 
import Dashboard from './components/dashboard/dashboard';


const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = localStorage.getItem('sanctum_token');
    return token ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <div className="App">
                <main>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboardold" element={
                            <PrivateRoute>
                                <Dashboardold />
                            </PrivateRoute>
                        } />
                        <Route path="/dashboard/" element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } />
                        <Route path="/dashboard/*" element={
                            <PrivateRoute>
                                <Dashboard/>
                            </PrivateRoute>
                        } />
                        <Route path="/" element={<Index/>} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
