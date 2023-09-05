using LibraryManagementSystemTask.Data;
using LibraryManagementSystemTask.Models;
using LibraryManagementSystemTask.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystemTask.Controllers
{
    [Route("api/Books")]
    [ApiController]
   
    public class BooksController : ControllerBase
    {
        private readonly IBooks _books;
        public BooksController(IBooks books)
        {
            _books = books;
        }
        [HttpGet]
        public IActionResult GetBooks()
        {
            var bookslist = _books.GetBooks().Where(books => !books.IsDeleted).ToList();
            return Ok(bookslist);
        }
        [HttpPost]
        public IActionResult createBook([FromBody] Books books)
        {
            var createbook = _books.createBook(books);
            return Ok(createbook);

        }
        [HttpGet("{bookid:int}", Name = "GetBook")]
        public IActionResult GetBook(int bookid)
        {
            var book = _books.GetBook(bookid);
            if (book == null) return NotFound();
            var getbookbyid = _books.GetBook(bookid);
            return Ok(getbookbyid);
        }
        [HttpPut]
        public IActionResult UpdateBook([FromBody] Books books)
        {
            //if (books == null) return BadRequest(ModelState);
            //if (!_books.Booksexists(books.id)) return NotFound();
            //if (!ModelState.IsValid) return BadRequest(ModelState);

            //if (!_books.UpdateBooks(books))
            //{
            //    ModelState.AddModelError("", $"something went wrong while save data:{books.Title}");
            //    return StatusCode(StatusCodes.Status500InternalServerError);
            //}
            //return NoContent();

            if (books == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest();
            _books.UpdateBook(books);
            _books.save();
            return Ok();
        }
        [HttpDelete("{bookid:int}")]
        public IActionResult DeleteBooks(int bookid)
        {
            if (!_books.bookexist(bookid)) return NotFound();
            var delbook = _books.GetBook(bookid);
            if (delbook == null) return NotFound();
            if (!_books.deleteBook(delbook))
            {
                ModelState.AddModelError("", $"Some thing went wrong while data:{delbook}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok();
        }
    }
}
