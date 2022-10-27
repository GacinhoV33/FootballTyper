namespace FootballTyperAPI.Helpers;

using AutoMapper;
using FootballTyperAPI.Models;
using FootballTyperAPI.Models.Users;
using FootballTyperAPI.Models.Bets;

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

        // PostBetRequest -> Bet
        CreateMap<PostBetRequest, Bet>();

        // PutBetRequest -> Bet
        CreateMap<PutBetRequest, Bet>();


        // Bet -> GetBetRequest
        CreateMap<Bet, GetBetRequest>();
        //// GetBetRequest -> Bet
        //CreateMap<GetBetRequest, Bet>();

    }
}