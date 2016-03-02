
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Datalus.Web.Models.ViewModels;

namespace Datalus.Web.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("blog")]
    public class BlogController : BaseController
    {
        // Blog List View in Jquery
        public ActionResult Blog(int id = 0)
        {
            ItemViewModel<int> model = new ItemViewModel<int>();
            model = DecorateViewModel(model);
            model.Item = id;
            return View(model);                
        }
        
        // Blog List View in Jquery
        public ActionResult List()
        {
            BaseViewModel model = new BaseViewModel();
            model = DecorateViewModel(model);
            return View(model);
        }

        // Post/Update Blog View in Angular
        [Route("add")]
        [Route("{id:int}/edit")]
        public ActionResult Blogs(int id = 0)
        {
            ItemViewModel<int> model = new ItemViewModel<int>();
            model = DecorateViewModel(model);
            model.Item = id;
            return View(model);
        }

        // Blog List View in Angular
        [Route("list")]
        public ActionResult BlogsList()
        {
            BaseViewModel model = new BaseViewModel();
            model = DecorateViewModel(model);
            return View();
        }

    }
}
