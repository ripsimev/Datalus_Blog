using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Datalus.Web.Domain
{
    public class Blog
    {
    
        public int Id { get; set; }

        public string Title { get; set; }

        public string Author { get; set; }

        public string Message { get; set; }
        
        public bool IsFeatured { get; set; }
        
        public DateTime DateAdded { get; set; }
        
        public DateTime DateModified { get; set; }

        public List<Tag> Tags { get; set; }

        public List<Comment> Comments { get; set; }

        public string FirstName { get; set; }

        public string LastName {get; set; }

        public string KeyValue { get; set; }

        public string PhotoUrl { get; set; }

    }
}
