using LibraryManagementSystemTask;
using LibraryManagementSystemTask.Data;
using LibraryManagementSystemTask.Models;
using LibraryManagementSystemTask.Models.DtoMapping;
using LibraryManagementSystemTask.Repository;
using LibraryManagementSystemTask.Repository.IRepository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var MyAllowSpecificOrigins  = "_myAllowSpecificOrigins";

builder.Services.AddControllers();
string cs = builder.Configuration.GetConnectionString("constr");
builder.Services.AddDbContext<ApplicationDbcontext>(options => options.UseSqlServer(cs));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<IBooks , Booksrepository>();
builder.Services.AddScoped<Iuser, UserRepository>();
builder.Services.AddScoped<IOrdersRepository, OrdersRepository>();
builder.Services.AddScoped<IBookrating, Ratingrepository>();
builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.Configure<EmailSetting>(builder.Configuration.GetSection("EmailSetting"));
builder.Services.AddScoped<IEmailSender,EmailSender>();

builder.Services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();



builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyPolicy",
      builder =>
      {
          builder.WithOrigins("http://localhost:3000/")
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
      });
});


//jwt
var appsettingsection = builder.Configuration.GetSection("Appsettings");
builder.Services.Configure<Appsettings>(appsettingsection);
var appsetting = appsettingsection.Get<Appsettings>();
var key = Encoding.ASCII.GetBytes(appsetting.Secret);
var Expires= DateTime.UtcNow.AddMinutes(1);
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero,
    };
});


var app = builder.Build();




// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("MyPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
