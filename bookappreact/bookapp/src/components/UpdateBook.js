import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UpdateBook() {
  const location = useLocation();
  const [book, setBook] = useState(location.state || {});
  const { BookId, Title, Author, Description, Genre, ISBN, PublishDate } = book;
  const navigate = useNavigate();

  const clickUpdate = () => {
    if (!BookId) {
      alert('Book ID is required for updating.');
      return;
    }
    const token = localStorage.getItem("token");

    const updatedBook = {
      BookId,
      Title,
      Author,
      Description,
      Genre,
      ISBN,
      PublishDate,
    };

    axios.put("http://localhost:5252/api/Book/update", updatedBook, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(() => {
      alert('Book Updated');
      navigate("/bookList");
    })
    .catch((e) => {
      if(e.response.data.title === "One or more validation errors occurred."){
        alert('Please check the data.');
      }
      console.log(e);
    });
  };

  return (
    <div className="inputcontainer">
      <h1 className="alert alert-book">Update Book</h1>
      <div className="form-floating mb-3">
        <input id="floatingInput" type="number" className="form-control" placeholder="Book ID" value={BookId} readOnly />
        <label htmlFor="floatingInput">Book ID</label>
      </div>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingInput" placeholder="Book Title" value={Title} onChange={(e) => setBook({ ...book, Title: e.target.value })} />
        <label htmlFor="floatingInput">Book Title</label>
      </div>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingInput" placeholder="Author" value={Author} onChange={(e) => setBook({ ...book, Author: e.target.value })} />
        <label htmlFor="floatingInput">Author</label>
      </div>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingInput" placeholder="Description" value={Description} onChange={(e) => setBook({ ...book, Description: e.target.value })} />
        <label htmlFor="floatingInput">Description</label>
      </div>
      <div className="form-floating mb-3">
        <input id="floatingInput" type="text" className="form-control" placeholder="Genre" value={Genre} onChange={(e) => setBook({ ...book, Genre: e.target.value })} />
        <label htmlFor="floatingInput">Genre</label>
      </div>
      <div className="form-floating mb-3">
        <input id="floatingInput" type="text" className="form-control" placeholder="ISBN" value={ISBN} onChange={(e) => setBook({ ...book, ISBN: e.target.value })} />
        <label htmlFor="floatingInput">ISBN</label>
      </div>
      <div className="form-floating mb-3">
        <input id="floatingInput" type="text" className="form-control" placeholder="Publication Date" value={new Date(PublishDate).toDateString()} readOnly />
        <label htmlFor="floatingInput">Publication Date</label>
      </div>
      <button onClick={clickUpdate} className="btn btn-primary">Update Book</button>
    </div>
  );
}

export default UpdateBook;
