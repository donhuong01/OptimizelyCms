using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Pages
{
    [ContentType(DisplayName = "Event", GUID = "F0D95629-0166-4250-AF03-7F8D0073F488", Description = "Event content type")]
    public class EventPage : StandardPage
    {
        [Display(
            Name = "Title",
            Description = "Event title",
            GroupName = SystemTabNames.Content,
            Order = 1)]
        public virtual string Title { get; set; }

        [Display(
            Name = "Image",
            Description = "Event image",
            GroupName = SystemTabNames.Content,
            Order = 2)]
        public virtual ContentReference Image { get; set; }

        [Display(
            Name = "Description",
            Description = "Event description",
            GroupName = SystemTabNames.Content,
            Order = 3)]
        public virtual XhtmlString Description { get; set; }

        [Display(
            Name = "Start Date",
            Description = "Event start date",
            GroupName = SystemTabNames.Content,
            Order = 4)]
        public virtual DateTime StartDate { get; set; }

        [Display(
            Name = "End Date",
            Description = "Event end date",
            GroupName = SystemTabNames.Content,
            Order = 5)]
        public virtual DateTime EndDate { get; set; }
    }
}
