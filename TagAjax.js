if (!datalus.services.tags) {
    datalus.services.tags = {};
}


datalus.services.tags.create = function (formData, onSuccess, onError) {
    var url = "/api/tagcenter";
    var settings = {
        cache: false
        , contentType: "application/json; charset=UTF-8"
        , data: JSON.stringify(formData)
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
    };
    $.ajax(url, settings);
}


datalus.services.tags.edit = function (id, formData, onSuccess, onError) {
    var url = "/api/tagcenter/" + id;
    var settings = {
        cache: false
    , contentType: "application/json; charset=UTF-8"
    , data: JSON.stringify(formData)
    , dataType: "json"
    , success: onSuccess
    , error: onError
    , type: "PUT"
    };
    $.ajax(url, settings);
}


datalus.services.tags.ajaxGetAll = function (onSuccess, onError) {

    var url = "/api/tagcenter";
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


datalus.services.tags.getById = function (id, onSuccess, onError) {
    var url = "/api/tagcenter/" + id;
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


datalus.services.tags.delete = function (id, onSuccess, onError) {
    var url = "/api/tagcenter/" + id;
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
