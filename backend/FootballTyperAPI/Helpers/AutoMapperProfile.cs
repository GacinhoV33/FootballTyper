namespace FootballTyperAPI.Helpers;

using AutoMapper;
using FootballTyperAPI.Models;
using FootballTyperAPI.Models.Users;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        // User -> AuthenticateResponse
        CreateMap<TyperUser, AuthenticateResponse>();

        // RegisterRequest -> User
        CreateMap<RegisterRequest, TyperUser>();

        // UpdateRequest -> User
        CreateMap<UpdateRequest, TyperUser>()
            .ForAllMembers(x => x.Condition(
                (src, dest, prop) =>
                {
                    // ignore null & empty string properties
                    if (prop == null) return false;
                    if (prop.GetType() == typeof(string) && string.IsNullOrEmpty((string)prop)) return false;

                    return true;
                }
            ));
    }
}