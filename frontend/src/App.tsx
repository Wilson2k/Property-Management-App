import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import DashBoardPage from './components/DashboardPage';
import ProfilePage from './components/ProfilePage';
import PropertyPage from './components/PropertyPage';
import TenantPage from './components/TenantPage';
import LeasePage from './components/LeasePage';
import TicketPage from './components/TicketPage';
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
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;