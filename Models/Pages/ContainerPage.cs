using Blend.Cms12.Business.Rendering;

namespace Blend.Cms12.Models.Pages;

/// <summary>
/// Used to logically group pages in the page tree
/// </summary>
[SiteContentType(
    GUID = "D178950C-D20E-4A46-90BD-5338B2424745",
    GroupName = Globals.GroupNames.Specialized)]
[SiteImageUrl]
[AvailableContentTypes(
    Availability.Specific,
    Include =
    [
        typeof(MallPage),
        typeof(ContactUsPage)
    ])]
public class ContainerPage : SitePageData, IContainerPage
{
}
