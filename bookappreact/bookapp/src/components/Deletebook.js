import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function DeleteBook() {
  const location = useLocation();
  const bookId = location.state && location.state.bookId;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const clickDelete = async () => {
      if (!bookId) {
        alert("BookId is required for deleting.");
        return;
      }

      try {
        await axios.delete(`http://localhost:7197/api/Book/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        alert("Book Deleted Successfully");
        navigate("/booklist");
      } catch (error) {
        console.log(error);
        alert(`Error deleting book with ID ${bookId}. Please try again.`);
      }
    };

    // Execute deletion logic upon mounting
    clickDelete();
  }, [bookId]); // Only run the effect when bookId changes

  return (
    <div className="inputcontainer">
      <h1 className="alert alert-book">Delete Book</h1>
      <label className="form-control" htmlFor="bookId">
        Book ID: {bookId}
      </label>
    </div>
  );
}

export default DeleteBook;
