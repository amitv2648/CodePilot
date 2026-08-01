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
  import Layout from "../components/layout/Layout";
  import ProfileSetup from "../pages/profile/ProfileSetup";
  import CoursePage from "../pages/CoursePage";
  
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
          path="/profile-setup"
          element={
            <ProtectedRoute>
            <ProfileSetup />
            </ProtectedRoute>
          }
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
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
  
          <Route
            path="/course/:language"
            element={
              <ProtectedRoute>
                <Layout showSidebar={false}>
                  <CoursePage />
                </Layout>
              </ProtectedRoute>
            }
          />
  
  
        </Routes>
  
      </BrowserRouter>
  
    );
  
  }
  
  
  export default AppRoutes;