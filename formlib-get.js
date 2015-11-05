/*
*
Configuration/Options
	action
	method
	dataType

	resContainer  (String : CSS Selector for result)
	imgloader     (String : CSS Selector for Image Loader)

	jstemplate    (Function : Underscore JavaScript Template Function)

Methods:
	config
	renderAsync
	renderSync 

Example:-
<% if (status == 'success') { %>
    <p><%= count %></p>
    <table class="table">
    <thead>
    <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Role</th>
    <th>First</th>
    <th>Last</th>
    <th>Mobile</th>
    <th>Address</th>
    <th>Active</th>
    <th>Last Login</th>
    <th>Created</th>
    <th>Last Modified</th>
    </tr>
    </thead>
    <tbody>
    <% _.each(data, function(item){ %>
        <tr>
        <td><%= item.userid %></td>
        <td><%= item.identity %></td>
        <td><%= item.usrrole %></td>
        <td><%= item.firstname %></td>
        <td><%= item.lastname %></td>
        <td><%= item.mobileno %></td>
        <td><%= item.address %></td>
        <td><%= item.isactive %></td>
        <td><%= item.lastlogin %></td>
        <td><%= item.createdat %></td>
        <td><%= item.modifiedat %></td>
        </tr>
    <% }) %>
    </tbody>
    </table>
<% } else { %>

<% } %>

*
*/

function RenderResponse(){
	var self = this;
	self.action = "/";
	self.method = "GET";
	self.dataType = "json";
	self.resContainer = "#result_div";
	self.imgloader    = "#img_loader";
	self.norescount   = "#total_results";
	self.webWorkerlib = "/users/views/formlib-async.js";
};

RenderResponse.prototype = {
	/*
	* Want to Change Some Default Configuration Options 
	* Lets Inject Some Variables into this Class
	*/
	config: function(object) {
		var self = this;
		$.each(object, function(key, value){
			self[key] = value;
		});
		return true;
	},

	/*
	* Request data using Ajax
	*/
	send: function() {
		var self = this;
		if (self.action && self.method) {
			var options = {
				url: self.action,
				method: self.method,
				dataType: self.dataType,
				success: function(data) {
					self.ajaxResponse = data['data'];
					self.renderAsync();
					/* console.log(data); */
				},
				error: function(data) {
					console.log(data);
				},
				beforeSend: function() {
					console.log("Ajax Request Started -- ");
					$(self.imgloader).show();
				},
				complete: function() {
					console.log("Ajax Request Ends -- ");
					$(self.imgloader).hide();
				}
			};
			/*
			* Send a Ajax Request to fetch resource
			*/
			$.ajax(options);
		}
	},

	/*
	* Render Ajax Response in Sync Manner
	*/
	renderSync: function() {
		var self = this;
		var _i = $(self.resContainer);
		var _j = $(self.imgloader);
		if ( _i && _i[0] && _j && _j[0] && self.ajaxResponse) {
			/* _j.show(); */
			console.log("* Now Render JS Template -- ");
			$.each(self.ajaxResponse, function(key, value){
				_i.append(self.jstemplate(value));
			});
			console.log("* Done -- JS Template Rendering -- ");
			/* _j.hide(); */
		} else {
			console.log("* We need Container and Imageloader and Response Ajax.");
		}
		return true;
	},

	/*
	* Render Ajax Response Using HTML5 WebWorkers
	*/
	renderAsync: function(){
		var self = this;
		var _i = $(self.resContainer);
		console.log("* Lets Render JS Template in Async Manner");
		if (_i && _i[0] && self.ajaxResponse) {
			if(typeof(Worker) !== "undefined") {
				/* Browser Does Support Web worker Feature  */
				if(typeof(webWorker) == "undefined") {
					var webWorker = new Worker(self.webWorkerlib);
					/* 
					* Send JavaScript Template into WebWorker Scope 
					* But Only is that we can send Object into WebWorker Scope
					* So, first we will Convert it into String
					* And Later inside WebWorker Scope we will convert it back to JS Function.
					*/
					webWorker.postMessage("self.jstemplate = " + self.jstemplate);
					/*
					* ajaxResponse - Collection/Array of data items
					*/
					webWorker.postMessage(self.ajaxResponse);

					/* What to do when Worker return back Some Data */
					webWorker.onmessage = function(event){
						if (event.data == "done") {
							/* 
							* relaod Event Listeners for Edit and Delete Buttons 
							* - reloadEventsListners( );
							*/
							console.log("* Async - Rendering Complete");
							return;
						}
						_i.append(event.data);
					};

				}
			} else {
				console.log("* Your Browser does not support HTML5 WebWorker");
				self.renderSync();
			}			
		} else {
			console.log("* We must have one Container to render response");
		}
	}
};

