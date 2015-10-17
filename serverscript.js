var riddles = [{
    question: "What has roots but does not grow?",
    answer: "Mountain"
}, {
    question: "A box with no lock etcetera",
    answer: "Egg"
}, {
    question: "What voiceless howls blahblahblah",
    answer: "Wind"
}];

function rollback() {
    db.Execute('DROP TABLE Result');
    db.Execute('DROP TABLE Riddle');
    db.Execute('DROP TABLE Score');
}

function seed() {
    rollback();
    var riddles = db.Execute(
        'CREATE TABLE Riddle' +
        '(id INT  NOT NULL IDENTITY(1,1) PRIMARY KEY, ' +
        ' question TEXT NOT NULL, ' +
        ' answer   TEXT NOT NULL)'
    );

    for (var i = 0; i < riddles.length; i++)
        insertRiddle(riddles[i]);
}

function attemptAnswer() {
    var riddleId = args.Get("riddleId");
    var answer = args.Get("answer");

    var result = {
        id: riddleId,
        status: riddles[riddleId].answer === answer
    };
    return JSON.stringify(result);
}

function submitRiddle() {
    insertRiddle(args.Get("riddle"));
}

function insertRiddle(riddle) {
    db.Declare("question", riddle.question, true);
    db.Declare("answer", riddle.answer, true);

    db.Execute("INSERT INTO Riddle VALUES(@question, @answer)")
}

function getRiddles() {
    // var result = Object.keys(riddles).map(function(id) {
    //     return riddles[id];
    // });
    var result = db.Execute("SELECT * FROM Riddle");

    return result;
}