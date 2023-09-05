using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagementSystemTask.Models
{
    public class Orders
    {
        public int Id { get; set; }
       
        public int bookId { get; set; }
        [ForeignKey("bookId")]
        public Books books { get; set; }
        public int userId { get; set; }
        [ForeignKey("userId")]
        public User users { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime RetrunOn { get; set; }


        public int Count { get; set; }

        public bool IsApproved { get; set; }
        public bool IsDeleted { get; set; }
    }
}
