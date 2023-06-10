import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import AboutPage from './pages/Home/AboutPage';
import ContactPage from './pages/Home/ContactPage';
import DashBoardPage from './pages/User/DashboardPage';
import ProfilePage from './pages/User/ProfilePage';
import PropertyPage from './pages/Property';
import TenantPage from './pages/Tenant';
import TenantInfoPage from './pages/Tenant/TenantInfo';
import CreateTenantPage from './pages/Tenant/CreateTenant';
import LeasePage from './pages/Lease';
import TicketPage from './pages/Ticket';
import CreatePropertyPage from './pages/Property/CreateProperty';
import NotFoundPage from './pages/NotFoundPage';
import PropertyInfoPage from './pages/Property/PropertyInfo';
import EditPropertyPage from './pages/Property/EditProperty';
import RequireAuth from './components/RequireAuth';
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
          <Route path="/dashboard" element={<RequireAuth> <DashBoardPage /> </RequireAuth>} />
          <Route path="/profile" element={<RequireAuth> <ProfilePage /></RequireAuth>} />
          <Route path="/properties" element={<RequireAuth> <PropertyPage /></RequireAuth>} />
          <Route path="/leases" element={<RequireAuth> <LeasePage /></RequireAuth>} />
          <Route path="/tickets" element={<RequireAuth> <TicketPage /> </RequireAuth>} />
          <Route path="/tenants" element={<RequireAuth> <TenantPage /></RequireAuth>} />
          <Route path="/tenant/create" element={<RequireAuth> <CreateTenantPage /></RequireAuth>} />
          <Route path="/tenant/:id" element={<RequireAuth> <TenantInfoPage /></RequireAuth>} />
          <Route path="/property/create" element={<RequireAuth><CreatePropertyPage /></RequireAuth>} />
          <Route path="/property/:id" element={<RequireAuth> <PropertyInfoPage /></RequireAuth>} />
          <Route path="/property/edit/:id" element={<RequireAuth> <EditPropertyPage /></RequireAuth>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;