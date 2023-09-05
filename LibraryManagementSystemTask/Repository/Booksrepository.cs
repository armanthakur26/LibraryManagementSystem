using LibraryManagementSystemTask.Data;
using LibraryManagementSystemTask.Models;
using LibraryManagementSystemTask.Repository.IRepository;

namespace LibraryManagementSystemTask.Repository
{
    public class Booksrepository : IBooks
    {
        private readonly ApplicationDbcontext _context;
        public Booksrepository(ApplicationDbcontext context)
        {
            _context = context;
        }
        public bool createBook(Books book)
        {
            _context.books.Add(book);
            return save();
        }

        public bool deleteBook(Books book)
        {
            _context.books.Remove(book);
           return save();
        }

        public Books GetBook(int bookid)
        {
            return _context.books.Find(bookid);
        }

        public ICollection<Books> GetBooks()
        {
            return _context.books.ToList();
        }

        public bool bookexist(int bookid)
        {
            return _context.books.Any(n => n.Id == bookid);
        }

        public bool bookexist(string booktitle)
        {
            return _context.books.Any(n => n.Title == booktitle);
        }

        public bool save()
        {
            return _context.SaveChanges() == 1 ? true : false;
        }

        public bool UpdateBook(Books book)
        {
            _context.books.Update(book);
            return save();
        }
    }

}
