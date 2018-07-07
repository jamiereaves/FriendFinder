// ===============================================================================
// LOAD DATA
// linking the route to a "data" source.
// This data source holds an array of information on friends.js


var friendData = require("../data/friends");
//set up global variables to hold information used to determine the best match
var compatibilityIndex = 0;
var compatibilityArray = [];
var smallestIndexValue = 0;
var smallestIndex = 0;
//function that determines the index (of friendData) that corresponds to the the smallest (i.e. most compatible) compatibility index
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
};
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Request
  // when the user visits the link
  // (ex: localhost:PORT/api/friends => a JSON display of the data in the friendData)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });


  // API POST Request
  // when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array

  app.post("/api/friends", function(req, res) {
        //for loop within a for loop that determines the compatibility index (i.e. the total of the absolute value
        //of the difference between each corresponding index in the existing users' scores array and in the new user's scores array)
        for (h = 0 ; h < friendData.length; h++) {
            for (i = 0; i<friendData[h].scores.length ; i++){
                compatibilityIndex += Math.abs(friendData[h].scores[i] - parseInt(req.body.scores[i]));
            }
            //push each compatibilityIndex value to the compatibility Array
            compatibilityArray.push(compatibilityIndex);
            //clear compatibility index
            compatibilityIndex = 0;
        }
        //call the mostCompatibleFinder function to determine the index of the user of friendData with the smallest compatibility index
        //I know that this will always return the last user in  the case of a tie...I hope to add a function that will deal with displaying
        //all users in the case of a tie in compatibility
        mostCompatibleFinder();
        //empty compatibilityArray for future entries
        compatibilityArray = [];
        //push the new user's object to friendData
        friendData.push(req.body);
        //send back the most compatible user's object data
        res.json(friendData[smallestIndex]);

    
  });

  
};
