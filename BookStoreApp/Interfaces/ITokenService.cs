using BookStoreApp.Models.DTOs;
namespace BookStoreApp.Interfaces
{
    public interface ITokenService
    {
        string GetToken(UserDTO user);
    }
}
