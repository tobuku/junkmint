import { Routes, Route } from 'react-router-dom'
import { ToastProvider } from './hooks/useToast'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Requests from './pages/Requests'
import Quotes from './pages/Quotes'
import Schedule from './pages/Schedule'
import Jobs from './pages/Jobs'
import Clients from './pages/Clients'
import Invoices from './pages/Invoices'
import Inventory from './pages/Inventory'
import Team from './pages/Team'
import Documents from './pages/Documents'
import Reports from './pages/Reports'

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/team" element={<Team />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </ToastProvider>
  )
}
