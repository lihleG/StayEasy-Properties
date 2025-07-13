import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast"; 

import RealEstateHeader from "./components/RealEstateHeader";
import PropertyTypesSection from "./components/PropertyTypesSection";
import AuthPage from "./components/AuthPage";
import AboutSection from "./components/AboutSection";
import ListingCarousel from "./components/ListingCarousel";
import LatestProjects from "./components/LatestProjects";
import RealEstateTeam from "./components/RealEstateTeam";
import PropertyCard from "./components/PropertyCard";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import PropertiesPage from "./components/PropertiesPage";
import Agents from "./components/Agents";
import ContactUs from "./components/ContactUs";
import Dashboard from './components/Dashboard';


const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <RealEstateHeader />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const GoogleAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/admin/dashboard");
    } else {
      navigate("/auth");
    }
  }, [navigate, location]);

  return null;
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" reverseOrder={false} /> 
      <div className="w-full">
        <Routes>
          <Route path="/" element={
            <MainLayout>
              <PropertyTypesSection />
              <AboutSection />
              <ListingCarousel />
              <LatestProjects />
              <RealEstateTeam />
              <PropertyCard />
              <Testimonials />
            </MainLayout>
          } />

          <Route path="/PropertiesPage" element={
            <MainLayout>
              <PropertiesPage />
            </MainLayout>
          } />

          <Route path="/dashboard" element={
  <MainLayout>
    <Dashboard />
  </MainLayout>
} />


          <Route path="/agents" element={
            <MainLayout>
              <Agents />
            </MainLayout>
          } />

          <Route path="/ContactUs" element={
            <MainLayout>
              <ContactUs />
            </MainLayout>
          } />

          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
};

export default App;



