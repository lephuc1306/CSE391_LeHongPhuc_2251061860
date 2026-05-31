import ClickEvents from './Tier_05/ClickEvents';
import InputEvents from './Tier_05/InputEvents';
import KeyboardEvents from './Tier_05/KeyboardEvents';
import FormEvents from './Tier_05/FormEvents';

function App() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>Thực hành Tier 5 - Events</h1>
      <hr style={{ marginBottom: "30px" }} />
      
      <ClickEvents />
      <InputEvents />
      <KeyboardEvents />
      <FormEvents />
      
    </div>
  );
}

export default App;