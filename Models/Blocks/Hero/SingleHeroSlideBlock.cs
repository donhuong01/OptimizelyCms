using EPiServer.Web;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Blocks.Hero
{
    [ContentType(DisplayName = "Hero Slide", GUID = "B06BFDA5-3172-4200-AF0A-053E556DD31B", Description = "A single slide in the hero slider", AvailableInEditMode = false)]
    public class SingleHeroSlideBlock : SiteBlockData
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
        [Required(AllowEmptyStrings = false)]
        [Display(
            Name = "Description",
            Description = "Description text for the slide",
            GroupName = SystemTabNames.Content,
            Order = 30)]
        [UIHint(UIHint.Textarea)]
        public virtual string Description { get; set; }

        [Display(
            Name = "Button Text",
            Description = "Text for the button",
            GroupName = SystemTabNames.Content,
            Order = 40)]
        [CultureSpecific]
        public virtual string ButtonText { get; set; }

        [Display(
            Name = "Button Link",
            Description = "URL for the button",
            GroupName = SystemTabNames.Content,
            Order = 50)]
        public virtual Url ButtonLink { get; set; }

        [Display(
       GroupName = SystemTabNames.Content,
       Order = 60)]
        public virtual PageReference Link { get; set; }
    }
}
