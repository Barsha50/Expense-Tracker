using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ExpenseTrackerApi.Models
{
    public class Login
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("_id")]
        public string? id { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }
    }
}
