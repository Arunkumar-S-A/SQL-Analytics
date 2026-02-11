import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import UserAnalytics from "./pages/UserAnalytics";
import TransactionAnalytics from "./pages/TransactionAnalytics";
import TrendAnalysis from "./pages/TrendAnalysis";
import TrendDetail from "./pages/TrendDetail";
import CategoryAnalytics from "./pages/CategoryAnalytics";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UserAnalytics />} />
        <Route path="/transactions" element={<TransactionAnalytics />} />
        <Route path="/trends" element={<TrendAnalysis />} />
        <Route path="/trends/:type" element={<TrendDetail />} />
        <Route path="/categories" element={<CategoryAnalytics />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
