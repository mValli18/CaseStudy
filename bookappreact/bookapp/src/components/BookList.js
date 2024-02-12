import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Book.css";

function BookList() {
  const [bookList, setBookList] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    fetch("http://localhost:7197/api/Book", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(async (data) => {
        var myData = await data.json();
        console.log(myData);
        setBookList(myData);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDeleteBook = async (bookId) => {
    if (role !== "Admin") {
      alert("You don't have access to this page");
      navigate("/books");
    } else {
      const userConfirmed = window.confirm(
        `Do you really want to delete the book with ID ${bookId}?`
      );

      if (userConfirmed) {
        navigate("/deletebook", { state: { bookId } });
      }
    }
  };

  const handleUpdateBook = (book) => {
    navigate("/updatebook", { state: book });
  };

  const handleAddBook = () => {
    navigate("/addbook");
  };

  return (
    <div className="book">
      <h1 className="alert alert-book">Books</h1>
      {role === "Admin" && (
        <button className="btn btn-primary" onClick={handleAddBook}>
          Add Book
        </button>
      )}
      <hr className="line" />
      {bookList.length > 0 ? (
        <div>
          {bookList.map((book) => (
            <div key={book.bookId} className="alert alert-book">
              Book Id: {book.bookId}
              <br />
              Title: {book.title}
              <br />
              Author: {book.author}
              <br />
              Description: {book.description}
              <br />
              Genre: {book.genre}
              <br />
              ISBN: {book.iSBN}
              <br />
              Publish Date: {new Date(book.PublishDate).toDateString()}
              <br />
              {role === "Admin" && (
                <>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-update"
                    onClick={() => handleUpdateBook(book)}
                  >
                    Update
                  </button>
                  {/* Add any additional actions for the book */}
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>No books available yet</div>
      )}
    </div>
  );
}

export default BookList;
