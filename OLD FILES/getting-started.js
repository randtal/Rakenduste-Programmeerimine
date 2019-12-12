//getting-started.js from http://mongoosejs.com/docs/index.html

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error:"));

db.once('open', function callback() {
    //we're connected!

    // NOTE: methods must be added to the schema before compiling it with mongoose.model()
    kittySchema.methods.speak = function () {

        var greeting = this.name
            ? "Meow name is " + this.name
            : "I don't have a name";

        console.log(greeting);
    };


    var silence = new Kitten({name: 'Silence'});
    console.log(silence.name); // "Silence"

    var fluffy = new Kitten({ name: 'fluffy' });
    fluffy.speak(); // "Meow name is fluffy"

    fluffy.save(function (err, fluffy) {
        if (err) return console.error(err);
        fluffy.speak();
    });

    Kitten.find(function (err, kittens) {
        if (err) return console.error(err);
        console.log(kittens)
    });

    Kitten.find({ name: /^fluff/ }, simpleCallback);
});

function simpleCallback (err, results) {
    console.log(results);
};
