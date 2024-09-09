using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Pages
{
    [SiteContentType(GUID = "11386A56-C5FC-45AB-AF51-1DB1223593C8")]
    [SiteImageUrl(Globals.StaticGraphicsFolderPath + "page-type-thumbnail-standard.png")]
    public class SignUpPage : SitePageData
    {
        [Display(
       GroupName = SystemTabNames.Content,
       Order = 310)]
        [CultureSpecific]
        public virtual XhtmlString MainBody { get; set; }

        [Display(
            GroupName = SystemTabNames.Content,
            Order = 320)]
        public virtual ContentArea MainContentArea { get; set; }
    }
}