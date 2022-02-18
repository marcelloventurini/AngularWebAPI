using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrudAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrudAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class DepartamentosController : ControllerBase
  {
    private readonly Contexto _contexto;

    public DepartamentosController(Contexto contexto)
    {
      _contexto = contexto;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Departamento>>> PegarTodosAsync()
    {
      return await _contexto.Departamentos.ToListAsync();
    }

    [HttpGet("{departamentoId}")]
    public async Task<ActionResult<Departamento>> PegarDepartamentoPeloIdAsync(int departamentoId)
    {
      Departamento departamento = await _contexto.Departamentos.FindAsync(departamentoId);

      if (departamento == null)
        return NotFound();

      return departamento;
    }

    [HttpPost]
    public async Task<ActionResult<Departamento>> SalvarDepartamentoAsync(Departamento departamento)
    {
      await _contexto.Departamentos.AddAsync(departamento);
      await _contexto.SaveChangesAsync();

      return Ok();
    }

    [HttpPut]
    public async Task<ActionResult> AtualizarDepartamentoAsync(Departamento departamento)
    {
      _contexto.Departamentos.Update(departamento);
      await _contexto.SaveChangesAsync();

      return Ok();
    }

    [HttpDelete("{departamentoId}")]
    public async Task<ActionResult> ExcluirDepartamentoAsync(int departamentoId)
    {
      Departamento departamento = await _contexto.Departamentos.FindAsync(departamentoId);

      if (departamento == null)
        return NotFound();

      _contexto.Remove(departamento);
      await _contexto.SaveChangesAsync();

      return Ok();
    }
  }
}