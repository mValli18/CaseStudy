using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using BookStoreApp.Exceptions;
using BookStoreApp.Interfaces;
using BookStoreApp.Models;

namespace BookStoreApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }
        [HttpGet]
        public ActionResult GetAllBooks()
        {
            string errorMessage = string.Empty;
            try
            {
                var result = _bookService.GetAllBooks();
                return Ok(result);
            }
            catch (NoBooksAvailableException e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }
        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public ActionResult Create(Book book)
        {
            string errorMessage = string.Empty;
            try
            {
                var result = _bookService.Add(book);
                return Ok(result);
            }
            catch (Exception e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [Route("RemoveBook")]
        public ActionResult RemoveBook(int BookId)
        {
            string errorMessage = string.Empty;
            try
            {
                var result = _bookService.Delete(BookId);
                return Ok(result);
            }
            catch (Exception e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }
        [HttpPost]
        [Route("ViewBook")]
        public ActionResult ViewBook(int BookId)
        {
            string errorMessage = string.Empty;
            try
            {
                var result = _bookService.GetBook(BookId);
                return Ok(result);
            }
            catch (Exception e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }
    }
}
