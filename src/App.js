import Select from "react-select";
import makeAnimated from "react-select/animated";
import JobPosts from "./components/JobPosts";
const animatedComponents = makeAnimated();
function App() {
  return (
    <div className="main">
      <JobPosts />
    </div>
  );
}

export default App;
