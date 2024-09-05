using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Pages
{
    [ContentType(DisplayName = "Promotion", GUID = "0F4E4A39-B814-4194-848F-A4A9330FF68F", Description = "Promotion content type")]
    public class PromotionPage : StandardPage
    {
        [Display(
            Name = "Title",
            Description = "Promotion title",
            GroupName = SystemTabNames.Content,
            Order = 1)]
        public virtual string Title { get; set; }

        [Display(
            Name = "Image",
            Description = "Promotion image",
            GroupName = SystemTabNames.Content,
            Order = 2)]
        public virtual ContentReference Image { get; set; }

        [Display(
            Name = "Description",
            Description = "Promotion description",
            GroupName = SystemTabNames.Content,
            Order = 3)]
        public virtual XhtmlString Description { get; set; }

        [Display(
            Name = "Start Date",
            Description = "Promotion start date",
            GroupName = SystemTabNames.Content,
            Order = 4)]
        public virtual DateTime StartDate { get; set; }

        [Display(
            Name = "End Date",
            Description = "Promotion end date",
            GroupName = SystemTabNames.Content,
            Order = 5)]
        public virtual DateTime EndDate { get; set; }
    }
}
