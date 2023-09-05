using LibraryManagementSystemTask.Models;
using System.Diagnostics;

namespace LibraryManagementSystemTask.Repository.IRepository
{
    public interface IOrdersRepository
    {
        //Task<IEnumerable<Orders>> GetAllOrdersAsync();
        //Task<Orders> GetOrderByIdAsync(int id);
        //Task AddOrderAsync(Orders order);
        //Task UpdateOrderAsync(Orders order);
        //Task DeleteOrderAsync(int id);
        //Orders Addorder(Orders order);
        //IEnumerable<Orders> GetAll();
        ICollection<Orders> Getorder();
        ICollection<Orders> GetMyOrder(int userid);
        ICollection<Orders> GetTrailsInuserBookid(int userBookid);
        Orders GetTrail(int orderid);

        bool trailexists(int orderid);
        
        bool createtrail(Orders order);
        bool updatetrail(Orders order);
        bool deletetrail(Orders order);
        bool save();
    }
}
