
// Put any init-type function calls here...
window.onload=function() {

    // If this webpage contains any section with an id set to "gated", then
    // we call the gated() function - which requires an email address
    // var gatedsection = document.getElementById("gatedsection");
    // if(gatedsection) {
    //     gated();
    // }    

    lesson_name_div = document.getElementById("lesson_name");
    if(lesson_name_div != undefined) {
        lesson_attempted(lesson_name.value);
    }
}
