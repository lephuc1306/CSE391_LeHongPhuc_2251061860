import LifecycleDemo from "./LifecycleDemo";
import BadCounter from "./BadCounter";
import GoodCounter from "./GoodCounter";
import FlowDemo from "./FlowDemo";

function App() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Thực hành Tier 1 - Luồng hoạt động React</h1>
      <hr style={{ marginBottom: "30px" }} />
      
      <LifecycleDemo />
      <BadCounter />
      <GoodCounter />
      <FlowDemo />
      
    </div>
  );
}

export default App;