using ExpenseTrackerApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
namespace ExpenseTrackerApi.Services
{
    public class CategoriesService
    {
        private readonly IMongoCollection<Category> _categoriesCollection;
        public CategoriesService(IOptions<ExpenseTrackerDatabaseSettings> expensetrackerDatabaseSettings)
        {
            var mongoClient = new MongoClient(expensetrackerDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(expensetrackerDatabaseSettings.Value.DatabaseName);
            _categoriesCollection = mongoDatabase.GetCollection<Category>(
                 expensetrackerDatabaseSettings.Value.CategoryCollectionName);
        }
        public async Task<List<Category>>GetAsync() => await _categoriesCollection.Find(_ => true).ToListAsync();
        public async Task<Category> GetAsync(string id) => await _categoriesCollection.Find(x => x.id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Category newCategory) =>
            await _categoriesCollection.InsertOneAsync(newCategory);

        public async Task UpdateAsync(Category updatedCategory) =>
            await _categoriesCollection.ReplaceOneAsync(x => x.id == updatedCategory.id, updatedCategory);

        public async Task RemoveAsync(string id) =>
            await _categoriesCollection.DeleteOneAsync(x => x.id == id);

    }
}
