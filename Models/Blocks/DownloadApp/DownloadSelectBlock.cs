using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Blocks.DownloadApp
{
    [ContentType(DisplayName = "Download Select Block", GUID = "01E0C7E0-A3C4-4571-8BFE-8F930B9CB947", Description = "Download Select Block")]
    public class DownloadSelectBlock : SiteBlockData
    {
        [Display(Order = 1, GroupName = SystemTabNames.Content)]
        public virtual string ButtonText { get; set; }

        [Display(Order = 2, GroupName = SystemTabNames.Content)]
        public virtual Url ButtonLink { get; set; }
    }
}
