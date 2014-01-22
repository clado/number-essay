var fs = require('fs');
var through = require('through');
var trumpet = require('trumpet');
var trump = trumpet();

var count = 1;

var selecting = trump.select('#essay').createStream();

selecting.on('error', function() {
 console.error('There is an error in your essay.html code. Did it get corrupeted?');
});

selecting.pipe(through(function (buf){
	this.queue(buf.toString().replace(/[^>\s]\s/g, function (letter) { return  letter.substring(0, 1) + '<span>' + (count ++) + '</span> '}));
})).pipe(selecting);

var file = fs.createWriteStream('pipedessay.html');
var essay = fs.createReadStream('essay.html');


file.on('error', function() {
  console.error('There was an error reading your essay.html file. Is it in the right folder?');
});
essay.on('error', function() {
  console.error('There was an error writing your pipedessay.html file. Did you modify it while the program was running?');
});
essay.on('end', function() {
  console.log('Your essay has now been successfully numbered. Congratulations!');
});



essay.pipe(trump).pipe(file);

