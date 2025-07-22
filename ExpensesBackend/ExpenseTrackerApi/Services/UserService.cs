using ExpenseTrackerApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
namespace ExpenseTrackerApi.Services
{
    public class UserService 
    {
        private readonly IMongoCollection<User> _usersCollection;
        public UserService(IOptions<ExpenseTrackerDatabaseSettings> expensetrackerDatabaseSettings)
        {
            var mongoClient = new MongoClient(expensetrackerDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(expensetrackerDatabaseSettings.Value.DatabaseName);
            _usersCollection = mongoDatabase.GetCollection<User>(
                 expensetrackerDatabaseSettings.Value.UserCollectionName);
        }

        public string id { get; internal set; }

        public async Task<List<User>> GetAsync() => await _usersCollection.Find(_ => true).ToListAsync();
        public async Task<User> GetUserAsync(string email, string password) => await _usersCollection.Find(u => u.Email == email && u.Password == password).FirstOrDefaultAsync();
        public async Task<User> GetUserByEmail(string email) => await _usersCollection.Find(u => u.Email == email).FirstOrDefaultAsync();
        public async Task CreateAsync(User newuser) =>
            await _usersCollection.InsertOneAsync(newuser);

    }
}
