// import React from "react";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBook() {
  const [data, setData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
  });
  const { id } = useParams();
  let navigate = useNavigate();
  function handleChange(e) {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
    // console.log(data);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/books/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      alert("Book edited successfully");
      navigate("/book-list");
    } catch (err) {
      alert("Failed to edit book");
    }
  }
  async function getApiData() {
    let response = await fetch("http://localhost:3000/books/" + id);
    response = await response.json();
    setData(response);
  }
  useEffect(() => {
    getApiData();
  }, []);
  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="w-50">
        <form onSubmit={handleSubmit} className="forms-sample">
          <div className="form-group row">
            <div className="col-md-6">
              <label htmlFor="title">Title</label>
              <input
                required
                type="text"
                id="title"
                name="title"
                value={data.title}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="author">Author</label>
              <input
                required
                type="text"
                id="author"
                name="author"
                value={data.author}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="genre">Genre</label>
              <input
                required
                type="text"
                id="genre"
                name="genre"
                value={data.genre}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="year">Year</label>
              <input
                required
                type="date"
                id="year"
                name="year"
                value={data.year}
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            className="form form-control w-100 btn btn-success mt-3"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
