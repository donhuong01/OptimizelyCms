using EPiServer.Web;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Blocks.DownloadApp
{
    [ContentType(DisplayName = "Download App Block", GUID = "25B23BA8-2BD3-46FA-ABAF-249D00EF2167", Description = "Download App Block")]
    public class DownloadAppBlock : SiteBlockData
    {
        [Display(
           Name = "Background Image",
           Description = "Background image for the slide",
           GroupName = SystemTabNames.Content,
           Order = 10)]
        [UIHint(UIHint.Image)]
        public virtual ContentReference BackgroundImage { get; set; }

        [Display(
            Name = "Heading",
            Description = "Heading text for the slide",
            GroupName = SystemTabNames.Content,
            Order = 20)]
        [CultureSpecific]
        public virtual string Heading { get; set; }

        [CultureSpecific]
        [Display(
            Name = "Description",
            Description = "Description text for the slide",
            GroupName = SystemTabNames.Content,
            Order = 30)]
        [UIHint(UIHint.Textarea)]
        public virtual string Description { get; set; }

        [Display(Name = "App selections", Order = 40)]
        public virtual ContentArea AppSelections { get; set; }
    }
}
