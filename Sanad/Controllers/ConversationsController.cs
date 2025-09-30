﻿
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sanad.DTOs;
using Sanad.Models.Data;
using System.Security.Claims;

namespace SanadAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]

    public class ConversationsController : ControllerBase
    {
        private readonly DbEntity context;

        public ConversationsController(DbEntity _context)
        {
            context = _context;
        }

        [HttpPost]
        public async Task<ActionResult<ConversationDto>> CreateConversation(string Title ,Guid UserId)
        {
            var dto = new CreateConversationDto {
                UserId = UserId, 
                Title = Title
            };

            var conversation = new Conversation
            {
                Title = dto.Title,
                User_Id = dto.UserId,
                CreatedAt = DateTime.UtcNow
            };

            context.Conversations.Add(conversation);
            await context.SaveChangesAsync();

            return new ConversationDto
            {
                Id = conversation.Id,
                Title = conversation.Title,
                CreatedAt = conversation.CreatedAt,
                Messages = new List<MessageDto>()
            };
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<ConversationDto>>> GetUserConversations(Guid userId)
        {
            var conversations = await context.Conversations
                .Where(c => c.User_Id == userId)
                .Include(c => c.Messages)
                .Select(c => new ConversationDto
                {
                    Id = c.Id,
                    Title = c.Title,
                    CreatedAt = c.CreatedAt,
                    Messages = c.Messages.Select(m => new MessageDto
                    {
                        Id = m.Id,
                        Role = m.Role,
                        Content = m.Content,
                        CreatedAt = m.CreatedAt
                    }).ToList()
                })
                .ToListAsync();

            if (!conversations.Any())
                return NotFound($"No conversations found for user {userId}");

            return conversations;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConversation(int id) 
        {

            var conv = await context.Conversations
                .Include(c => c.Messages)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (conv == null) return NotFound();


            context.Messages.RemoveRange(conv.Messages);
            context.Conversations.Remove(conv);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
