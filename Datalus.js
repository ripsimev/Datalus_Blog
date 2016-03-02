var datalus = {
    layout: {},
    page: {
        handlers: {},
        startUp: null
        },
    services: {}
};

datalus.layout.startUp = function () {
    console.debug("datalus.layout.startUp");

    //this does a null check on datalus.page.startUp
    if (datalus.page.startUp) {
        console.debug("datalus.page.startUp");
        datalus.page.startUp();
    }
};

$(document).ready(datalus.layout.startUp);
