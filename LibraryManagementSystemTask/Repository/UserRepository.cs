using LibraryManagementSystemTask.Data;
using LibraryManagementSystemTask.Models;
using LibraryManagementSystemTask.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace LibraryManagementSystemTask.Repository
{
    public class UserRepository : Iuser
    {
        private readonly ApplicationDbcontext _context;
        private readonly Appsettings _appsettings;
        public UserRepository(ApplicationDbcontext context, IOptions<Appsettings> appsettings)
        {
            _context = context;
            _appsettings = appsettings.Value;
        }
        //public User UpdateUser(User user)
        //{

        //    _context.users.Update(user);
        //    return (user);

        //}

        public User UpdateUser(User user)
        {
            var existingUser = _context.users.FirstOrDefault(u => u.Id == user.Id);

            if (existingUser != null)
            {
                existingUser.UserType = user.UserType;
                existingUser.Blocked = user.Blocked;
                _context.SaveChanges();
            }

            return existingUser;
        }

        public bool save()
        {
            return _context.SaveChanges() == 1 ? true : false;
        }
        public ICollection<User> GetUser()
        {
            return _context.users.ToList();
        }

        public User authenticate(string username, string password)
        {
            var userindb = _context.users.FirstOrDefault(u => u.Email == username && u.Password == password);
            if (userindb == null) return null;
            //jwt
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appsettings.Secret);
            var tokendescritor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name,userindb.Id.ToString()),
                    new Claim(ClaimTypes.Role,userindb.UserType.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokendescritor);
            userindb.token = tokenHandler.WriteToken(token);
            userindb.Password = "";
            return userindb;
        }

        public bool IsUniqueUser(string username)
        {
            var userindb = _context.users.FirstOrDefault(u => username == username);
            if (userindb == null) return true;
            return false;
        }

        //public static string HashPassword(string password)
        //{
        //    using (var sha256 = SHA256.Create())
        //    {
        //        var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        //        var hash = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
        //        return hash;
        //    }

        //}
        //public User setPassword(User user)
        //{
        //    var userInDb = _context.users.FirstOrDefault(u => u.Id == user.Id);
        //    if (userInDb != null)
        //    {
        //        userInDb.Password = HashPassword(user.Password);
        //    }

        //    _context.SaveChanges();
        //    return user;
        //}
        public bool register(User user)
        {
            _context.users.Add(user);
            return save();
        }

        public static string Encryption(string password)
        {
            if (string.IsNullOrEmpty(password))
                return null;
            else
            {
                byte[] storepassword = Encoding.ASCII.GetBytes(password);
                string encryption = Convert.ToBase64String(storepassword);
                return encryption;
            }
        }
        public User UpdateRegister(User userTable)
        {

            var find = _context.users.FirstOrDefault(s => s.Id == userTable.Id);
            if (find != null)
                find.Password = userTable.Password;
          

            _context.users.Update(find);
            _context.SaveChanges();
            return find;

        }

        public User GetUser(int userid)
        {
            return _context.users.Find(userid);
        }
    }
}

