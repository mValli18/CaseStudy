using BookStoreApp.Models;

namespace BookStoreApp.Interfaces
{
    public interface IBookService
    {
        public Book Add(Book book);
        public Book Update(int BookId);
        public Book Delete(int BookId);
        public Book GetBook(int BookId);
        public IList<Book> GetAllBooks();
    }
}
