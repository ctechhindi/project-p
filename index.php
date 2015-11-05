<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Using Formlib.js</title>
	<link rel="stylesheet" type="text/css" href="/bootstrap.min.css">
	<link href="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZv98AGb/6gVn9P0pbq71U3dZtlN3Wrcobq71BWf0/QBm/+oAZv96AAAAAAAAAAAAAAAAAAAAAAAAAACAgAAKAWb+Mj9zgtB4gBn/prNp/8HXs//B17P/prNo/3eAGf8/c4LPAWb+MYCAAAoAAAAAAAAAAAAAAAAAAAAAgIAAKICAAH+CggT/vtOq/9f07v/X9O7/1/Tu/9f07v++0qn/gYIE/4CAAH6AgAApAAAAAAAAAAAAAAAAAAAAAICAAICAgAD8pbJm/9f07v/X9O7/1/Tu/9f07v/X9O7/1/Tu/6SxZP+AgAD8gIAAgAAAAAAAAAAAAAAAAAAAAACAgADxgIAA/8jfxP/X9O7/1/Tu/9f07v/X9O7/1/Tu/9f07v/H3sL/gIAA/4CAAPAAAAAAAAAAAAAAAAAAAAAAgIAA2YKCBP/W8uv/1/Tu/9f07v/X9O7/1/Tu/9f07v/X9O7/1fLq/4GCA/+AgADYAAAAAAAAAAAAAAAAAAAAAICAAJmCggX/1vPs/9f07v/X9O7/1/Tu/9f07v/X9O7/1/Tu/9by6/+BggT/gIAAlwAAAAAAAAAAAAAAAAAAAACAgAAogIAA+MnhyP/X9O7/1/Tu/9f07v/X9O7/1/Tu/9f07v/I4Mb/gIAA+ICAACcAAAAAAAAAAAAAAAAAAAAAAAAAAICAAHSotW7/1/Tu/9f07v/X9O7/1/Tu/9f07v/X9O7/p7Rs/4CAAHIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgAABhIUKscLZtv/X9O7/1/Tu/9f07v/X9O7/wti0/4OFCa+AgAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICAADuDhAn/rLt5/5vH3v+cyN7/rLp4/4OECf+AgAA5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACDgweAu7t3/7m7lP9CjPb/Q432/7/Bmv+0tHD/g4MGfgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgAADt7dv8aampv8BAQH/qq+1/+vv9v8SEhL/VVVV/7e3bu+AgAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgIAAAczMmezW1tb/VlZW/9/f3//9/f3/bGxs/6Ghof/MzJjqgIAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACvr1169vbt///////a2rX/29u2///////29uz/rq5ceAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgIAAAZSUKWKbmzfMgYED+IGBA/icnDfMlJQoYoCAAAEAAAAAAAAAAAAAAAAAAAAA4AcAAMADAADAAwAAwAMAAMADAADAAwAAwAMAAMADAADgBwAA4AcAAPAPAADwDwAA4AcAAOAHAADwDwAA8A8AAA==" rel="icon" type="image/x-icon">
<style type="text/css">
	.form-group {
		margin: 5px;
		margin-bottom: 0px;
	}
</style>
</head>
<body>
<div class="container">
	<h1>Using Formlib.js</h1>
	<hr>

	<form action="/demo.php" class="form-horizontal" id="simpleform" method="POST" style="border:2px solid rgba(228, 45, 172, 0.6);">
	<fieldset>
		<legend>Simple HTML Form</legend>
		<div class="form-group">
			<label for="name" class="control-label col-xs-1">Name</label>
			<div class="col-xs-4">
				<input type="text" class="form-control" name="name">
			</div>
		</div>
		<div class="form-group">
			<label for="first" class="control-label col-xs-1">First's</label>
			<div class="col-xs-4">
				<input type="text" class="form-control" name="first">
			</div>
		</div>
		<div class="clearfix"></div>
		<div class="form-group">
			<label for="last" class="control-label col-xs-1">Last's</label>
			<div class="col-xs-4">
				<input type="text" class="form-control" name="last">
			</div>
		</div>
		<div class="form-group">
			<label for="email" class="control-label col-xs-1">Email</label>
			<div class="col-xs-4">
				<input type="text" class="form-control" name="email">
			</div>			
		</div>
		<div class="clearfix"></div>
		<div class="form-group">
			<div class="col-xs-12" id="progressbar"></div>
		</div>
		<div class="form-group" style="max-width: 200px;margin: 5px auto;">
			<input id="simpleformsubmit" class="btn btn-primary btn-block" type="submit" name="Click" value="Submit">
		</div>
	</fieldset>
	</form>	
</div>


<script src="/jquery.min.js" type="text/javascript" charset="utf-8"></script>
<script src="/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
<script src="/formlib.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
	
	var i = new ProcessForm("#simpleform");
	var j = {
		/* I do not want tooltips */
		"injectTooltip": false,
		/* I do not want to show BS Icons for OK and Cancel */
		"injectBSIcon": false,
		"successCall" : function(i){ alert(i); },
		"errorCall": function(i){ alert(i); },
        'progressbar': "#progressbar",
        'validator': {
            'name': {
                "func": 'isUserName',
                "msg": "Please, Enter a Valid User Name"
            },
            "email": {
                "func": "isValidEmail",
                "msg": "Please, Enter a Valid Email Address"
            }
        }
    };
	i.config(j);

</script>
</body>
</html>