using EPiServer.Web;
using Microsoft.AspNetCore.Html;
using System.ComponentModel.DataAnnotations;

namespace Blend.Cms12.Models.ViewModels
{
    public class HeroAreaBlockModel
    {
        [UIHint(UIHint.Image)]
        public ContentReference BackgroundImage { get; set; }
        public string Heading { get; set; }
        public string Description { get; set; }
        public string LinkText { get; set; }
        public IHtmlContent LinkUrl { get; set; }
    }
}
