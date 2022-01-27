import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
import ExerciseList from "./components/exercies-list";
import EditExercises from "./components/edit-exercise";
import CreateExercises from "./components/create-exercise";
import CreateUser from "./components/create-user";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Routes>
          <Route path="/" element={<ExerciseList />}></Route>
          <Route path="/edit/:id" element={<EditExercises />}></Route>
          <Route path="/create" element={<CreateExercises />}></Route>
          <Route path="/user" element={<CreateUser />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
