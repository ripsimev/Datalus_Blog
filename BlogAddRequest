using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.ComponentModel.DataAnnotations; 

namespace Datalus.Web.Models.Requests
{
    public class BlogAddRequest
    {
        [Required]       
        [MaxLength(50)]  
        public string Title { get; set; }

        [Required]
        [MaxLength(20)]
        public string Author { get; set; }

        [Required]
        [MaxLength(1000)]
        [MinLength(2)]  
        public string Message { get; set; }
        public bool IsFeatured { get; set; }
        public List<int> TagIds { get; set; }

    }
}
