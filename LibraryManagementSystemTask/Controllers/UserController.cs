using LibraryManagementSystemTask.Data;
using LibraryManagementSystemTask.Models;
using LibraryManagementSystemTask.Models.ViewModels;
using LibraryManagementSystemTask.Repository;
using LibraryManagementSystemTask.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Win32;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using static System.Reflection.Metadata.BlobBuilder;

namespace LibraryManagementSystemTask.Controllers
{
    [Route("api/User")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbcontext _context;
        private readonly Iuser _user;
        private readonly IConfiguration _configuration;
        private readonly IEmailSender _emailSender;
       
        public UserController(ApplicationDbcontext context, Iuser user, IConfiguration configuration,IEmailSender emailSender)
        {
            _context = context;
            _user = user;
            _configuration = configuration;
            _emailSender = emailSender;
        }
        [HttpPost("register")]  
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (ModelState.IsValid)
            {
                var isUniqueUser = _context.users.FirstOrDefault(u => u.Email == user.Email);
                if (isUniqueUser != null)
                { return BadRequest("Email already in use!!!"); }
                else
                {
                    _context.users.Add(user);
                    _context.SaveChanges();
                }   
            }
            if (user.Email != null && user.Id != 0)
                    {
                        var setpassword = $"http://localhost:3001/PasswordSetting?id={user.Id}";
                       await _emailSender.SendEmailAsync(user.Email, "Set Your Password", $"Please click on this link set password:{setpassword}");
                    }
            return Ok();
        }
        [HttpGet("getalluser")]
        public IActionResult GetAllUser()
        {
            var userlist = _context.users.ToList();
            return Ok(userlist);
        }
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] User user)
        {
            if (user == null || user.Id != id)
            {
                return BadRequest();
            }

            var updatedUser = _user.UpdateUser(user);

            if (updatedUser == null)
            {
                return NotFound();
            }

            return Ok(updatedUser);
        }
    



    [HttpPost("authenticate")]
        public IActionResult authenticate([FromBody] UserVm uservm)
        {
            User user = _user.authenticate(uservm.Email, uservm.Password);
            if (user == null) return BadRequest("wrong user/pwd");
            return Ok(user);
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
        //[HttpPut("Update")]
        //public IActionResult SetPassWord([FromBody] User user)
        //{
        //    if (user == null) return BadRequest();
        //    _user.setPassword(user);
        //    _user.save();

        //    return Ok();


        //}
     
        [HttpPut("update")]
        public IActionResult update([FromBody] User email)
        
        {

            var data = _user.UpdateRegister(email);
            return Ok(data);
        }

        [HttpGet("{userid:int}", Name = "{GetUserByid}")]
        public IActionResult GetUserByid(int userid)
        {
            var user = _user.GetUser(userid);
            if (user == null) return NotFound();
            var getuserbyid = _user.GetUser(userid);
            return Ok(getuserbyid);
        }
    }
}

