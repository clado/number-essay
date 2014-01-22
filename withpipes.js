var fs = require('fs');
var through = require('through');
var trumpet = require('trumpet');
var trump = trumpet();

var count = 1;

var selecting = trump.select('#essay').createStream();
selecting.pipe(through(function (buf){
	this.queue(buf.toString().replace(/[^>\s]\s/g, function (letter) { return  letter.substring(0, 1) + '<span>' + (count ++) + '</span> '}));
})).pipe(selecting);

var file = fs.createWriteStream('pipedessay.html');
var essay = fs.createReadStream('essay.html');

essay.pipe(trump).pipe(file);
console.log('Your essay should now be successfully numbered.');
