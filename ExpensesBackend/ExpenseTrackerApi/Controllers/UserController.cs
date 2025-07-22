using ExpenseTrackerApi.Models;
using ExpenseTrackerApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UserApplication.Controllers;

namespace ExpenseTrackerApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserService _userservice;
        private readonly User existing_userservice;

        public UserController(IConfiguration configuration, UserService userservice)
        {
            _configuration = configuration;
            _userservice = userservice;
        }

        [HttpPost("register")]
        public async Task<IActionResult> SignUp(UserRequestModel user)
        {
            var newUser = new User
            {
                Name = user.Name,
                Email = user.Email,
                Password = BCrypt.Net.BCrypt.EnhancedHashPassword(user.Password, 10)
            };
            await _userservice.CreateAsync(newUser);
            return Ok(newUser);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                return BadRequest("Invalid login credentials");
            }

            var user = await _userservice.GetUserByEmail(email);
            if(user == null)
            {
                return BadRequest();
            }

            var isPassowrdMatch = BCrypt.Net.BCrypt.EnhancedVerify(password, user.Password);
            if(!isPassowrdMatch)
            {
                return BadRequest();
            }

            return Ok(new LoginResponse
            {
                AccessToken = GetAccessToken(user),
            });
        }

        [Authorize]
        private string GetAccessToken(User userDetails)
        {
            var jwtSecurity = new JwtSecurityTokenHandler();
            var securityToken = jwtSecurity.CreateToken(new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                        new Claim(ClaimTypes.Name, userDetails.id.ToString()),
                        new Claim(ClaimTypes.Email, userDetails.Password.ToString()),
                    }),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                IssuedAt = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddMinutes(10),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])), SecurityAlgorithms.HmacSha256),
            });
            string accessToken = jwtSecurity.WriteToken(securityToken);
            return accessToken;
        }
    }
}
