import NumberState from './Tier_04/NumberState';
import StringState from './Tier_04/StringState';
import BooleanState from './Tier_04/BooleanState';
import MultipleStates from './Tier_04/MultipleStates';

function App() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Thực hành Tier 4 - useState</h1>
      <hr style={{ marginBottom: "30px" }} />
      
      <NumberState />
      <StringState />
      <BooleanState />
      <MultipleStates />
      
    </div>
  );
}

export default App;