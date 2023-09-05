using AutoMapper;
using LibraryManagementSystemTask.Models.Dto;

namespace LibraryManagementSystemTask.Models.DtoMapping
{
    public class MappingProfile:Profile
    {
        public MappingProfile() {

            CreateMap<Orders, ordersdto>().ReverseMap();
        
        }
    }
}
