using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagementSystemTask.Models
{
    public class Booksrating
    {
        public int id { get; set; }
        public BooksratingValue BooksratingValue { get; set; }
        public int bookId { get; set; }
        [ForeignKey("bookId")]
        public Books? book { get; set; }
        public int userId { get; set; }
        [ForeignKey("userId")]
        public User? users { get; set; } 
    }
}
