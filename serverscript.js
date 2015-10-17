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

function dropSchema() {
    db.Execute('DROP TABLE Riddle');
    db.Execute('DROP TABLE Score');
}

function createSchema() {
    var response = "";
    response += db.Execute(
        'CREATE TABLE Riddle' +
        '(id INT  NOT NULL IDENTITY(1,1) PRIMARY KEY, ' +
        ' question TEXT NOT NULL, ' +
        ' answer   TEXT NOT NULL)'
    );

    response += db.Execute(
        'CREATE TABLE Score' +
        '(id INT NOT NULL IDENTITY (1,1), ' +
        ' userId nvarchar(20) NOT NULL, ' +
        ' riddleId INT NOT NULL, ' +
        ' success INT NOT NULL DEFAULT(0), ' +
        ' fail INT NOT NULL DEFAULT(0), ' +
        ' PRIMARY KEY (userId, riddleId))'
    );

    return response;
}

function seed() {
    var response = "";
    dropSchema();
    response += createSchema();

    for (var i = 0; i < riddles.length; i++) {
        var riddle = riddles[i];
        insertRiddle(riddle.question, riddle.answer);
    }

    return response;
}

function attemptAnswer() {
    var answer = args.Get("answer");

    var riddle = JSON.parse(db.Execute("SELECT * FROM Riddle WHERE id = @riddleId"))[0];
    var success = riddle.answer === answer;

    var field = success ? "success" : "fail";

    db.Execute("INSERT INTO Score VALUES(@currentUser, @riddleId, 0, 0)");
    db.Execute("UPDATE Score SET " + field + " = " + field +
        " + 1 WHERE userId = @currentUser AND riddleId = @riddleId");

    var result = {
        status: riddle.answer === answer
    };
    return JSON.stringify(result);
}

function submitRiddle() {
    var question = args.Get("question");
    var answer = args.Get("answer");
    insertRiddle(question, answer);

    return "";
}

function insertRiddle(question, answer) {
    db.Declare("question", question, true);
    db.Declare("answer", answer, true);

    db.Execute("INSERT INTO Riddle VALUES(@question, @answer)")
}

function getRiddles() {
    var qResult = JSON.parse(db.Execute("SELECT * FROM Score WHERE userId = @currentUser AND success > 0"))
        .map(function(s) {
            return s.riddleId;
        });
    var result = JSON.parse(db.Execute("SELECT * FROM Riddle"));

    result = result.filter(function(r) {
        return qResult.indexOf(r.id) == -1;
    });
    return JSON.stringify(result);
}

function getUserScore() {
    var result = db.Execute("SELECT COUNT(1) FROM Score WHERE userId = @currentUser AND success > 0");
    return result;
}

function getUserHighScores() {
    var apiKey = "dd1b277b2261f93efd9ae9cc28627238";
    var scores = JSON.parse(db.Execute("SELECT userId, COUNT(1) as count FROM Score WHERE success > 0 GROUP BY userId"));
    
    scores = scores.sort(function(s1, s2) { return s1.count - s2.count; };
    // var data = scores
    // 	.map(function(score) { 
    //         return 
    //         return "https://api.uwaterloo.ca/v2/directory/" + ui + ".json?key=" + apiKey;
    //     }).map(function(url) { 
    //         var externalData = JSON.parse(proxy.GetProxy(url)); 
    //         
    //     });
    
    return JSON.stringify(scores);
}