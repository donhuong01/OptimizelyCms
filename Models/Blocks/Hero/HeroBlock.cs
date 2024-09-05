using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Blocks.Hero
{
    [ContentType(DisplayName = "Hero Block", GUID = "867D348B-7C26-4809-9E6A-993C1DC7CCC9", Description = "Block Hero", AvailableInEditMode = false)]
    public class HeroBlock : SiteBlockData
    {
        [Display(Name = "Slides", Order = 10)]
        public virtual ContentArea Slides { get; set; }
    }
}
