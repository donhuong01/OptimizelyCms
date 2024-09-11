using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Blocks.Malls
{
    [ContentType(DisplayName = "Malls", GUID = "A872F4EA-1E91-44BA-AD74-E4A22AAA4BD9", Description = "Malls")]
    public class MallsListBlock : SiteBlockData
    {
        public virtual IList<MallInfoBlock> Malls{ get; set; }
    }
}
