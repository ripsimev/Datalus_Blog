//An ajax request call for blog methods to connect the client to the server side
if (!datalus.services.blog) {
    datalus.services.blog = {};  
}


//AJAX FOR BLOG POST
datalus.services.blog.insert = function (myData, onSuccess, onError) {
    console.log("Ajax call for Insert");

    var url = "/api/blog/";
    var settings = {
        cache: false  
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8" 
        , data: myData
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"  
    };
        $.ajax(url, settings);
}


//AJAX FOR BLOG UPDATE
datalus.services.blog.update = function (myId, myData, onSuccess, onError) {
    console.log("Ajax call for Update");

    var url = "/api/blog/" + myId;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: myData
        , dataType: "json"                          
        , success: onSuccess     
        , error: onError                
        , type: "PUT"
    };
        $.ajax(url, settings);
}


//AJAX FOR GET
datalus.services.blog.getById = function (id, onSuccess, onError) {
    console.log("Ajax call for getById");
    var url = "/api/blog/" + id;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
        $.ajax(url, settings);
}


//AJAX FOR GET(LIST)
datalus.services.blog.getAllBlogs = function (onSuccess, onError) {
    console.log("Ajax call for getAll");
    var url = "/api/blog/";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
        $.ajax(url, settings);
}


//AJAX FOR DELETE
datalus.services.blog.deleteBlog = function (id, onSuccess, onError) {
    console.log("Ajax call for Delete");
    var url = "/api/blog/" + id;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "DELETE"
    };
        $.ajax(url, settings);
}


datalus.services.blog.getTagsUsedByBlogs = function (onSuccess, onError) { 
    console.log("Ajax call for getTagsUsedByBlogs");
    var url = "/api/blog/tags";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
}


datalus.services.blog.getAllBlogsByTagId = function (id, onSuccess, onError) {
    console.log("Ajax call for getAllBlogsByTagId");
    var url = "/api/blog/tags/" + id;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
}
