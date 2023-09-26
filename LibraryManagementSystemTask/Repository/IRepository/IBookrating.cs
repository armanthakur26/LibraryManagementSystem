using LibraryManagementSystemTask.Models;

namespace LibraryManagementSystemTask.Repository.IRepository
{
    public interface IBookrating
    {

        ICollection<Booksrating> Getratings();
        Booksrating GetRating(int id);
        bool createrating(Booksrating bookrating);
        bool Updaterating(Booksrating bookrating);
        bool save();
        ICollection<Booksrating> GetratingsByBookId(int bookId);
        ICollection<Booksrating> GetratingsByUserId(int userId);
        ICollection<Booksrating> GetratingsByBookidanduserid(int bookId,int userId);
    }
}
