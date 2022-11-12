using FootballTyperAPI.Authorization;
using FootballTyperAPI.Data;
using FootballTyperAPI.Helpers;
using FootballTyperAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<FootballTyperAPIContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("FootballTyperAPIContext") ?? throw new InvalidOperationException("Connection string 'FootballTyperAPIContext' not found.")));

// Add services to the container.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{

    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:3000", "https://football-typer-api.azurewebsites.net",
                "https://footballtyperapi.azure-api.net", "https://football-typer-frontend.azurewebsites.net")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});


// configure automapper with all automapper profiles from this assembly
builder.Services.AddAutoMapper(typeof(Program));

// configure strongly typed settings object
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

// configure DI for application services
builder.Services.AddScoped<IJwtUtils, JwtUtils>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

var app = builder.Build();
app.UseCors();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

//app.UseAuthentication();
//app.UseAuthorization();

// global error handler
app.UseMiddleware<ErrorHandlerMiddleware>();

// custom jwt auth middleware
app.UseMiddleware<JwtMiddleware>();

app.MapControllers();

SetupDatabase(app);

app.Run();


//----------------------------------------------------------------------------------------------//
//---------------------------------------Local functions---------------------------------------//

void SetupDatabase(WebApplication app)
{
    var service = (IServiceScopeFactory)app.Services.GetService(typeof(IServiceScopeFactory));

    bool isCleanAndInitDbNeeded = false;

    using (var db = service.CreateScope().ServiceProvider.GetService<FootballTyperAPIContext>())
    {
        isCleanAndInitDbNeeded = db.Database.GetPendingMigrations().Any();
        db.Database.Migrate();
    }

    if (isCleanAndInitDbNeeded)
    {
        using (var scope = app.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            try
            {
                var context = services.GetRequiredService<FootballTyperAPIContext>();
                DbInitializer.CleanDb(context);
                DbInitializer.Initialize(context);
            }
            catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occurred creating the DB.");
            }
        }
    }
}