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
    [RoutePrefix("blogs")]
    public class BlogController : BaseController
    {
        //Blog Form View - jQuery
        [Route("add")]
        [Route("{id:int}/update")]
        public ActionResult Blog(int id = 0)
        {
            ItemViewModel<int> model = new ItemViewModel<int>();
            model = DecorateViewModel(model);
            model.Item = id;
            return View(model);                
        }

        //Blog List View - jQuery
        [Route("list")]
        public ActionResult List()
        {
            BaseViewModel model = new BaseViewModel();
            model = DecorateViewModel(model);
            return View(model);
        }

        //Blog Form View - Angular
        [Route("create")]
        [Route("{id:int}/edit")]
        public ActionResult Blogs(int id = 0)
        {
            ItemViewModel<int> model = new ItemViewModel<int>();
            model = DecorateViewModel(model);
            model.Item = id;
            return View(model);
        }

        //Blog List View - Angular
        [Route]
        public ActionResult BlogsList()
        {
            BaseViewModel model = new BaseViewModel();
            model = DecorateViewModel(model);
            return View();
        }
    }
}
