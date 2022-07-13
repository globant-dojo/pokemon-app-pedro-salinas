import { useState } from "react";
import './totalEntries.css';
export const TotalEntries = ({ setTotalEntries }) => {
  const [total, setTotal] = useState("10");
  const ops = ["5", "10", "25", "50", "100"];
  const totalChange = (event) => {
    const value = event.target.value;
    setTotalEntries(value);
    setTotal(value);
  };
  return (
    <div className="total-entries">
      <span>Mostar</span>
      <select
        className="select-m"
        name="total-entries"
        id="total-entries"
        value={total}
        onChange={totalChange}
      >
        {ops.map((o, i) => (
          <option value={o} key={i}>
            {o}
          </option>
        ))}
      </select>
      <span>entradas</span>
    </div>
  );
};
