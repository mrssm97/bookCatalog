import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookList from "./Components/BookList";
import BookAdd from "./Components/BookAdd";
import EditBook from "./Components/EditBook";
import Login from "./Components/Login";
// import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/book-list"
            element={
              localStorage.getItem("login") === "true" ? (
                <BookList />
              ) : (
                <Login />
              )
            }
          />
          <Route path="/add-book" element={<BookAdd />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
