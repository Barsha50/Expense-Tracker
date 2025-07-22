namespace ExpenseTrackerApi.Models
{
    public class ExpenseTrackerDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string CategoryCollectionName { get; set; } = null!;
        public string ExpenseCollectionName { get; set; } = null!;

        public string UserCollectionName { get; set; } = null!;


    }
}
