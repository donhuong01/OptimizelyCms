using Blend.Cms12.Models.Pages;
using Blend.Cms12.Models.ViewModels;
using EPiServer.Core.Internal;
using Microsoft.AspNetCore.Mvc;

namespace Blend.Cms12.Controllers
{
    public class PromotionController : PageControllerBase<PromotionPage>
    {
        private readonly IContentRepository _contentRepository;

        public PromotionController(IContentRepository contentRepository)
        {
            _contentRepository = contentRepository;
        }

        public ActionResult Index(PromotionPage currentPage)
        {
            var model = new PromotionModel
            {
                Promotions = GetPromotions()
            };
            return View(model);
        }

        private IEnumerable<PromotionPage> GetPromotions()
        {
            return _contentRepository.GetChildren<PromotionPage>(ContentReference.StartPage)
                .Where(p => p.StartDate <= DateTime.Now && p.EndDate >= DateTime.Now);
        }
    }
}
