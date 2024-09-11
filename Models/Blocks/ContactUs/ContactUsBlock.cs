using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Blocks.ContactUs
{
    [ContentType(DisplayName = "Contact Us", GUID = "36236375-FF0E-4A39-9218-923E7175E86A", Description = "Contact Us")]
    public class ContactUsBlock : SiteBlockData
    {
        [Display(
        GroupName = SystemTabNames.Content,
        Order = 10)]
        [CultureSpecific]
        public virtual string Heading { get; set; }
    }
}
