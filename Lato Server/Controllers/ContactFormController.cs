using Microsoft.AspNetCore.Mvc;

namespace Portfolio_Zullo_Taccogna_Server.Dto
{
    [Route("api")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private static List<ContactForm> _contattiForm= new List<ContactForm>();

        [HttpGet("contatti")]
        public IActionResult GetContacts()
        {
            return Ok(_contattiForm);
        }



        [HttpPost("contatti")]
        public IActionResult SubmitForm([FromBody] ContactForm contattiForm)
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
