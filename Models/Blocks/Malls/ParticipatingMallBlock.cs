using EPiServer.Web;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Blocks.Malls
{
    [ContentType(DisplayName = "Participating Mall", GUID = "BF3D80C1-C167-4019-A139-65EDD53F7201", Description = "A single mall in the participating malls")]
    public class ParticipatingMallBlock : SiteBlockData
    {
        [Display(
            Name = "Background Mall",
            Description = "Background image for the mall",
            GroupName = SystemTabNames.Content,
            Order = 10)]
        [UIHint(UIHint.Image)]
        public virtual ContentReference BackgroundImage { get; set; }

        [Display(
        GroupName = SystemTabNames.Content,
        Order = 20
        )]
        [CultureSpecific]
        public virtual Url LinkMall { get; set; }

        [Display(
            Name = "Heading",
            Description = "Heading text for the mall",
            GroupName = SystemTabNames.Content,
            Order = 30)]
        [CultureSpecific]
        public virtual string Heading { get; set; }
    }
}
