import ListBasics from './Tier_06/ListBasics';
import CreateItem from './Tier_06/CreateItem';
import DeleteItem from './Tier_06/DeleteItem';
import UpdateItem from './Tier_06/UpdateItem';

function App() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>Thực hành Tier 6 - Lists & CRUD</h1>
      <hr style={{ marginBottom: "30px" }} />
      
      <ListBasics />
      <CreateItem />
      <DeleteItem />
      <UpdateItem />
      
    </div>
  );
}

export default App;