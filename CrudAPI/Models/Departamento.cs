using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudAPI.Models
{
  public class Departamento
  {
		
    public int departamentoId { get; set; }

    public string nome { get; set; }

    public string sigla { get; set; }
  }
}