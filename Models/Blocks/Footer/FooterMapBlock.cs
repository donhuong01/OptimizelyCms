using EPiServer.Shell.ObjectEditing;
using EPiServer.Web;
using System.ComponentModel.DataAnnotations;

namespace Blend.Cms12.Models.Blocks.Footer
{
    [SiteContentType(GUID = "82A0A17B-A0EF-464A-9DD6-19A2103AD1B2",
        AvailableInEditMode = false)]
    [SiteImageUrl]
    public class FooterMapBlock : SiteBlockData
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
