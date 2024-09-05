using EPiServer.Web;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Blocks.PromotionEvent
{
    [ContentType(DisplayName = "About Lendlease Plus ", GUID = "888BAE9E-6172-4515-8ECD-8B8BDAC91025", Description = "About Lendlease Plus")]
    public class AboutInforBlock : SiteBlockData
    {
        [Display(Name = "Title", Order = 5)]
        [CultureSpecific]
        public virtual string MainTitle { get; set; }

        [Display(Name = "Decription", Order = 10)]
        [CultureSpecific]
        public virtual string Decription { get; set; }

        [Display(
            Name = "Background",
            Description = "Background image",
            GroupName = SystemTabNames.Content,
            Order = 15)]
        [UIHint(UIHint.Image)]
        public virtual ContentReference BackgroundImage { get; set; }

        [Display(Order = 20, GroupName = SystemTabNames.Content)]
        public virtual string ButtonText { get; set; }

        [Display(Order = 25, GroupName = SystemTabNames.Content)]
        public virtual Url ButtonLink { get; set; }
    }
}
