using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Blocks.Hero
{
    [ContentType(DisplayName = "Book Now Block", GUID = "FB7F7226-127E-4937-899C-7DE9298716EE", Description = "Book Now Block", AvailableInEditMode = false)]
    public class BookNowBlock : SiteBlockData
    {
        [Required(ErrorMessage = "Check In date is required.")]
        [Display(Name = "Check In")]
        public virtual DateTime CheckInDate { get; set; }

        [Required(ErrorMessage = "Check Out date is required.")]
        [Display(Name = "Check Out")]
        public virtual DateTime CheckOutDate { get; set; }

        [Required(ErrorMessage = "Number of adults is required.")]
        [Range(1, 10, ErrorMessage = "Please enter a value between 1 and 10.")]
        [Display(Name = "Adults")]
        public virtual int Adults { get; set; }

        [Required(ErrorMessage = "Number of children is required.")]
        [Range(0, 10, ErrorMessage = "Please enter a value between 0 and 10.")]
        [Display(Name = "Children")]
        public virtual int Children { get; set; }

        [Display(
            Name = "Button Text",
            Description = "Text for the button",
            GroupName = SystemTabNames.Content,
            Order = 40)]
        [CultureSpecific]
        public virtual string ButtonText { get; set; }
    }
}
