<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Using Formlib-get.js</title>
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
	<div class="navbar">
		<div class="nav">
			<ul>
				<li><a href="/index1.php">Formlib-get.js</a></li>
				<li><a href="/index.php">Formlib.js</a></li>
				<li><a href="/demo.php">demo.php</a></li>
			</ul>
		</div>
	</div>
	<h1>Using Formlib-get.js</h1>
	<hr>

	<div class="row">
		<div class="col-xs-6" id="img_loader" style="display: none;">********hello*******</div>
		<div class="col-xs-6" id="result_div">
			
		</div>
	</div>

</div>


<script src="/jquery.min.js" type="text/javascript" charset="utf-8"></script>
<script src="/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
<script src="/formlib-get.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">

	var i = new RenderResponse();
	var c = {
		action: "/demo1.php",
		resContainer: "#result_div",
		imgloader: "#img_loader"
	};
	i.config(c);


</script>
</body>
</html>