using Microsoft.AspNetCore.Mvc;

namespace Portfolio_Zullo_Taccogna_Server.Dto
{
    [Route("api")]
    [ApiController]
    public class ContattiController : ControllerBase
    {
        private static List<ContattiForm> _contattiForm= new List<ContattiForm>();

        [HttpGet("contatti")]
        public IActionResult GetContacts()
        {
            return Ok(_contattiForm);
        }



        [HttpPost("contatti")]
        public IActionResult SubmitForm([FromBody] ContattiForm contattiForm)
        {
            if (contattiForm == null)
            {
                return BadRequest("I dati sono mancanti.");
            }
            Console.WriteLine($"Contatto ricevuto: Nome={contattiForm.Nome}, Email={contattiForm.Email}, Messaggio={contattiForm.Messaggio      }");


            _contattiForm.Add(contattiForm);
            return Ok("Contatto ricevuto con successo!");
        }
    }
}
