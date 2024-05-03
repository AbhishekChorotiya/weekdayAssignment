import JobPosts from "./components/JobPosts";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <div className="main">
        <JobPosts />
      </div>
    </Provider>
  );
}

export default App;
