using System.Web;
using System.Web.Optimization;

namespace BettingCalculator.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/app/vendors/bootstrap-3.3.7-dist/js/bootstrap.js",
                      "~/app/vendors/CodeSeven-toastr/toastr.min.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/app/vendors/bootstrap-3.3.7-dist/css/bootstrap.css",
                      "~/app/css/site.css",
                      "~/app/vendors/basscss/basscss.css",
                      "~/app/vendors/CodeSeven-toastr/toastr.min.css"));
        }
    }
}
