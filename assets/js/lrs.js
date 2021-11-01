/**
@module TinCan
**/

function isEmailSet()
{
    // localStorage.removeItem('email-stored');
    // localStorage.removeItem('email');
    if(localStorage.getItem('email-stored')) {
        return true;
    } else {
        return false;
    }    
}

/**
 * Displays a popup window prompting the visitor for their work email address
 * @returns n/a
 */
 function gated(event){
    // Figure out where the mouse was clicked and popup the dialog there
    var gateddiv = document.getElementById("gate_cta");
    gateddiv.style.top = ''.concat(event.pageY-50).concat('px');
    gateddiv.style.left = ''.concat(event.pageX).concat('px');
    gateddiv.style.display = "block";

    // Setup a hanlder that stores the email address and hides the div
    document.querySelector('.capture-email').addEventListener('submit', function(e) {
            e.preventDefault();
            //Retrieve the value from the form
            var email = document.getElementById("email").value;
            //Save the email to a cookie
            localStorage.setItem('email', email);
            localStorage.setItem('email-stored', true);
            //We have a new email, so let's send that detail to the LRS
            sendStatement(email, "registered", lesson_name.concat("/registered"));
            // It's easier to just reload the page to pickup the changes
            location.reload();    
    });
}



/**
 * 
 * @returns a new TinCan.LRS object that connects to the configured Learning Record Store
 */
function getLRS() {
    var lrs;

    try {
        lrs = new TinCan.LRS(
            {
                endpoint: "https://clickhouse.com/learn/data/xAPI",
                //endpoint: "http://ec2-18-222-223-240.us-east-2.compute.amazonaws.com/data/xAPI",
                username: "f556e4764fb8518a15124adceea926295b34958f",
                password: "6cf5e6cd1c0fa2a34c33d3457b5f80d75324607b",
                allowFail: true
            }
        );
        return lrs;
    }
    catch (ex) {
        console.log("Failed to setup LRS object: ", ex);
        return null;
    }
};

/**
 * 
 * @param {The email address of the learner} p_user 
 * @param {The verb (action) of this particular event} p_verb 
 * @param {Name of the learning module and other details} p_id 
 * @returns a new TinCan.Statement object containing the details of the provided parameters
 */
function getStatement(p_user,p_verb,p_id) {

    full_verb = "http://adlnet.gov/expapi/verbs/".concat(p_verb);
    if(p_user === undefined) {
        p_user = "learn@clickhouse.com";
    }
    full_user = "mailto:".concat(p_user);
    full_id = "http://clickhouse.com/".concat(p_id);

    var statement = new TinCan.Statement(
        {
            actor: {
                mbox: `${full_user}`
            },
            verb: {
                id:  `${full_verb}`
            },
            target: {
                id: `${full_id}`
            }
        }
    );    
    return statement;
};

/**
 * 
 * @param {The email address of the learner} p_user 
 * @param {The verb (action) of this particular event} p_verb 
 * @param {Name of the learning module and other details} p_id 
 */
function sendStatement(p_user,p_verb,p_id) {
    var lrs = getLRS();
    var statement = getStatement(p_user,p_verb,p_id);

    lrs.saveStatement(
        statement,
        {
            callback: function (err, xhr) {
                if (err !== null) {
                    if (xhr !== null) {
                        console.log("Failed to save statement: " + xhr.responseText + " (" + xhr.status + ")");
                        // TODO: do something with error, didn't save statement
                        return;
                    }

                    console.log("Failed to save statement: " + err);
                    // TODO: do something with error, didn't save statement
                    return;
                }

                console.log("Statement saved");
                // TOOO: do something with success (possibly ignore)
            }
        }
    );
};

function getUserEmail() {
    var email = localStorage.getItem('email');
    if (email === null) {
        return "learn@clickhouse.com";
    } else {
        return email;
    }
}


/**
 * This function executes when the page is loaded, so we are calling that an "attempt"
 * @param {The name of the lesson being loaded} lesson_name
 */
function lesson_attempted(lesson_name) {
    //The visitor's email address might be already stored in a cookie
    var email = getUserEmail();

    //This gets called when the page is first loaded
    try {
        sendStatement(email, "attempted", lesson_name.concat("/0"));
    }catch(error) {
        console.log(error);
    }

    //Let's see if the page is gated
    if(document.getElementById("gated").value && !isEmailSet()) {
        //We need their email address before showing any instructions
        document.querySelectorAll('details').forEach(item => {
            //Don't let the details block be opened
            item.addEventListener('click', event => {
                console.log("sorry...page is gated");
                event.preventDefault();
                gated(event);
            },
            {once: false})
        });
    } else {
        //Add an event handler to each "Show Instructions" section
        document.querySelectorAll('details').forEach(item => {
            // Send an event each time an instruction is opened
            item.addEventListener('toggle', event => {
            if (item.open) {
                sendStatement(email,'attempted',lesson_name.concat("/").concat(item.id));
                //item.removeEventListener('toggle',arguments.callee);
                }
            }, 
            //We only want this event to fire once
            { once: true })
        });
    } 
};

