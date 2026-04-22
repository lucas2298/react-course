import { useState, useEffect } from "react";
import "./App.css";

// ── Helpers ──────────────────────────────────────────────────────────────────

type DataItem = { id: number; label: string };

function expensiveProcessing(data: DataItem[]) {
  console.log("[expensiveProcessing] chạy");
  return data.map((item) => ({ ...item, upper: item.label.toUpperCase() }));
}

function Item({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  useEffect(() => {
    console.log(`[Item] "${label}" render`);
  });

  return (
    <button onClick={onClick} style={{ margin: 4, padding: "6px 14px" }}>
      {label}
    </button>
  );
}

// ── ExpensiveComponent ────────────────────────────────────────────────────────
// React Compiler tự memoize processedData và handleClick — không cần useMemo/useCallback.

function ExpensiveComponent({
  data,
  onClick,
}: {
  data: DataItem[];
  onClick: (id: number) => void;
}) {
  const processedData = expensiveProcessing(data);

  const handleClick = (item: DataItem) => {
    onClick(item.id);
  };

  useEffect(() => {
    console.log("[ExpensiveComponent] render");
  });

  return (
    <div>
      {processedData.map((item) => (
        <Item key={item.id} label={item.upper} onClick={() => handleClick(item)} />
      ))}
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

const ITEMS: DataItem[] = [
  { id: 1, label: "apple" },
  { id: 2, label: "banana" },
  { id: 3, label: "cherry" },
];

function App() {
  const [count, setCount] = useState(0);

  const handleClick = (id: number) => {
    console.log(`[App] clicked item id=${id}`);
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>React Compiler Demo</h2>
      <p>App render count: <strong>{count}</strong></p>
      <button onClick={() => setCount((c) => c + 1)}>
        Tăng count (trigger App re-render)
      </button>

      <hr style={{ margin: "24px 0" }} />

      <p style={{ fontSize: 13, color: "#888" }}>
        Bấm nút trên → App re-render, nhưng nếu Compiler hoạt động ✅{" "}
        <code>ExpensiveComponent</code> và <code>Item</code> sẽ <strong>không</strong> re-render
        (xem console).
      </p>

      <ExpensiveComponent data={ITEMS} onClick={handleClick} />
    </div>
  );
}

export default App;
