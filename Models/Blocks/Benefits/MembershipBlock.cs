using EPiServer.Web;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Blocks.Benefits
{
    [ContentType(DisplayName = "Membership", GUID = "DCE32421-3F40-4991-B9A4-314D62C4B93E", Description = "Membership")]
    public class MembershipBlock : SiteBlockData
    {
        [Display(
       GroupName = SystemTabNames.Content,
       Order = 10)]
        [CultureSpecific]
        public virtual string Heading { get; set; }

        [CultureSpecific]
        [Display(
           Name = "Description",
           Description = "Description text for the membership",
           GroupName = SystemTabNames.Content,
           Order = 20)]
        public virtual XhtmlString Description { get; set; }
    }
}
