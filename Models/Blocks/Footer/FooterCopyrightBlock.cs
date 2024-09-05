using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Blocks.Footer
{
    [SiteContentType(GUID = "7426BFB9-53C1-4509-8A57-C78994C1A3AA",
       AvailableInEditMode = false)]
    [SiteImageUrl]
    public class FooterCopyrightBlock : SiteBlockData
    {
        [CultureSpecific]
        public virtual XhtmlString Title { get; set; }
    }
}
