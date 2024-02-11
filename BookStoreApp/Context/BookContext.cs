using BookStoreApp.Models;
using Microsoft.EntityFrameworkCore;
namespace BookStoreApp.Context
{
    public class BookContext : DbContext
    {
        public BookContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Book> Books { get; set; }


    }
}

