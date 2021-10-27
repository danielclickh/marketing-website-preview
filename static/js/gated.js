function gated(){
    gateCheck();
    gateEvents();
    var email = localStorage.getItem('email');
    
    // -------------------------------------------------------
    // FUNCTIONS
    // -------------------------------------------------------
    function gateCheck() {
            // Gate is shown by default. Let's check if it should be removed
            var hideGate = localStorage.getItem('email-stored') || false;
            if (hideGate) {
                    gateHide();
            }
    }
    function gateEvents() {
            // Handle form submission
            document.querySelector('.capture-email').addEventListener('submit', function(e) {
                    e.preventDefault();
                    // Do something with the form data here...
                    // Then...
                    var email = document.getElementById("email").value;
                    localStorage.setItem('email', email);
                    
                    // Save preference to localstorage
                    gatePrevent();
                    // Hide the gate immediately
                    gateHide();
            });
    }
    function gateHide() {
            // Remove the .gated class from .content which hides the entire .gate div
            //document.querySelector('.content').classList.remove('gated');
            document.getElementById("gate").style.display = "none";
    }
    function gatePrevent() {
            // Prevent the gate from being shown from this point forward
            localStorage.setItem('email-stored', true);
    }
}