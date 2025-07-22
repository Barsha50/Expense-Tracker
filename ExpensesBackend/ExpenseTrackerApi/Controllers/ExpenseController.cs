using ExpenseTrackerApi.Models;
using ExpenseTrackerApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
namespace ExpenseTrackerApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpenseController: ControllerBase
    {
        private readonly ExpenseService _expenseService;
        public ExpenseController(ExpenseService expenseService) =>
            _expenseService = expenseService;
        [HttpGet]
        public async Task<List<Expense>> Get() => await _expenseService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Expense>> Get(string id)
        {
            var expense = await _expenseService.GetAsync(id);
            if (expense is null)
            {
                return NotFound();
            }
            return Ok(expense);
        }
        [HttpPost]
        public async Task<ActionResult> Post(ExpenseResponse newExpense)
        {
            var exp = new Expense
            {
                Title = newExpense.Title,
                Amount = newExpense.Amount,
                Location = newExpense.Location,
                Payment = newExpense.Payment,
                Notes = newExpense.Notes,
                CategoryId = newExpense.CategoryId,
                Date = DateTime.Parse(newExpense.Date),

            };
            await _expenseService.CreateAsync(exp);
            return CreatedAtAction(nameof(Get), new { exp.id }, exp);
        }
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id,Expense updatedExpense)
        {
            var expense = await _expenseService.GetAsync(updatedExpense.id);
            if (expense is null)
            {
                return NotFound();
            }
            //updatedExpense.Title = expense.Title;
            await _expenseService.UpdateAsync(id, updatedExpense);
            return NoContent();

        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var expense = await (_expenseService.GetAsync(id));
            if (expense is null)
            {
                return NotFound();
            }
            await _expenseService.RemoveAsync(expense.id);
            return NoContent();
        }
    }
}
