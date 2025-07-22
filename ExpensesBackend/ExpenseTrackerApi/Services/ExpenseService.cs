using ExpenseTrackerApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
namespace ExpenseTrackerApi.Services
{
    public class ExpenseService
    {
        private readonly IMongoCollection<Expense> _expenseCollection;
        public ExpenseService(IOptions<ExpenseTrackerDatabaseSettings> expensetrackerDatabaseSettings)
        {
            var mongoClient = new MongoClient(expensetrackerDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(expensetrackerDatabaseSettings.Value.DatabaseName);
            _expenseCollection = mongoDatabase.GetCollection<Expense>(
                 expensetrackerDatabaseSettings.Value.ExpenseCollectionName);
        }
        public async Task<List<Expense>> GetAsync() => await _expenseCollection.Find(_ => true).ToListAsync();
        public async Task<Expense> GetAsync(string id) => await _expenseCollection.Find(x => x.id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Expense newExpense) =>
            await _expenseCollection.InsertOneAsync(newExpense);

        public async Task UpdateAsync(string id, Expense updatedExpense) =>
            await _expenseCollection.ReplaceOneAsync(x => x.id == id, updatedExpense);

        public async Task RemoveAsync(string id) =>
            await _expenseCollection.DeleteOneAsync(x => x.id == id);
    }
}
