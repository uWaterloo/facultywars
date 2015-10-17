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
    db.Execute(
        'CREATE TABLE Riddle' +
        '(id INT  NOT NULL IDENTITY(1,1) PRIMARY KEY, ' +
        ' question TEXT NOT NULL, ' +
        ' answer   TEXT NOT NULL)'
    );

    for (var i = 0; i < riddles.length; i++) {
        var riddle = riddles[i];
        insertRiddle(riddle.question, riddle.answer);
    }
    
    return "";
}

function attemptAnswer() {
    var answer = args.Get("answer");
    
    var riddle = JSON.parse(db.Execute("SELECT * FROM Riddle WHERE id = @riddleId"))[0];

    var result = {
        status: riddle.answer === answer
    };
    return JSON.stringify(result);
}

function submitRiddle() {
    var question = args.Get("question");
    var answer = args.Get("answer");
    insertRiddle(question, answer);
}

function insertRiddle(question, answer) {
    db.Declare("question", question, true);
    db.Declare("answer", answer, true);

    db.Execute("INSERT INTO Riddle VALUES(@question, @answer)")
}

function getRiddles() {
    // var result = Object.keys(riddles).map(function(id) {
    //     return riddles[id];
    // });
    var result = db.Execute("SELECT * FROM Riddle");

    return result;
}