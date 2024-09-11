using EPiServer.Web;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Blocks.Malls
{
    [ContentType(DisplayName = "Participating Mall Infomation", GUID = "D578F4AC-A0B1-456E-A366-4F476FEB23A4", Description = "Participating Mall Infomation")]
    public class MallInfoBlock : ParticipatingMallBlock
    {
        [CultureSpecific]
        [Display(
            Name = "Address",
            Description = "Address text for the mall",
            GroupName = SystemTabNames.Content,
            Order = 40)]
        [UIHint(UIHint.Textarea)]
        public virtual string Address { get; set; }

        [CultureSpecific]
        [Display(
            Name = "TimeOpen",
            Description = "Mall opening times",
            GroupName = SystemTabNames.Content,
            Order = 50)]
        [UIHint(UIHint.Textarea)]
        public virtual string TimeOpen { get; set; }

        [CultureSpecific]
        [Display(
            Name = "Description",
            Description = "Description text for the mall",
            GroupName = SystemTabNames.Content,
            Order = 60)]
        [UIHint(UIHint.Textarea)]
        public virtual string Description { get; set; }

        [Display(
        GroupName = SystemTabNames.Content,
        Order = 70
        )]
        [CultureSpecific]
        public virtual Url LinkGoogleMall { get; set; }
    }
}
