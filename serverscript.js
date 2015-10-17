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

var riddles = {
    1: {
        id: 1,
        question: "What has roots but does not grow?",
        answer: function(a) {
            return a === "Mountain";
        }
    },
    2: {
        id: 2,
        question: "A box with no lock etcetera",
        answer: function(a) {
            return a === "Egg";
        }
    },
    3: {
        id: 3,
        question: "What voiceless howls blahblahblah",
        answer: function(a) {
            return a === "Wind";
        }
    }
};

function getRiddles() {
    var result = Object.keys(riddles).map(function(id) {
        return riddles[id];
    });

    return JSON.stringify(result);
}

function attemptAnswer() {
    var riddleId = args.Get("riddleId");
    var answer = args.Get("answer");

    var result = {
        id: riddleId,
        //status: riddles[riddleId].answer(answer)
    };
    return JSON.stringify(result);
}