using Datalus.Data;
using Datalus.Web.Domain;
using Datalus.Web.Models.Requests;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Datalus.Web.Services
{
    public class BlogService : BaseService, IBlogService
    {
        private static readonly string _awsAccessKey = ConfigurationManager.AppSettings["AWSAccessKey"];
        private static readonly string _awsSecretKey = ConfigurationManager.AppSettings["AWSSecretKey"];
        private static readonly string _awsFolder = ConfigurationManager.AppSettings["AWSFolder"];
        private static readonly string _awsbucket = ConfigurationManager.AppSettings["AWSBucket"];
        private static readonly string _awsBaseUrl = ConfigurationManager.AppSettings["AWSBaseUrl"];

        public int Insert(BlogAddRequest model) 
        {
            int id = 0;

            DataProvider.ExecuteNonQuery(GetConnection, "dbo.Blogs_Insert" 
               , inputParamMapper: delegate(SqlParameterCollection parameters)  
               {
                   MapCommonBlogParameters(model, parameters);

                   SqlParameter newIdParameter = new SqlParameter("@Id", System.Data.SqlDbType.Int); 
                   newIdParameter.Direction = System.Data.ParameterDirection.Output;
                   parameters.Add(newIdParameter);
               },
               returnParameters: delegate(SqlParameterCollection param)  
               {
                   int.TryParse(param["@Id"].Value.ToString(), out id);
               }
               );
            if (model.TagIds != null)
            {
                foreach (int blogTagId in model.TagIds)
                {
                    DataProvider.ExecuteNonQuery(GetConnection, "dbo.BlogTags_Insert"
                        , inputParamMapper: delegate(SqlParameterCollection paramCollection)
                        {
                            paramCollection.AddWithValue("@BlogId", id);
                            paramCollection.AddWithValue("@TagId", blogTagId);

                        }, returnParameters: null
                       );
                }
            }
            return id;
        }


        public void Update(BlogUpdateRequest model, int id)
        {
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.Blogs_Update"
               , inputParamMapper: delegate(SqlParameterCollection parameters)
               {
                   MapCommonBlogParameters(model, parameters);
                   parameters.AddWithValue("@Id", id);

               }, returnParameters: null
               );
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.BlogTags_DeleteByBlogId"
                , inputParamMapper: delegate(SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@BlogId", id);
                }
                , returnParameters: null);
            if (model.TagIds != null)
            {
                foreach (int blogTagId in model.TagIds)
                {
                    DataProvider.ExecuteNonQuery(GetConnection, "dbo.BlogTags_Insert"
                        , inputParamMapper: delegate(SqlParameterCollection paramCollection)
                        {
                            paramCollection.AddWithValue("@BlogId", id);
                            paramCollection.AddWithValue("@TagId", blogTagId);
                        }, returnParameters: null
                    );
                }
            };
        }


        public void Delete(int id)
        {
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.BlogTags_DeleteByBlogId"
                , inputParamMapper: delegate(SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@BlogId", id);
                }, returnParameters: null
                );
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.Blogs_Delete"
                , inputParamMapper: delegate(SqlParameterCollection paramCollection)
                 {
                     paramCollection.AddWithValue("@Id", id);
                 }, returnParameters: null
                );
        }


        public Blog GetById(int id)
        {
            Blog blog = null;
            Dictionary<int, Comment> commentsDictionary = new Dictionary<int, Comment>();

            DataProvider.ExecuteCmd(GetConnection, "dbo.Blogs_SelectById"
                , inputParamMapper: delegate(SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);
                }
                , map: delegate(IDataReader reader, short resultSetNumber)
                {
                    if (resultSetNumber == 0)
                    {
                        blog = MapBlog(reader);
                    }
                    else if (resultSetNumber == 1)
                    {
                        int columnOrdPosition = 0;
                        int blogId = reader.GetSafeInt32(columnOrdPosition++);

                        Tag tag = new Tag();
                        tag.Id = reader.GetSafeInt32(columnOrdPosition++);
                        tag.Name = reader.GetSafeString(columnOrdPosition++);
                        if (blog.Tags == null)
                        {
                            blog.Tags = new List<Tag>();
                        }
                        blog.Tags.Add(tag);
                    }
                    else if (resultSetNumber == 2)
                    {
                        Comment comment = MapComment(reader);
                        if (blog.Comments == null)
                        {
                            blog.Comments = new List<Comment>();
                        }
                        blog.Comments.Add(comment);
                        if (commentsDictionary == null)
                        {
                            commentsDictionary = new Dictionary<int, Comment>();
                        }
                        commentsDictionary.Add(comment.Id, comment);
                    }
                }
                );
            foreach (Comment child in commentsDictionary.Values)
            {
                if (child.ParentId == null || child.ParentId.Value == 0) continue;
                var parentComment = commentsDictionary[child.ParentId.Value];
                if (parentComment.Comments == null)
                {
                    parentComment.Comments = new List<Comment>();
                }
                parentComment.Comments.Add(child);
            }
            return blog;
        }


        public List<Blog> GetAll()
        {
            List<Blog> blogList = null;
            Dictionary<int, Blog> blogDictionary = null;
            Dictionary<int, Comment> commentsDictionary = new Dictionary<int, Comment>();

            DataProvider.ExecuteCmd(GetConnection, "Blogs_SelectAll"
                , inputParamMapper: null
            , map: delegate(IDataReader reader, short resultSetNumber)
              {
                  if (resultSetNumber == 0)
                  {
                      Blog blog = MapBlog(reader);
                      if (blogList == null)
                      {
                          blogList = new List<Blog>();
                      }
                      if (blogDictionary == null)
                      {
                          blogDictionary = new Dictionary<int, Blog>();

                      }
                      blogList.Add(blog);
                      blogDictionary.Add(blog.Id, blog);
                  }
                  else if (resultSetNumber == 1)
                  {
                      int columnOrdPosition = 0;
                      int blogId = reader.GetSafeInt32(columnOrdPosition++);
                      Tag tag = new Tag();
                      tag.Id = reader.GetSafeInt32(columnOrdPosition++);
                      tag.Name = reader.GetSafeString(columnOrdPosition++);
                      if (blogDictionary.ContainsKey(blogId))
                      {
                          Blog parentBlog = blogDictionary[blogId];
                          if (parentBlog.Tags == null)
                          {
                              parentBlog.Tags = new List<Tag>();
                          }
                          parentBlog.Tags.Add(tag);
                      }
                  }
                  else if (resultSetNumber == 2)
                  {
                      Comment c = MapComment(reader);
                      Blog parentBlog = blogDictionary[c.OwnerId];
                      if (parentBlog.Comments == null)
                      {
                          parentBlog.Comments = new List<Comment>();
                      }
                      parentBlog.Comments.Add(c);
                      if (commentsDictionary == null)
                      {
                          commentsDictionary = new Dictionary<int, Comment>();
                      }
                      commentsDictionary.Add(c.Id, c);
                  }
              });

            foreach (Comment child in commentsDictionary.Values)
            {
                if (child.ParentId == null || child.ParentId.Value == 0) continue;
                var parentComment = commentsDictionary[child.ParentId.Value];
                if (parentComment.Comments == null)
                {
                    parentComment.Comments = new List<Comment>();
                }
                parentComment.Comments.Add(child);
            }

            return blogList;
        }


        public List<Blog> GetAllBlogsByTagId(int id)
        {
            List<Blog> blogList = null;
            Dictionary<int, Blog> blogDictionary = null;
            Dictionary<int, Comment> commentsDictionary = new Dictionary<int, Comment>();

            DataProvider.ExecuteCmd(GetConnection, "dbo.Blogs_SelectByTagId"
                , inputParamMapper: delegate(SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@TagId", id);
                }
            , map: delegate(IDataReader reader, short resultSetNumber)
            {
                if (resultSetNumber == 0)
                {
                    Blog blog = MapBlog(reader);
                    if (blogList == null)
                    {
                        blogList = new List<Blog>();
                    }
                    if (blogDictionary == null)
                    {
                        blogDictionary = new Dictionary<int, Blog>();

                    }
                    blogList.Add(blog);
                    blogDictionary.Add(blog.Id, blog);
                }
                else if (resultSetNumber == 1)
                {
                    int columnOrdPosition = 0;
                    int blogId = reader.GetSafeInt32(columnOrdPosition++);
                    Tag tag = new Tag();
                    tag.Id = reader.GetSafeInt32(columnOrdPosition++);
                    tag.Name = reader.GetSafeString(columnOrdPosition++);
                    if (blogDictionary.ContainsKey(blogId))
                    {
                        Blog parentBlog = blogDictionary[blogId];
                        if (parentBlog.Tags == null)
                        {
                            parentBlog.Tags = new List<Tag>();
                        }
                        parentBlog.Tags.Add(tag);

                    }
                }
                else if (resultSetNumber == 2)
                {
                    Comment c = MapComment(reader);
                    Blog parentBlog = blogDictionary[c.OwnerId];
                    if (parentBlog.Comments == null)
                    {
                        parentBlog.Comments = new List<Comment>();
                    }
                    parentBlog.Comments.Add(c);
                    if (commentsDictionary == null)
                    {
                        commentsDictionary = new Dictionary<int, Comment>();
                    }
                    commentsDictionary.Add(c.Id, c);
                }
            });

            foreach (Comment child in commentsDictionary.Values)
            {
                if (child.ParentId == null || child.ParentId.Value == 0) continue;
                var parentComment = commentsDictionary[child.ParentId.Value];
                if (parentComment.Comments == null)
                {
                    parentComment.Comments = new List<Comment>();
                }
                parentComment.Comments.Add(child);
            }

            return blogList;
        }

        public List<Tag> GetTagsUsedByBlogs()
        {
            List<Tag> tags = null;
            DataProvider.ExecuteCmd(GetConnection, "dbo.Tags_SelectAllUsedByBlogs"
                , inputParamMapper: null
                , map: delegate(IDataReader reader, short resultSetNumber)
                {
                    Tag tag = new Tag();
                    int columnOrdPosition = 0;
                    tag.Id = reader.GetSafeInt32(columnOrdPosition++);
                    tag.Name = reader.GetSafeString(columnOrdPosition++);
                    tag.Approved = reader.GetSafeBool(columnOrdPosition++);
                    if (tags == null)
                    {
                        tags = new List<Tag>();
                    }

                    tags.Add(tag);
                });
            return tags;
        }


        public void MapCommonBlogParameters(BlogAddRequest model, SqlParameterCollection parameters)
        {
            parameters.AddWithValue("@Title", model.Title);
            parameters.AddWithValue("@Author", model.Author);
            parameters.AddWithValue("@Message", model.Message);
            parameters.AddWithValue("@IsFeatured", model.IsFeatured);
            parameters.AddWithValue("@UserId", UserService.GetCurrentUserId());
        }


        private Blog MapBlog(IDataReader reader)
        {
            Blog blog = new Blog();
            int startingIndex = 0;
            blog.Id = reader.GetSafeInt32(startingIndex++);
            blog.Title = reader.GetSafeString(startingIndex++);
            blog.Author = reader.GetSafeString(startingIndex++);
            blog.Message = reader.GetSafeString(startingIndex++);
            blog.IsFeatured = reader.GetBoolean(startingIndex++);
            blog.DateAdded = reader.GetSafeDateTime(startingIndex++);
            blog.DateModified = reader.GetSafeDateTime(startingIndex++);
            blog.FirstName = reader.GetSafeString(startingIndex++);
            blog.LastName = reader.GetSafeString(startingIndex++);
            blog.KeyValue = reader.GetSafeString(startingIndex++);
            if (blog.KeyValue != null)
            {
                blog.PhotoUrl = "https://" + _awsbucket + "." + _awsBaseUrl + "/" + _awsFolder + "/" + blog.KeyValue;
            }
            else
            {
                blog.PhotoUrl = blog.KeyValue;
            }
            return blog;
        }


        private Comment MapComment(IDataReader reader)
        {
            Comment comment = new Comment();
            int startingIndex = 0;
            comment.Id = reader.GetSafeInt32(startingIndex++);
            comment.UserId = reader.GetSafeString(startingIndex++);
            comment.OwnerId = reader.GetSafeInt32(startingIndex++);
            comment.OwnerTypeId = reader.GetSafeInt32(startingIndex++);
            comment.Message = reader.GetSafeString(startingIndex++);
            comment.ParentId = reader.GetSafeInt32Nullable(startingIndex++);
            comment.DateAdded = reader.GetSafeDateTime(startingIndex++);
            comment.DateModified = reader.GetSafeDateTime(startingIndex++);
            comment.KeyValue = reader.GetSafeString(startingIndex++);
            comment.FirstName = reader.GetSafeString(startingIndex++);
            comment.LastName = reader.GetSafeString(startingIndex++);
            if (comment.KeyValue != null)
            {
                comment.PhotoUrl = "https://" +  _awsbucket + "." + _awsBaseUrl + "/" + _awsFolder + "/" + comment.KeyValue;
            }
            else
            {
                comment.PhotoUrl = comment.KeyValue;
            }
            return comment;
        }
    }
}
