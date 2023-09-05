using LibraryManagementSystemTask.Models;

namespace LibraryManagementSystemTask.Repository.IRepository
{
    public interface IBooks
    {
        ICollection<Books> GetBooks();           //display
        Books GetBook(int bookid);   //find
        bool bookexist(int bookid);
        bool bookexist(string booktitle);
        bool createBook(Books book);
        bool UpdateBook(Books book);
        bool deleteBook(Books book);
        bool save();
    }
}
