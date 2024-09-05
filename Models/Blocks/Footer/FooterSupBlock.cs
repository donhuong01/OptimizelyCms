using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Blocks.Footer
{
    [SiteContentType(GUID = "32795289-AE73-40C6-A153-E9EB47A99C77",
        AvailableInEditMode = false)]
    [SiteImageUrl]
    public class FooterSupBlock : SiteBlockData
    {
        [Display(
            Name = "Email Address",
            Description = "Email address for subscription",
            GroupName = SystemTabNames.Content,
            Order = 10)]
        [EmailAddress]
        [Required(ErrorMessage = "Email address is required")]
        public virtual string Email { get; set; }

        [CultureSpecific]
        public virtual string Title { get; set; }

        [CultureSpecific]
        public virtual string ButtonText { get; set; }
    }
}
