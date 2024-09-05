using Blend.Cms12.Models.Pages;
using Blend.Cms12.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Blend.Cms12.Controllers
{
    public class EventController : PageControllerBase<EventPage>
    {
        private readonly IContentRepository _contentRepository;

    public EventController(IContentRepository contentRepository)
    {
        _contentRepository = contentRepository;
    }

    public ActionResult Index(EventPage currentPage)
    {
        var model = new EventModel
        {
            Events = GetEvents()
        };
        return View(model);
    }

    private IEnumerable<EventPage> GetEvents()
    {
        return _contentRepository.GetChildren<EventPage>(ContentReference.StartPage)
            .Where(p => p.StartDate <= DateTime.Now && p.EndDate >= DateTime.Now);
    }
}
}
