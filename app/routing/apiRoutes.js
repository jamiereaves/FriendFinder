// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendData = require("../data/friends");
var compatibilityIndex = 0;
var compatibilityArray = [];
var smallestIndexValue = 0;
var smallestIndex = 0;

var mostCompatibleFinder = function(){

    smallestIndexValue = compatibilityArray[0];
    if (compatibilityArray.length <= 1){
            smallestIndexValue = compatibilityArray[0];
            smallestIndex = 0;
    }
    else{
    for (a = 1 ; a < compatibilityArray.length ; a++){
            if ( compatibilityArray[a] < smallestIndexValue){
                    smallestIndexValue = compatibilityArray[a];
                    smallestIndex = a;
            }
        }
    }
    console.log("the smallest index is: " + smallestIndex + "it's value is: " + smallestIndexValue);
};
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware
    console.log(req.body.name);    
    console.log(req.body.scores);
        for (h = 0 ; h < friendData.length; h++) {
            console.log(friendData[h].name)
            console.log(friendData[h].scores);
            for (i = 0; i<friendData[h].scores.length ; i++){
                compatibilityIndex += Math.abs(friendData[h].scores[i] - parseInt(req.body.scores[i]));
            }
            console.log(req.body.name + " / " + friendData[h].name + " compatibility = " + compatibilityIndex);
            compatibilityArray.push(compatibilityIndex);
            console.log(compatibilityArray);
            //clear compatibility index
            compatibilityIndex = 0;
        }
        mostCompatibleFinder();
        compatibilityArray = [];
        friendData.push(req.body);
        console.log(friendData[smallestIndex]);
        res.json(friendData[smallestIndex]);

      //write a loop to check compatibility
    
  });

  /* ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    tableData = [];
    waitListData = [];

    console.log(tableData);
  });*/
};
