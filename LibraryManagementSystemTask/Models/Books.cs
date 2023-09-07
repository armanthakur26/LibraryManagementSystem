
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagementSystemTask.Models
{
    public class Books
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public float Price { get; set; } = 0;
        public bool Ordered { get; set; } = false;
        public string Image { get; set; }
        public int Quantity { get; set; } = 0;
        public bool IsDeleted { get; set; }
    }
}
