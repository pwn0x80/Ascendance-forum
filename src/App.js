import { Login } from "./page";
// import NoteList from "./components/NotesList/NoteList";
import Home from "./page/home/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import loginCall from "./redux/apiCall";
import { useDispatch } from "react-redux";
import TopBar from "./components/topBar/TopBar";
import NoteList from "./page/noteList/NoteList"

import { updateStart, updateSuccess, updateError } from "./redux/userSlice";
function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateStart());
    loginCall(dispatch);
  }, []);
  console.log(process.env);
  return (
    <BrowserRouter>

      <TopBar />
      <Routes>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/" element={<Home />}></Route>
        <Route path="/:id" element={<NoteList />} />
        {/* <Route path="/:titleId" element={<NoteList />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
