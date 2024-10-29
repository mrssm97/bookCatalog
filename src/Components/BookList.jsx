// import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookList() {
  const [books, setBooks] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  async function getApiData() {
    try {
      let response = await fetch("http://localhost:3000/books");

      response = await response.json();
      setBooks(response);
      setIsLoading(false);
      console.log("data fetched successfully");
    } catch (err) {
      console.log(err);
    }
  }
  function handleEdit(id) {
    navigate("/edit-book/" + id);
  }
  async function handleDelete(id) {
    try {
      await fetch(`http://localhost:3000/books/${id}`, {
        method: "Delete",
      });

      let response = await fetch("http://localhost:3000/books");

      response = await response.json();
      setBooks(response);
      setIsLoading(false);
      alert("Book Deleted Successfully");
    } catch (err) {
      alert("Failed to Delete Book");
    }
  }
  function handleLogout(e) {
    navigate("/");
    localStorage.setItem("login", "false");
  }
  useEffect(() => {
    getApiData();
    console.log("useEffect");
  }, [books.length]);
  console.log(books);

  return (
    <>
      <div
        className={`d-flex justify-content-center ${
          isLoading ? "" : "d-none"
        } align-items-center loader-wrapper`}
      >
        <span className={`loader `}></span>
      </div>
      <div className={`book-list container fluid ${isLoading ? "d-none" : ""}`}>
        <div className="addButton bg-danger text-white p-3">
          <h2 className="text-white">Books</h2>

          <button className="btn btn-outline text-white" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="table-responsive table-wrapper">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Year</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => {
                return (
                  <tr key={book.id}>
                    <td>{book.title} </td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.year}</td>
                    <td>
                      <button
                        className="btn btn-outline"
                        onClick={() => handleEdit(book.id)}
                      >
                        <i className="fa fa-edit text-success"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline"
                        onClick={() => handleDelete(book.id)}
                      >
                        <i className="fa fa-trash text-danger"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button
          className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
          onClick={() => navigate("/add-book")}
        >
          <i className="fa fa-add me-3"></i> Add Book
        </button>
      </div>
    </>
  );
}
