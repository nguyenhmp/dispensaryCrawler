var express = require('express')
var cheerio = require('cheerio')
var htmlSnapshots = require('html-snapshots')
var assert = require("assert")
var fs = require('fs')
var app = express()

app.listen(8000, function(){
  console.log("listening");
});


app.get('/', function(req, res){

	//takes a snapshot of the html after "selector" tag is visible and each website in array
	var result = htmlSnapshots.run({
		input:"array",
	  // source: "/menu/",
	  source: ["http://www.green-theory.com/menu", "belmar"],
	  outputDir: "./snapshots",
	  outputDirClean: true,  
	  selector: "#imp-love",
	  snapshotScript: {
	    script: "removeScripts"
	  }
	}, function(err, snapshotsCompleted) {
		//callback where snapshotCompleted is all the snapshots in a array
		console.log(snapshotsCompleted)

	 //removes script tags for each snapshot
	  snapshotsCompleted.forEach(function(snapshotFile) {
	    content = fs.readFileSync(snapshotFile, { encoding: "utf8"});    
	    assert.equal(false, /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(content));
	    // there are no script tags in the html snapshots 
		})

	 //throws content into parse_info function to populate array
	  parse_data(content)
	   function parse_data(info){
		   var $ = cheerio.load(info);
		   var myArrayName = [];
		   var myArrayPrice = [];
		   var myArrayDescription = [];
		   $('.imp-name').each(function(){myArrayName.push($(this).text());});
		   $('.imp-price').each(function(){myArrayPrice.push($(this).text());});
		   $('.imp-extras').each(function(){myArrayDescription.push($(this).text());});




		  console.log(myArrayName);
		  console.log(myArrayPrice);
		  console.log(myArrayDescription);
		}
	});
})