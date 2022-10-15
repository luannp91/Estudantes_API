using EstudanteApi.Models;
using EstudanteApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EstudanteApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstudanteController : ControllerBase
    {
        private IEstudanteService _estudanteService;

        public EstudanteController(IEstudanteService estudanteService)
        {
            _estudanteService = estudanteService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IAsyncEnumerable<Aluno>>> GetAlunos() 
        { 
            try
            {
                var alunos = await _estudanteService.GetAlunos();
                return Ok(alunos);
            }
            catch
            {
                return StatusCode(StatusCodes.Status400BadRequest, "Requisição inválida");
            }
        }

        [HttpGet("Nomes")]
        public async Task<ActionResult<IAsyncEnumerable<Aluno>>> GetAlunosByName([FromQuery] string nome)
        {
            try
            {
                var alunos = await _estudanteService.GetAlunosByNome(nome);
                if (alunos == null)
                {
                    return NotFound($"Não existem alunos com o critério { nome }");
                }
                return Ok(alunos);
            }
            catch
            {
                return BadRequest("Requisição Inválida");
            }
        }

        [HttpGet("{id:int}", Name = "GetAluno")]
        public async Task<ActionResult<Aluno>> GetAluno(int id)
        {
            try
            {
                var aluno = await _estudanteService.GetAluno(id);
                if (aluno == null)
                {
                    return NotFound($"Não existe estudante com id = { id }");
                }
                return Ok(aluno);
            }
            catch
            {
                return BadRequest("Requisição Inválida");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create(Aluno aluno)
        {
            try
            {
                await _estudanteService.CreateAluno(aluno);
                return CreatedAtRoute(nameof(GetAluno), new { id = aluno.Id }, aluno);
            }
            catch
            {
                return BadRequest("Requisição Inválida");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Edit(int id, [FromBody] Aluno aluno)
        {
            try
            {
                if (aluno.Id == id)
                {
                    await _estudanteService.UpdateAluno(aluno);
                    return Ok($"Estudante com id = { id } foi atualizado com sucesso");
                }
                else
                {
                    return BadRequest("Dados inconsistentes");
                }
            }
            catch
            {
                return BadRequest("Requisição Inválida");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var aluno = await _estudanteService.GetAluno(id);
                if (aluno != null)
                {
                    await _estudanteService.DeleteAluno(aluno);
                    return Ok($"Estudante de id = { id } foi excluído com sucesso");
                }
                else
                {
                    return NotFound($"Estudante com id = { id } não encontrado");
                }
            }
            catch
            {
                return BadRequest("Requisição Inválida");
            }
        }
    }
}
