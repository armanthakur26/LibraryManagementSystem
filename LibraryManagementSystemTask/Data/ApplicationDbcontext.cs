using LibraryManagementSystemTask.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystemTask.Data
{
    public class ApplicationDbcontext:DbContext
    {
        public ApplicationDbcontext(DbContextOptions<ApplicationDbcontext> options) : base(options)
        { }
        public DbSet<Books> books { get; set; }
        public DbSet<User> users { get; set; }  
       public DbSet<Orders> Allorders { get; set; }


        public override int SaveChanges()
        {
            foreach (var entry in ChangeTracker.Entries().Where(e => e.State == EntityState.Deleted))
            {

                entry.State = EntityState.Modified;
                entry.CurrentValues.SetValues(new { IsDeleted = true });
            }

            return base.SaveChanges();
        }
    }
}
