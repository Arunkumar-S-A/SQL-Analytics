import { useEffect, useState } from "react";
import {
  getUsers,
  getUserTransactions,
  getUserAnomalies,
  getUserPattern
} from "../api/userAnalytics.api";
import RadialRiskChart from "../components/charts/RadialRiskChart";
import DataTable from "../components/DataTable";
import "./UserAnalytics.css";
import UserPatternChart from "../components/charts/UserPatternChart";


const UserAnalytics = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [modalData, setModalData] = useState(null);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const filtered = users.filter(u =>
    u.full_name.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = async (type, userId) => {
    setModalType(type);

    if (type === "transactions")
      setModalData(await getUserTransactions(userId));

    if (type === "anomalies")
      setModalData(await getUserAnomalies(userId));

    if (type === "pattern")
      setModalData(await getUserPattern(userId));
  };

  return (
    <div className="user-container">
      <h2>User Analytics</h2>

      {/* 🔍 Search */}
      <input
        className="search-bar"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 👥 User List */}
      <div className="user-list">
        {filtered.map((user) => (
          <div key={user.user_id} className="user-card">
            <div>
              <h4>{user.full_name}</h4>
              <p>{user.email}</p>
              <span>{user.city}</span>
            </div>

            <div className="actions">
              <button onClick={() => openModal("transactions", user.user_id)}>📄</button>
              <button onClick={() => openModal("anomalies", user.user_id)}>⚠️</button>
              <button onClick={() => openModal("pattern", user.user_id)}>📊</button>
            </div>
          </div>
        ))}
      </div>

      {/* 🪟 Modal */}
      {modalData && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={() => setModalData(null)}>✖</button>

            {modalType === "transactions" && (
              modalData && modalData.length > 0 ? (
                <DataTable
                  columns={["transaction_id", "amount", "status", "transaction_time"]}
                  data={modalData}
                />
              ) : (
                <p className="empty-state">No transactions found for this user.</p>
              )
            )}


            {modalType === "anomalies" && (
              modalData.length ? (
                <>
                  <RadialRiskChart data={modalData} />
                  <DataTable
                    columns={["transaction_id", "risk_type"]}
                    data={modalData}
                  />
                </>
              ) : (
                <p>No anomalies detected for this user 🎉</p>
              )
            )}

            {modalType === "pattern" && (
              <UserPatternChart
                daily={modalData.daily}
                monthly={modalData.monthly}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAnalytics;
