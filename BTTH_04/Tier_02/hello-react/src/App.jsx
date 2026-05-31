import SimpleVariables from './SimpleVariables';
import TernaryDemo from './TernaryDemo';
import AndDemo from './AndDemo';
import ListRendering from './ListRendering';
import Challenge1 from './Challenge1';
import Challenge2 from './Challenge2';
import Challenge3 from './Challenge3';


function App() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>Tổng hợp Tier 2 - Biến trong JSX</h1>
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ color: "#2980b9", borderBottom: "2px solid #2980b9", paddingBottom: "10px" }}>
          Phần 1: Bài tập thực hành
        </h2>
        <SimpleVariables />
        <TernaryDemo />
        <AndDemo />
        <ListRendering />
      </div>
      
      <div style={{ marginTop: "40px" }}>
        <h2 style={{ color: "#e67e22", borderBottom: "2px solid #e67e22", paddingBottom: "10px" }}>
          Phần 2: Thử thách
        </h2>
        <Challenge1 />
        <Challenge2 />
        <Challenge3 />
      </div>

    </div>
  );
}

export default App;