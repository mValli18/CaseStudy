import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Books() {
    // State variables
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [titles, setTitles] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [genreFilter, setGenreFilter] = useState("All");
    const [authorFilter, setAuthorFilter] = useState("");
    const [titleFilter, setTitleFilter] = useState("");
  
    // Fetch books on component mount
    useEffect(() => {
      fetch("http://localhost:7197/api/Book", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(async (data) => {
          const bookData = await data.json();
          setBooks(bookData);
          setFilteredBooks(bookData);
  
          // Extract unique genres, titles, and authors from books
          const uniqueGenres = [...new Set(bookData.map((book) => book.genre))];
          setGenres(uniqueGenres);
  
          const uniqueTitles = [...new Set(bookData.map((book) => book.title))];
          setTitles(uniqueTitles);
  
          const uniqueAuthors = [...new Set(bookData.map((book) => book.author))];
          setAuthors(uniqueAuthors);
        })
        .catch((e) => {
          console.log(e);
        });
    }, []);
  
    // Apply filters based on genre, author, and title
    const applyFilters = () => {
      let filteredBookList = books.filter((book) => {
        // Apply genre filter
        if (genreFilter !== "All" && book.genre !== genreFilter) {
          return false;
        }
  
        // Apply author filter
        if (authorFilter.trim() !== "" && book.author !== authorFilter) {
          return false;
        }
  
        // Apply title filter
        if (titleFilter.trim() !== "" && book.title !== titleFilter) {
          return false;
        }
  
        return true;
      });
  
      setFilteredBooks(filteredBookList);
    };
  
    // Event handlers for filter changes
    const handleGenreChange = (event) => {
      setGenreFilter(event.target.value);
    };
  
    const handleAuthorChange = (event) => {
      setAuthorFilter(event.target.value);
    };
  
    const handleTitleChange = (event) => {
      setTitleFilter(event.target.value);
    };
  
    const handleResetFilters = () => {
      setGenreFilter("All");
      setAuthorFilter("");
      setTitleFilter("");
      setFilteredBooks(books);
    };
  
    useEffect(() => {
      applyFilters();
    }, [genreFilter, authorFilter, titleFilter]);
  
    return (
      <div style={{ padding: "20px" }}>
        <h1 style={{ color: "#4CAF50", textAlign: "center" }}>Books</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Genre filter component */}
          <div style={{ minWidth: "200px" }}>
            <Typography id="genre-filter" gutterBottom>
              Genre
            </Typography>
            <select value={genreFilter} onChange={handleGenreChange}>
              <option value="All">All</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
  
          {/* Author filter component */}
          <div style={{ minWidth: "200px" }}>
            <Typography id="author-filter" gutterBottom>
              Author
            </Typography>
            <select value={authorFilter} onChange={handleAuthorChange}>
              <option value="">All</option>
              {authors.map((author) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>
  
          {/* Title filter component */}
          <div style={{ minWidth: "200px" }}>
            <Typography id="title-filter" gutterBottom>
              Title
            </Typography>
            <select value={titleFilter} onChange={handleTitleChange}>
              <option value="">All</option>
              {titles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
  
          <Button
            variant="contained"
            onClick={handleResetFilters}
            style={{ width: '150px', height: '40px' }}
          >
            Reset Filters
          </Button>
        </div>
        <hr />
        {filteredBooks.length > 0 ? (
          <Grid container spacing={2}>
            {filteredBooks.map((book) => (
              <Grid key={book.bookId} item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {book.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Author: {book.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Genre: {book.genre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Description: {book.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ISBN: {book.isbn}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Publish Date: {book.publishDate}
                    </Typography>
                    {book.imageUrl && (
                    <img
                      src={book.imageUrl}
                      alt={`${book.title} Cover`}
                      style={{ maxWidth: '100%', marginTop: '10px' }}
                    />
                  )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <div style={{ textAlign: "center", color: "#555" }}>
            No books available with the current filters
          </div>
        )}
      </div>
    );
  }
  
  export default Books;
  