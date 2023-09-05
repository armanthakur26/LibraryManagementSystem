using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagementSystemTask.Models
{
    public class User
    {
        public int Id { get; set; } 
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Mobile { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public bool Blocked { get; set; } = false;
        public bool Active { get; set; } = true;
        public float Fine { get; set; } = 0;

        public UserType UserType { get; set; }
        public DateTime CreatedOn { get; set; }
        [NotMapped]
        public string token { get; set; } = string.Empty;
    }
}
