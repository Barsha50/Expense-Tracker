using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace ExpenseTrackerApi.Models
{
    public class Expense
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("_id")]
        public string? id { get; set; }
        public string Title { get; set; }
        public decimal Amount { get; set; }
        public string Notes { get; set; }   
        public string Location { get; set; }
        public string Payment { get; set; }
        public IdName CategoryId { get; set; }
        public DateTime Date {  get; set; }

    }

    public class IdName
    {
        public string? id { get; set; }
        public string Name { get; set;  }
    }

    public class ExpenseResponse
    {
        public string? id { get; set; }
        public string Title { get; set; }
        public decimal Amount { get; set; }
        public string Notes { get; set; }
        public string Location { get; set; }
        public string Payment { get; set; }
        public IdName CategoryId { get; set; }
        public string Date { get; set; }

    }
}
