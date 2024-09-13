using System.ComponentModel.DataAnnotations;
using Blend.Cms12.Models.Blocks;
using Blend.Cms12.Models.Blocks.Footer;
using Blend.Cms12.Models.Blocks.Hero;
using Blend.Cms12.Models.Blocks.Malls;
using Blend.Cms12.Models.Blocks.PromotionEvent;
using EPiServer.SpecializedProperties;

namespace Blend.Cms12.Models.Pages;

/// <summary>
/// Used for the site's start page and also acts as a container for site settings
/// </summary>
[ContentType(
    GUID = "19671657-B684-4D95-A61F-8DD4FE60D559",
    GroupName = Globals.GroupNames.Specialized)]
[SiteImageUrl]
[AvailableContentTypes(
    Availability.Specific,
    Include =
    [
        typeof(ContainerPage),
        typeof(ProductPage),
        typeof(StandardPage),
        typeof(ISearchPage),
        typeof(LandingPage),
        typeof(ContentFolder),
        typeof(LoginPage),
        typeof(SignUpPage),
        typeof(MallPage), 
        typeof(ContactUsPage), 
        typeof(DownloadAppPage), 
    ], // Pages we can create under the start page...
    ExcludeOn =
    [
        typeof(ContainerPage),
        typeof(ProductPage),
        typeof(StandardPage),
        typeof(ISearchPage),
        typeof(LandingPage),
        typeof(LoginPage),
        typeof(SignUpPage)
    ])] // ...and underneath those we can't create additional start pages
public class StartPage : SitePageData
{
    [Display(
            Name = "Main Content Area",
            Description = "Area for adding blocks",
            GroupName = SystemTabNames.Content,
            Order = 320)]
    [CultureSpecific]
    public virtual ContentArea MainContentArea { get; set; }

    [Display(GroupName = Globals.GroupNames.SiteSettings, Order = 300)]
    public virtual LinkItemCollection ProductPageLinks { get; set; }

    [Display(GroupName = Globals.GroupNames.SiteSettings, Order = 350)]
    public virtual LinkItemCollection CompanyInformationPageLinks { get; set; }

    [Display(GroupName = Globals.GroupNames.SiteSettings, Order = 400)]
    public virtual LinkItemCollection NewsPageLinks { get; set; }

    [Display(GroupName = Globals.GroupNames.SiteSettings, Order = 450)]
    public virtual LinkItemCollection CustomerZonePageLinks { get; set; }

    [Display(GroupName = Globals.GroupNames.SiteSettings)]
    public virtual PageReference GlobalNewsPageLink { get; set; }

    [Display(GroupName = Globals.GroupNames.SiteSettings)]
    public virtual PageReference ContactsPageLink { get; set; }

    [Display(GroupName = Globals.GroupNames.SiteSettings)]
    public virtual PageReference SearchPageLink { get; set; }

    [Display(GroupName = Globals.GroupNames.SiteSettings)]
    public virtual SiteLogotypeBlock SiteLogotype { get; set; }

    [Display(GroupName = Globals.GroupNames.SiteSettings)]
    public virtual ButtonHeaderBlock ButtonHeader{ get; set; }

    [Display(GroupName = Globals.GroupNames.SiteSettings)]
    public virtual FooterCopyrightBlock FooterCopyright { get; set; }
}
