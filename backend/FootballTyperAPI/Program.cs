using FootballTyperAPI.Data;
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


var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

SetupDatabase(app);

app.Run();


//----------------------------------------------------------------------------------------------//
//---------------------------------------Local functions---------------------------------------//

void SetupDatabase(WebApplication app)
{
    var service = (IServiceScopeFactory)app.Services.GetService(typeof(IServiceScopeFactory));

    using (var db = service.CreateScope().ServiceProvider.GetService<FootballTyperAPIContext>())
    {
        db.Database.Migrate();

    }

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