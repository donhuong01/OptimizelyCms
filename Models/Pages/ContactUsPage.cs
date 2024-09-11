using EPiServer.Web;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Pages
{
    [SiteContentType(
    GUID = "F550B1FE-B220-463C-B2D1-91E868A434F1",
    GroupName = Globals.GroupNames.Contact)]
    [SiteImageUrl(Globals.StaticGraphicsFolderPath + "page-type-thumbnail-product.png")]
    [AvailableContentTypes(
    Availability = Availability.Specific,
    IncludeOn = [typeof(StartPage)])]
    public class ContactUsPage : StandardPage
    {
        [Display(
       GroupName = SystemTabNames.Content,
       Order = 10)]
        [CultureSpecific]
        public virtual string Heading { get; set; }
    }
}
