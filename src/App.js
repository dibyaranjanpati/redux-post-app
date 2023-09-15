import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";

function App() {
  return (
    <>
      <Routes>
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/" element={<Posts />} />
      </Routes>
    </>
  );
}

export default App;
