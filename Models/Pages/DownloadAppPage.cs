using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Pages
{
    [SiteContentType(GUID = "E339880B-1C46-459F-952E-F03A082F1B32")]
    [SiteImageUrl(Globals.StaticGraphicsFolderPath + "page-type-thumbnail-standard.png")]
    public class DownloadAppPage : SitePageData
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
