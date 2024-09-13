using System.ComponentModel.DataAnnotations;

namespace Blend.Cms12.Models.Pages
{
    [SiteContentType(GUID = "AC460D9F-6300-4AC2-8F7D-F7D2CA7758AA")]
    [SiteImageUrl]
    [AvailableContentTypes(
    Availability.Specific,
    Include =
    [
        typeof(ContainerPage) 
    ])]
    public class MallPage : StandardPage
    {
    }
}
