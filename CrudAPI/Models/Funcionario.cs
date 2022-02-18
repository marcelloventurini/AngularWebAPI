using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudAPI.Models
{
  public class Funcionario
  {
		public int funcionarioId { get; set; }

		public string nome { get; set; }

		public string rg { get; set; }

		public int departamentoId { get; set; }
  }
}