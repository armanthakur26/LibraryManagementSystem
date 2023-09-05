using LibraryManagementSystemTask.Repository.IRepository;
using LibraryManagementSystemTask.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using LibraryManagementSystemTask.Models.Dto;
using AutoMapper;
using System.Diagnostics;
using LibraryManagementSystemTask.Data;

namespace LibraryManagementSystemTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrdersRepository _orderrepository;
        private readonly IMapper _mapper;
        public readonly IBooks _books;
        public readonly ApplicationDbcontext _context;

        public OrdersController(IOrdersRepository orderrepository, IMapper mapper, IBooks books,ApplicationDbcontext context)
        {
            _orderrepository = orderrepository;
            _mapper = mapper;
            _books = books;
            _context = context;
        }

        [HttpGet]
        public IActionResult Gettrails()
        {
            // return Ok(_orderrepository.Getorder().Select(_mapper.Map<Orders, ordersdto>));
            var bookslist = _orderrepository.Getorder().Where(order => !order.IsDeleted).ToList();
            return Ok(bookslist);
        }

        [HttpGet("GetOrderByUser/{id:int}", Name = "GetOrderByUser")]
        public IActionResult Getmyorders(int id)
        {
            var myorderlist = _orderrepository.GetMyOrder(id)
                                           .Where(order => !order.IsDeleted)
                                           .ToList();

            return Ok(myorderlist);
        }

        [HttpGet("myreadoutbooks/{id:int}", Name = "myreadoutbooks")]
        public IActionResult myreadoutbooks(int id)
        {

            var myorderlist = _orderrepository.GetMyOrder(id).Where(order => order.IsDeleted).ToList();
            return Ok(myorderlist);
        }



        [HttpGet("{id}")]
        public IActionResult GetOrder(int id)
        {
            var order = _orderrepository.GetTrail(id);
            if (order == null)
            {
                return NotFound();
            }

            var orderDto = new ordersdto
            {
                Id = order.Id,
                bookId = order.bookId,
                userId = order.userId,
                CreatedOn = order.CreatedOn,
                RetrunOn = order.RetrunOn,
                Count = order.Count,
                IsApproved = order.IsApproved
            };

            return Ok(orderDto);
        }


        [HttpPost]
        public IActionResult CreateOrder(ordersdto orderDto)
        {
            if (ModelState.IsValid)
            {
              //dto say data ko modal mai convert kiya 
                var order = new Orders
                {
                    Id = orderDto.Id,
                    bookId = orderDto.bookId,
                    userId = orderDto.userId,
                    CreatedOn = orderDto.CreatedOn,
                    RetrunOn = orderDto.RetrunOn,
                    Count = orderDto.Count,
                    IsApproved = orderDto.IsApproved
                };

                if (_orderrepository.createtrail(order))
                {
                   
                    return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, orderDto);
                }

                return BadRequest();
            }

            return BadRequest(ModelState);
        }


        [HttpPut("{id}")]
        public IActionResult UpdateOrder(int id, ordersdto orderDto)
        {
            if (id != orderDto.Id || !ModelState.IsValid)
            {
                return BadRequest();
            }

            var order = _orderrepository.GetTrail(id);
            if (order == null)
            {
                return NotFound();
            }

            //order.bookId = orderDto.bookId;
            //order.userId = orderDto.userId;
            //order.CreatedOn = orderDto.CreatedOn;
            //order.RetrunOn = orderDto.RetrunOn;
            //order.Count = orderDto.Count;
            order.IsApproved = orderDto.IsApproved;

            if (_orderrepository.updatetrail(order))
            {
                return NoContent();
            }

            return BadRequest();
        }
        //[HttpPut("{id}")]
        //public IActionResult UpdateOrder(int id, ordersdto orderDto)
        //{
        //    if (id != orderDto.Id || !ModelState.IsValid)
        //    {
        //        return BadRequest();
        //    }

        //    var order = _orderrepository.GetTrail(id);
        //    if (order == null)
        //    {
        //        return NotFound();
        //    }

        //    order.bookId = orderDto.bookId;
        //    order.userId = orderDto.userId;
        //    order.CreatedOn = orderDto.CreatedOn;
        //    order.RetrunOn = orderDto.RetrunOn;
        //    order.Count = orderDto.Count;
        //    order.IsApproved = orderDto.IsApproved;
        //    var minus = _books.GetBook(order.bookId);
        //    if (minus != null)
        //    {
        //        minus.AvilableQuantity--;
        //        _books.UpdateBook(minus);
        //    }

        //    if (_orderrepository.updatetrail(order))
        //    {
        //        return NoContent();
        //    }

        //    return BadRequest();
        //}
        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var order = _orderrepository.GetTrail(id);
            if (order == null)
            {
                return NotFound();
            }

            if (_orderrepository.deletetrail(order))
            {

                return NoContent();
            }

            return BadRequest();
        }

        //[HttpDelete("{id}")]
        //public IActionResult DeleteOrder(int id)
        //{
        //    var order = _orderrepository.GetTrail(id);
        //    if (order == null)
        //    {
        //        return NotFound();
        //    }

        //    var add = _books.GetBook(order.bookId);
        //    if (add != null)
        //    {
        //        add.AvilableQuantity++;
        //        _books.UpdateBook(add);
        //    }
        //    if (_orderrepository.deletetrail(order))
        //    {

        //        return NoContent();
        //    }

        //    return BadRequest();
        //}


    }
}
