using Datalus.Web.Domain;
using Datalus.Web.Models.Responses;
using Datalus.Web.Services;
using Datalus.Web.Models.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace Datalus.Web.Controllers.Api
{
    //This is an API endpoint with server-side validation; API controller returns a JSON and regular controller returns HTML
    //The REST client is used to test your ApiController end points when you have them ready for testing. 

    [RoutePrefix("api/blog")] 
    public class BlogsApiController : BaseApiController
    {
        IBlogService _blogService;

        public BlogsApiController(IBlogService blogService)
        {
            _blogService = blogService;
        }


        [Route, HttpPost]
        public HttpResponseMessage Add(BlogAddRequest model) 
        {
            try
            {
                // if the Model does not pass validation, there will be an Error response returned with errors
                if (!ModelState.IsValid)
                {
                    return GetInvalidResponse(model);

                }
                int id = _blogService.Insert(model);
                ItemResponse<int> response = new ItemResponse<int>();
                response.Item = id;
                return Request.CreateResponse(HttpStatusCode.OK, response);

            }
            catch (Exception ex)
            {
                return GetErrorResponse(ex);
            }
        }


        [Route("{id:int}"), HttpPut]
        public HttpResponseMessage Update(BlogUpdateRequest model, int id)
        {
            try {
                if (!IsModelValid(model))
                {
                    return GetInvalidResponse(model);
                }
            _blogService.Update(model, id); SuccessResponse response = new SuccessResponse();
                return Request.CreateResponse(HttpStatusCode.OK, response);
           }
            catch (Exception ex)
            {
                return GetErrorResponse(ex);
            }
        }


        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage GetById(int id)
        {
            try
            {
                Blog blog = _blogService.GetById(id);
                ItemResponse<Blog> response = new ItemResponse<Blog>();
                response.Item = blog;
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return GetErrorResponse(ex);
            }
        }


        [Route, HttpGet]
        public HttpResponseMessage GetAll()
        {
            try
            {
                ItemsResponse<Blog> blogList = new ItemsResponse<Blog>();
                blogList.Items = _blogService.GetAll();
                return Request.CreateResponse(HttpStatusCode.OK, blogList);
            }
            catch (Exception ex)
            {
                return GetErrorResponse(ex);
            }
        }


        [Route("tags/{id:int}"), HttpGet]
        public HttpResponseMessage GetAllBlogsByTagId(int id)
        {
            try
            {

                ItemsResponse<Blog> blogList = new ItemsResponse<Blog>();
                blogList.Items = _blogService.GetAllBlogsByTagId(id);
                return Request.CreateResponse(HttpStatusCode.OK, blogList);
            }
            catch (Exception ex)
            {
                return GetErrorResponse(ex);
            }
        }


        [Route("{id:int}"), HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                _blogService.Delete(id);
                SuccessResponse response = new SuccessResponse();
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return GetErrorResponse(ex);
            }
        }


        [Route("tags"), HttpGet]
        public HttpResponseMessage GetTagsUsedByBlogs()
        {
            try
            {
                ItemsResponse<Tag> blogList = new ItemsResponse<Tag>();
                blogList.Items = _blogService.GetTagsUsedByBlogs();
                return Request.CreateResponse(HttpStatusCode.OK, blogList);
            }
            catch (Exception ex)
            {
                return GetErrorResponse(ex);
            }
        }
    }
}
