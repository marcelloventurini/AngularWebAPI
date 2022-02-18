using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrudAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CrudAPI
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddDbContext<Contexto>(opcoes => opcoes.UseSqlServer(Configuration.GetConnectionString("ConexaoDB")));

      services.AddCors();

      services.AddControllers();

      services.AddEndpointsApiExplorer();
      services.AddSwaggerGen();

    }

    public void Configure(WebApplication app, IWebHostEnvironment environment)
    {
      if (app.Environment.IsDevelopment())
      {
        app.UseSwagger();
        app.UseSwaggerUI();
      }

      app.UseHttpsRedirection();

      app.UseCors(opcoes => opcoes.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

      app.UseAuthorization();

      app.MapControllers();
    }
  }
}