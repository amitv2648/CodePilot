import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
  
  
  import Landing from "../pages/Landing";
  import Login from "../pages/auth/Login";
  import Signup from "../pages/auth/Signup";
  import ForgotPassword from "../pages/auth/ForgotPassword";
  import Dashboard from "../pages/dashboard/Dashboard";
  import Onboarding from "../pages/onboarding/Onboarding";
  
  
  import ProtectedRoute from "./ProtectedRoute";
  
  
  function AppRoutes() {
  
    return (
  
      <BrowserRouter>
  
        <Routes>
  
  
          <Route
            path="/"
            element={<Landing />}
          />
  
  
          <Route
            path="/login"
            element={<Login />}
          />
  
  
          <Route
            path="/signup"
            element={<Signup />}
          />
  
  
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
  
  
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            }
          />
  
  
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
  
  
        </Routes>
  
      </BrowserRouter>
  
    );
  
  }
  
  
  export default AppRoutes;