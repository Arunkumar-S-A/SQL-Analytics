import { useState } from "react";
import UserTransactionsModal from "./UserTransactionsModal";
import UserAnomaliesModal from "./UserAnomaliesModal";
import UserPatternModal from "./UserPatternModal";

const UserTable = ({ users }) => {
  const [selected, setSelected] = useState(null);
  const [type, setType] = useState(null);

  return (
    <>
      {users.map((u) => (
        <div key={u.user_id} className="user-card">
          <div>
            <h3>{u.full_name}</h3>
            <p>{u.email}</p>
            <p>{u.city}</p>
          </div>

          <div>
            <button onClick={() => {setSelected(u); setType("tx")}}>📜</button>
            <button onClick={() => {setSelected(u); setType("anomaly")}}>⚠️</button>
            <button onClick={() => {setSelected(u); setType("pattern")}}>📈</button>
          </div>
        </div>
      ))}

      {type === "tx" && <UserTransactionsModal user={selected} close={() => setType(null)} />}
      {type === "anomaly" && <UserAnomaliesModal user={selected} close={() => setType(null)} />}
      {type === "pattern" && <UserPatternModal user={selected} close={() => setType(null)} />}
    </>
  );
};

export default UserTable;
