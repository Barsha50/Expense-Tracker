using Microsoft.AspNetCore.Identity;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ExpenseTrackerApi.Models
{
    [BsonIgnoreExtraElements]
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("_id")]
        public string? id { get; set; }
        [BsonIgnoreIfNull]
        public string Name { get; set; }
        [BsonIgnoreIfNull]
        public string Email { get; set; }
        [BsonIgnoreIfNull]
        public string Password { get; set; }
    }

    public class UserRequestModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
