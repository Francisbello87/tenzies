import Die from "./components/Die";
import "./main.css";
import data from "./data";

function App() {
  const values = data.map((value) => {
    return <Die key={value.id} {...value} />;
  });
  return (
    <main>
      <div className="die">{values}</div>
    </main>
  );
}

export default App;
