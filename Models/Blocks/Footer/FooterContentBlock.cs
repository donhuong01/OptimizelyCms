using EPiServer.Shell.ObjectEditing;
using EPiServer.Web;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Blend.Cms12.Models.Blocks.Footer
{
    [SiteContentType(GUID = "51395E25-4B27-4247-B3B9-94D070106D0C",
        AvailableInEditMode = false)]
    [SiteImageUrl]
    public class FooterContentBlock : SiteBlockData
    {
        [DefaultDragAndDropTarget]
        [UIHint(UIHint.Image)]
        public virtual Url Img
        {
            get
            {
                var url = this.GetPropertyValue(b => b.Img);

                return url == null || url.IsEmpty()
                    ? new Url("/gfx/logotype.png")
                    : url;
            }
            set => this.SetPropertyValue(b => b.Img, value);
        }

        [CultureSpecific]
        public virtual string Title { get; set; }
    }
}
