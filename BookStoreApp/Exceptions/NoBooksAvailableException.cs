namespace BookStoreApp.Exceptions
{
    public class NoBooksAvailableException : Exception
    {
        string message;
        public NoBooksAvailableException()
        {
            message = "No Books are available In The Store";
        }
        public override string Message => message;
    }
}
