'use strict'

$(document).ready(init);

function init() {
    w3IncludeHTML()
    sticky()
}


function sticky() {
    $(".sticky").sticky({
        topSpacing: 60
    })
}
