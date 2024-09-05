using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Pages
{
    [SiteContentType(GUID = "C6DD6FBB-F6FD-4630-9657-CCD6220CF844")]
    [SiteImageUrl(Globals.StaticGraphicsFolderPath + "page-type-thumbnail-standard.png")]
    public class LoginPage : SitePageData
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
