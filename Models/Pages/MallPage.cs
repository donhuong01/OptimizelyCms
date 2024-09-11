using System.ComponentModel.DataAnnotations;

namespace Blend.Cms12.Models.Pages
{
    [SiteContentType(GUID = "AC460D9F-6300-4AC2-8F7D-F7D2CA7758AA")]
    [SiteImageUrl(Globals.StaticGraphicsFolderPath + "page-type-thumbnail-standard.png")]
    [AvailableContentTypes(
    Availability = Availability.Specific,
    IncludeOn = [typeof(StartPage)])]
    public class MallPage : StandardPage
    {
    }
}
