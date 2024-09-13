using Blend.Cms12.Business.Rendering;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Pages
{
    [SiteContentType(
    DisplayName = "Event/Promotion",
    GUID = "8DBF6313-1EAC-425D-8F21-FC2FA1B9928F",
    GroupName = Globals.GroupNames.Specialized,
    Description = "Event/Promotion content type")]
    [SiteImageUrl(Globals.StaticGraphicsFolderPath + "page-type-thumbnail-contact.png")]
    public class EventPromotionPage : SitePageData, IContainerPage
    {
        [Display(
            Name = "Title",
            Description = "Event/Promotion title",
            GroupName = SystemTabNames.Content,
            Order = 10)]
        public virtual string Title { get; set; }

        [Display(
            Name = "Image",
            Description = "Event/Promotion image",
            GroupName = SystemTabNames.Content,
            Order = 20)]
        public virtual ContentReference Image { get; set; }

        [Display(
            Name = "Description",
            Description = "Event/Promotion description",
            GroupName = SystemTabNames.Content,
            Order = 30)]
        public virtual XhtmlString Description { get; set; }

        [Display(
            Name = "Start Date",
            Description = "Event/Promotion start date",
            GroupName = SystemTabNames.Content,
            Order = 40)]
        public virtual DateTime StartDate { get; set; }

        [Display(
            Name = "End Date",
            Description = "Event/Promotion end date",
            GroupName = SystemTabNames.Content,
            Order = 50)]
        public virtual DateTime EndDate { get; set; }
    }
}
