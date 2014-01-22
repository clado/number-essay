var fs = require('fs');
var through = require('through');
var trumpet = require('trumpet');
var trump = trumpet();

//number of words
var count = 1;

//opens files to read and write
var file = fs.createWriteStream('pipedessay.html');
var essay = fs.createReadStream('essay.html');

//selects the essay div from the html file
var selecting = trump.select('#essay').createStream();

//
selecting.pipe(through(function (buf){
	//places word count after words in the essay
	this.queue(buf.toString().replace(/[^>\s]\s/g, function (letter) { return  letter.substring(0, 1) + '<span>' + (count ++) + '</span> '}));
})).pipe(selecting);

//pipes read essay through trumpet and into writable file
essay.pipe(trump).pipe(file);


//event listeners to notify user of problem in excecution
selecting.on('error', function() {
 console.error('There is an error in your essay.html code. Did it get corrupeted?');
});
file.on('error', function() {
  console.error('There was an error reading your essay.html file. Is it in the right folder?');
});
essay.on('error', function() {
  console.error('There was an error writing your pipedessay.html file. Did you modify it while the program was running?');
});
essay.on('end', function() {
  console.log('Your essay has now been successfully numbered. Congratulations!');
});
