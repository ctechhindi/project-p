/*
- This JavaScript File is a Part of formlib.js
- Try to load and render JavaScript template Using webWorker
*/

/*
* This is render function that we compiled from HTML Templates with the Help of Underscore templating Engine
var jstemplate = function(){};
*/
var self = this;

self.counter = 0;

/*
* How HTML5 Web Workers Communicate With Each Other
* (GUI Thread  <----> Background Thread)
*/
self.addEventListener('message',  function(event){
	if (self.counter == 0) {
		/*
		* Convert JS Template back to Function .. 
		*/
		eval(event.data)
		self.counter += 1;
	} else {
		var resdata = event.data;
		/* Compile JS Template and Send Back to User */
		resdata.forEach(function(i){
			postMessage(self.jstemplate(i));
		});
		/*
		* Send a done Message when JOB is done ..
		*/
		postMessage("done");
		self.close();
	}
});