import Layout from "components/layout";
import ToDo from "sections/todo/view";
import "style/global.css";

function App() {
  return (
    <div>
      <Layout>
        <ToDo />
      </Layout>
    </div>
  );
}

export default App;
