using LibraryManagementSystemTask.Data;
using LibraryManagementSystemTask.Models;
using LibraryManagementSystemTask.Models.Dto;
using LibraryManagementSystemTask.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace LibraryManagementSystemTask.Repository
{
    public class OrdersRepository:IOrdersRepository
    {
        private readonly ApplicationDbcontext _context;

        public OrdersRepository(ApplicationDbcontext context)
        {
            _context = context;
        }

        public bool createtrail(Orders order)
        {
            _context.Allorders.Add(order);
            return save();
        }

        public bool deletetrail(Orders order)
        {
            _context.Allorders.Remove(order);
            return save();
        }

        public ICollection<Orders> GetMyOrder(int userid)
        {
         return _context.Allorders.Include(t => t.books).Include(t => t.users).Where(x=>x.userId==userid).ToList();
        }

        public ICollection<Orders> Getorder()
        {
             return _context.Allorders.Include(t => t.books).Include(t => t.users).ToList();
            //return _context.Allorders
            //       .Include(o => o.books) // Include the related Books entity
            //       .Include(o => o.users) // Include the related User entity
            //       .ToList();
        }

        public Orders GetTrail(int orderid)
        {
            return _context.Allorders.Find(orderid);
        }
        public ICollection<Orders> GetTrailsInuserBookid(int userBookid)
        {
            return _context.Allorders.Include(t => t.userId).Include(t => t.bookId).Where(n => n.Id == userBookid).ToList();
        }

        public bool save()
        { 
            return _context.SaveChanges() == 1 ? true : false;
        }

        public bool trailexists(int orderid)
        {
            return _context.Allorders.Any(t => t.Id == orderid);
        }

        public bool updatetrail(Orders order)
        {

            _context.Allorders.Update(order);
            return save();
        }
    }
}
