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
                endpoint: "http://3.15.84.174/data/xAPI",
                username: "f556e4764fb8518a15124adceea926295b34958f",
                password: "6cf5e6cd1c0fa2a34c33d3457b5f80d75324607b",
                allowFail: false
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
    if (email === undefined) {
        return "learn@clickhouse.com"
    } else {
        return email;
    }
}


/**
 * This line of code executes when the page is loaded, so we are calling that an "attempt"
 * @param {The name of the lesson being loaded} lesson_name
 */
function lesson_attempted(lesson_name) {
    var email = getUserEmail();
    var counter = 1;

    sendStatement(email, "attempted", lesson_name.concat("/0"));
    document.querySelectorAll('details').forEach(item => {
        item.addEventListener('toggle', event => {
          if (item.open) {
              sendStatement(email,'attempted',lesson_name.concat("/").concat(counter));
              counter++;
              //item.removeEventListener('toggle',arguments.callee);
          }
        }, 
        //We only want this event to fire once
        { once: true })
      })
};

