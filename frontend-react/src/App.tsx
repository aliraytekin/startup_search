import Startups from "./pages/Startups";
import './App.css';
import AppLayout from "./components/layout/AppLayout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Map from "./pages/Map"
import { StartupsProvider } from "./contexts/StartupsContext"

function App() {
  return (
    <StartupsProvider>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/startups" element={<Startups />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </AppLayout>
    </StartupsProvider>
  );
}

export default App;
