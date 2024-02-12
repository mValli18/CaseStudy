using System.ComponentModel.DataAnnotations;

namespace BookStoreApp.Models
{
    public class Book
    {
        [Key]
        public int BookId { get; set; }
        public String Author { get; set; }

        [Required(ErrorMessage = "Can You Please Provide the Title of Your Book")]
        public string Title { get; set; }
        public string Description { get; set; }
        
        public string Genre { get; set; }
        public string ISBN { get; set; }
        public DateTime PublishDate { get; set; }
        public string ImageUrl { get; set; }

    }
}

