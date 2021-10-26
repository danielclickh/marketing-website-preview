/**
@module TinCan
**/


/**
 * 
 * @returns a new TinCan.LRS object that connects to the configured Learning Record Store
 */
function getLRS() {
    var lrs;

    try {
        lrs = new TinCan.LRS(
            {
                endpoint: "http://ec2-3-15-84-174.us-east-2.compute.amazonaws.com/data/xAPI",
                username: "f556e4764fb8518a15124adceea926295b34958f",
                password: "6cf5e6cd1c0fa2a34c33d3457b5f80d75324607b",
                allowFail: false
            }
        );
        console.log("LRS connected to successfully...");

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

/**
 * This line of code executes when the page is loaded, so we are calling that an "attempt"
 */
function init() {
    sendStatement("learn@clickhouse.com", "attempted", "gettingstarted/v1");
    document.querySelectorAll('.details').forEach(item => {
        item.addEventListener('toggle', event => {
          if (item.open) {
              sendStatement('learn@clickhouse.com','attempted','gettingstarted/v1/'.concat(event.target.id));
              //item.removeEventListener('toggle',arguments.callee);
          }
        }, 
        //We only want this event to fire once
        { once: true })
      })
};

$(document).ready(
    init()
);

/**
 * This is to send the event, and also to disable the button after it's clicked
 */
$( "#markcomplete" ).click(
    function(getLocation) {
            // Send an event
            sendStatement('learn@clickhouse.com','completed','gettingstarted/v1');

            // Disable the button
            $(this).attr("disabled", "disabled");
            $("#unbind").removeAttr("disabled");     
    }
);  
