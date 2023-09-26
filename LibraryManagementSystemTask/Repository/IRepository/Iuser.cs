
using LibraryManagementSystemTask.Models;

namespace LibraryManagementSystemTask.Repository.IRepository
{
    public interface Iuser
    {
        ICollection<User> GetUser();
        User UpdateUser(User user);
        bool save();
      
        bool IsUniqueUser(string username);
        User authenticate(string username, string password);
      //  User setPassword(User user);
        bool register(User user);
        User UpdateRegister(User user);
        User GetUser(int userid);
    }
}
