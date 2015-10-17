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

function getRiddles() {
    var result = [{
        id: 1,
        riddle: "What has roots but does not grow?"
    }, {
        id: 2,
        riddle: "A box with no lock etcetera"
    }, {
        id: 3,
        riddle: "What voiceless howls blahblahblah"
    }];
    
    return result;
}

function addRiddle() {
    var question = args.Get("question");
    var answer = args.Get("answer");
}

function postResult() {
    var user = args.Get("user");
    var points = args.Get("points");
}