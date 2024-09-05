using EPiServer.Shell.ObjectEditing;
using EPiServer.Web;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Blocks
{
    [SiteContentType(GUID = "22EA2BA0-CE03-49D0-A70B-AD5FCDF2730C",
        AvailableInEditMode = false)]
    [SiteImageUrl]
    public class ButtonHeaderBlock : SiteBlockData
    {
        [DefaultDragAndDropTarget]
        public virtual Url ButtonLink { get; set; }

        [CultureSpecific]
        public virtual string ButtonText { get; set; }
    }
}
