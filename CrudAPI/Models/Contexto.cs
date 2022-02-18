using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CrudAPI.Models
{
  public class Contexto : DbContext
  {
		public DbSet<Funcionario> Funcionarios { get; set; }

		public DbSet<Departamento> Departamentos { get; set; }

		public Contexto(DbContextOptions<Contexto> opcoes) : base(opcoes)
		{
			
		}
  }
}