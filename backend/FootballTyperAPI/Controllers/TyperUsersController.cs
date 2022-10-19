using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FootballTyperAPI.Data;
using FootballTyperAPI.Models;

namespace FootballTyperAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TyperUsersController : ControllerBase
    {
        private readonly FootballTyperAPIContext _context;

        public TyperUsersController(FootballTyperAPIContext context)
        {
            _context = context;
        }

        // GET: api/TyperUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TyperUser>>> GetTyperUser()
        {
            return await _context.TyperUser.ToListAsync();
        }

        // GET: api/TyperUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TyperUser>> GetTyperUser(int id)
        {
            var typerUser = await _context.TyperUser.FindAsync(id);

            if (typerUser == null)
            {
                return NotFound();
            }

            return typerUser;
        }

        // PUT: api/TyperUsers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTyperUser(int id, TyperUser typerUser)
        {
            if (id != typerUser.Id)
            {
                return BadRequest();
            }

            _context.Entry(typerUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TyperUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TyperUsers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TyperUser>> PostTyperUser(TyperUser typerUser)
        {
            _context.TyperUser.Add(typerUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTyperUser", new { id = typerUser.Id }, typerUser);
        }

        // DELETE: api/TyperUsers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTyperUser(int id)
        {
            var typerUser = await _context.TyperUser.FindAsync(id);
            if (typerUser == null)
            {
                return NotFound();
            }

            _context.TyperUser.Remove(typerUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TyperUserExists(int id)
        {
            return _context.TyperUser.Any(e => e.Id == id);
        }
    }
}
