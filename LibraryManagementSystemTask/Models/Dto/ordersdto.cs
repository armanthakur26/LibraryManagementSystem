using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagementSystemTask.Models.Dto
{
    public class ordersdto
    {

        public int Id { get; set; }

        public int bookId { get; set; }
        
     // public Books books { get; set; }
        public int userId { get; set; }
        
      //public User users { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime RetrunOn { get; set; }


        public int Count { get; set; }

        public bool IsApproved { get; set; }
    }
}
