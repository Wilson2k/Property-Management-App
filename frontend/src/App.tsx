import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import AboutPage from './pages/Home/AboutPage';
import ContactPage from './pages/Home/ContactPage';
import DashBoardPage from './pages/User/DashboardPage';
import ProfilePage from './pages/User/ProfilePage';
import PropertyPage from './pages/User/PropertyPage';
import TenantPage from './pages/User/TenantPage';
import LeasePage from './pages/User/LeasePage';
import TicketPage from './pages/User/TicketPage';
import CreatePropertyPage from './pages/Property/CreateProperty';
import NotFoundPage from './pages/NotFoundPage';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<DashBoardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/properties" element={<PropertyPage />} />
          <Route path="/leases" element={<LeasePage />} />
          <Route path="/tickets" element={<TicketPage />} />
          <Route path="/tenants" element={<TenantPage />} />
          <Route path="/property/create" element={<CreatePropertyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;