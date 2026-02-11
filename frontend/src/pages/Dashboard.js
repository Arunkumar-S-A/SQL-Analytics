import { useEffect, useState } from "react";
import { getSummary } from "../api/analytics.api";
import SummaryCard from "../components/SummaryCard";
import Navbar from "../components/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Dashboard.css";

const Dashboard = () => {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    getSummary().then(setSummary);
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="dashboard-wrapper">
      

      {/* HERO SECTION */}
      <section className="hero-section">
        <h1 className="system-title">
          FinTrack Analytics System
        </h1>
        <p className="system-description">
          A centralized platform to monitor users, transactions and financial insights.
          Designed to manage categories and analyze performance trends efficiently.
        </p>
      </section>
      
      <div className="section-separator"></div>

      {/* SUMMARY SECTION */}
      <section className="summary-section" data-aos="fade-up">
        <div className="summary-grid">
          <SummaryCard title="Total Users" value={summary.total_users} />
          <SummaryCard title="Total Transactions" value={summary.total_transactions} />
          <SummaryCard title="Total Revenue" value={`₹${summary.total_revenue}`} />
        </div>
      </section>

      {/* FEATURES SECTION (ANCHOR TYPE GRID) */}
      <section className="features-section">
        <div className="analytics-grid">
          <a href="/users" className="grid-box users-box" data-aos="fade-right">
            👤
            <span>Users</span>
          </a>

          <a href="/transactions" className="grid-box transactions-box" data-aos="fade-up">
            💰
            <span>Transactions</span>
          </a>

          <a href="/categories" className="grid-box categories-box" data-aos="fade-left">
            🗂️
            <span>Categories</span>
          </a>

          <a href="/trends" className="grid-box trends-box" data-aos="zoom-in">
            📈
            <span>Trends</span>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 FinTrack Analytics System</p>
        <p>Financial Monitoring & Data Visualization Platform</p>
      </footer>
    </div>
  );
};

export default Dashboard;
