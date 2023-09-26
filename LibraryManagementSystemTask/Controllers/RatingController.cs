using LibraryManagementSystemTask.Data;
using LibraryManagementSystemTask.Models;
using LibraryManagementSystemTask.Repository;
using LibraryManagementSystemTask.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Reflection.Metadata.BlobBuilder;

namespace LibraryManagementSystemTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {

        private readonly IBookrating _bookrating;
        private readonly ApplicationDbcontext _context;
        public RatingController(IBookrating bookrating, ApplicationDbcontext context)
        {
            _bookrating = bookrating;
            _context = context;
        }

        //[HttpPost]
        //public IActionResult createrating([FromBody] Booksrating booksrating)
        //{
        //    var rating = _bookrating.createrating(booksrating);
        //    return Ok(rating);
        //}
        [HttpPost]
        public IActionResult createrating(Booksrating bookrating)
        {
            var existingRating = _context.booksratings
                .FirstOrDefault(r => r.bookId == bookrating.bookId && r.userId == bookrating.userId);
            if (existingRating != null)
            {
                existingRating.BooksratingValue = bookrating.BooksratingValue;
                _context.booksratings.Update(existingRating);
            }
            else
            { _context.booksratings.Add(bookrating); }
            _context.SaveChanges();
            return Ok("done");
        }

        [HttpGet]
        public IActionResult Getratings()
        {
            var bookslist = _bookrating.Getratings().ToList();
            return Ok(bookslist);
        }

        [HttpGet("{id:int}", Name = "Getratingbyid")]
        public IActionResult Getrating(int id)
        {

            var getratingbyid = _bookrating.GetRating(id);
            return Ok(getratingbyid);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _context.booksratings.FindAsync(id);
            _context.booksratings.Remove(deleted);
            await _context.SaveChangesAsync();
            return Ok("data delete");
        }
        [HttpPut]
        public IActionResult update([FromBody] Booksrating booksrating)
        {
            var up=_bookrating.Updaterating(booksrating);
            return Ok(up);

        }

        [HttpGet("Bookid/{bookId}")]
        public IActionResult GetBookRatings(int bookId)
        {
            var bookRatings = _bookrating.GetratingsByBookId(bookId);
            return Ok(bookRatings);
        }
        [HttpGet("UserId/{userId}")]
        public IActionResult GetBookRatingsbyuserid(int userId)
        {
            var bookRatings = _bookrating.GetratingsByUserId(userId);
            return Ok(bookRatings);
        }

        [HttpGet("BookidUserId/{bookId}")]
        public IActionResult GetratingsByBookidanduserid(int bookId,int userId)
        {
            var bookRatings = _bookrating.GetratingsByBookidanduserid(bookId,userId);
            return Ok(bookRatings);
        }
    }
}
