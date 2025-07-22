using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace ExpenseTrackerApi.Models
{
    public class Category
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("_id")]
        public string? id { get; set; }
        public string Name { get; set; }
        public decimal BudgetLimit { get; set; }

        public string? Type { get; set; }

    }
}
