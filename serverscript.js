// DATABASE PERSISTENCE EXAMPLE

// Retreive data from the database
function getData() {
    var queryResult = db.Execute('SELECT * FROM sampleTable');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

function rollback() {
    db.Execute('DROP TABLE Result');
    db.Execute('DROP TABLE Riddle');
    db.Execute('DROP TABLE Scores');
}
function seed() {    
    var riddles = db.Execute(
        'CREATE TABLE Riddle' +
        '(RiddleId INT  NOT NULL IDENTITY(1,1) PRIMARY KEY, ' +
        ' Question TEXT NOT NULL, ' +
        ' Answer   TEXT NOT NULL)'
    );
    
    var score = db.Execute(
        'CREATE TABLE Score' +
        '(ScoreId  INT NOT NULL IDENTITY(1,1) PRIMARY KEY, ' +
        ' UserId   INT NOT NULL, ' +
        ' RiddleId INT NOT NULL, ' +
        ' Fail     INT NOT NULL DEFAULT(0), ' + 
        ' Success  INT NOT NULL DEFAULT(0))' 
    );
}

function addRiddle() {
    var question = args.Get("question");
    var answer = args.Get("answer");
    
    var riddleId =
}

function postResult() {
    var user = args.Get("user");
    var points = args.Get("points");
}


// Insert into the database
function insert() {
    if (args.Get("value").length > 50)
        return '{"result":"error"}';
    else {
        db.Execute('INSERT INTO sampleTable VALUES(@currentUser,@value)');
        return getData();
    }
}

// OPEN DATA API EXAMPLE

function getOpenData() {
    var apiKey = ""; // Paste your API key here. IMPORTANT: DO NOT PUSH THIS TO GITHUB, STORE KEY IN DB
    if (apiKey == "")
        return '{"error":"No Api Key! Add your key in the server script file."}';

    return proxy.GetProxy('https://api.uwaterloo.ca/v2/foodservices/watcard.json?key=' + apiKey);
}