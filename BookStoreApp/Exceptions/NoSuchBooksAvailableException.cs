namespace BookStoreApp.Exceptions
{
    public class NoSuchBooksAvailableException : Exception
    {
        string message = "";
        public NoSuchBooksAvailableException()
        {
            message = "No Such Book is available In The Store";
        }
        public override string Message => message;

    }
}
