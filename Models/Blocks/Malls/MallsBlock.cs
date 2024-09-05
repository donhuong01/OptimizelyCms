using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Blocks.Malls
{
    [ContentType(DisplayName = "Participating Malls", GUID = "3497F76B-80B5-4A59-AE89-7C9F0DB76F11", Description = "Participating Malls")]
    public class MallsBlock : SiteBlockData
    {
        [Display(Name = "Title", Order = 10)]
        [CultureSpecific]
        public virtual string Title { get; set; }

        [Display(Name = "Malls", Order = 20)]
        public virtual ContentArea Malls { get; set; }
    }
}
