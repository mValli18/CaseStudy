import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [iSBN, setISBN] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const clickAdd = () => {
    // Check if required fields are provided
    if (!title || !author || !description || !genre || !iSBN || !publishDate) {
      alert("All fields are required.");
      return;
    }

    const book = {
      title: title,
      author: author,
      description: description,
      genre: genre,
      ISBN: iSBN,
      publishDate: new Date(publishDate),
      imageUrl: imageUrl,
    };

    fetch("http://localhost:7197/api/Book", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        alert("Book added successfully");
        navigate("/bookList");
      })
      .catch((e) => {
        alert("Please provide all values and ensure the ISBN is unique.");
        console.log(e);
      });
  };

  return (
    <div className="inputcontainer">
      <h1 className="alert alert-book">Book Details</h1>
      <div className="form-floating mb-3">
        <input
          id="titleInput"
          type="text"
          className="form-control"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="titleInput">Book Title</label>
      </div>

      <div className="form-floating mb-3">
        <input
          id="authorInput"
          type="text"
          className="form-control"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label htmlFor="authorInput">Author</label>
      </div>

      <div className="form-floating mb-3">
        <textarea
          id="descriptionInput"
          className="form-control"
          placeholder="Book Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="descriptionInput">Book Description</label>
      </div>

      <div className="form-floating mb-3">
        <input
          id="genreInput"
          type="text"
          className="form-control"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <label htmlFor="genreInput">Genre</label>
      </div>

      <div className="form-floating mb-3">
        <input
          id="ISBNInput"
          type="text"
          className="form-control"
          placeholder="ISBN"
          value={iSBN}
          onChange={(e) => setISBN(e.target.value)}
        />
        <label htmlFor="ISBNInput">ISBN</label>
      </div>

      <div className="form-floating mb-3">
        <input
          id="publishDateInput"
          type="date"
          className="form-control"
          placeholder="Publish Date"
          value={publishDate}
          onChange={(e) => setPublishDate(e.target.value)}
        />
        <label htmlFor="publishDateInput">Publish Date</label>
      </div>

      <div className="form-floating mb-3">
        <input
          id="imageUrlInput"
          type="text"
          className="form-control"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <label htmlFor="imageUrlInput">Image URL</label>
      </div>

      <button onClick={clickAdd} className="btn btn-primary">
        Add Book
      </button>
    </div>
  );
}

export default AddBook;
