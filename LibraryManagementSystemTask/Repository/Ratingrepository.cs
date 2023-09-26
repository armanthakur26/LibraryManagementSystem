using LibraryManagementSystemTask.Data;
using LibraryManagementSystemTask.Models;
using LibraryManagementSystemTask.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Net;

namespace LibraryManagementSystemTask.Repository
{
    public class Ratingrepository : IBookrating
    {
        private readonly ApplicationDbcontext _context;
        public Ratingrepository(ApplicationDbcontext context)
        {
            _context=context;
        }
        public bool createrating(Booksrating bookrating)
        {
          _context.booksratings.Add(bookrating);
            return save();
        }



        public Booksrating GetRating(int id)
        {
            return _context.booksratings.Include(t => t.users).Include(t => t.book).FirstOrDefault(r => r.id == id);
        }

        public ICollection<Booksrating> Getratings()
        {
            return _context.booksratings.Include(t => t.users).Include(t => t.book).ToList();
        }

        public bool save()
        {
            return _context.SaveChanges() == 1 ? true : false;
        }

        public bool Updaterating(Booksrating bookrating)
        {
            _context.booksratings.Update(bookrating);
            return save();
        }
        public ICollection<Booksrating> GetratingsByBookId(int bookId)
        {
            return _context.booksratings.Include(t => t.users).Include(t => t.book) .Where(r => r.bookId == bookId).ToList();
        }

        public ICollection<Booksrating> GetratingsByBookidanduserid(int bookId,int userId)
        {
            return _context.booksratings.Include(t => t.users).Include(t => t.book).Where(r => r.bookId == bookId).Where(r=>r.userId==userId).ToList();
        }

        public ICollection<Booksrating> GetratingsByUserId(int userId)
        {
            return _context.booksratings.Include(t => t.users).Include(t => t.book).Where(r => r.userId == userId).ToList();
        }
    }
}
