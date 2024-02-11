
using BookStoreApp.Interfaces;
using BookStoreApp.Models;
using BookStoreApp.Exceptions;
namespace BookStoreApp.Services
{
    public class BookService : IBookService
    {
        private readonly IBookService _bookService;
        private readonly IRepository<int, Book> repository;
        public BookService(IRepository<int, Book> _repository)
        {
            repository = _repository;

        }

        public Book Add(Book book)
        {
            var ress = repository.Add(book);
            if (ress != null)
                return book;


            throw new NotImplementedException();
        }

        public Book Delete(int BookId)
        {
            var book = repository.GetById(BookId);
            if (book != null)
            {
                repository.Delete(BookId);
                return book;

            }

            throw new NoSuchBooksAvailableException();
        }

        public Book GetBook(int BookId)
        {
            var book = repository.GetById(BookId);
            if (book != null)
                return book;

            throw new NoSuchBooksAvailableException();
        }

        public IList<Book> GetAllBooks()
        {
            return repository.GetAll();
            throw new NoBooksAvailableException();
        }

        public Book Update(int BookId)
        {
            var book = repository.GetById(BookId);
            if (book != null)
            {
                repository.Update(book);
                return book;
            }
            return null;
            throw new NoSuchBooksAvailableException();
        }
    }
}
