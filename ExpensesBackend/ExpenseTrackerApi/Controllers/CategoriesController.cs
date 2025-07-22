using ExpenseTrackerApi.Models;
using ExpenseTrackerApi.Services;
using Microsoft.AspNetCore.Mvc;
namespace ExpenseTrackerApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController:ControllerBase
    {
        private readonly CategoriesService _categoriesService;
        public CategoriesController(CategoriesService categoriesService) =>
            _categoriesService = categoriesService;

        [HttpGet]
        public async Task<List<Category>> Get() => await _categoriesService.GetAsync();


        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Category>> Get(string id)
        {
            var category = await _categoriesService.GetAsync(id);
            if (category is null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        [HttpPost]
        public async Task<ActionResult> Post (Category newCategory)
        {
            await _categoriesService.CreateAsync(newCategory);
            return CreatedAtAction(nameof(Get), new { newCategory.id }, newCategory);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(Category updatedCategory)
        {
            var category = await _categoriesService.GetAsync(updatedCategory.id!);
            if (category is null)
            {
                return NotFound();
            }
            //updatedCategory.Name = category.Name;
            await _categoriesService.UpdateAsync(updatedCategory);
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var category = await (_categoriesService.GetAsync(id));
            if (category is null)
            {
                return NotFound();
            }
            await _categoriesService.RemoveAsync(id);
            return NoContent();
        }
    }
    
}
