/*


Class ProcessForm

Properties:
    formcsspath (String : Form CSS Selector)
    form        (jQuery : Reference for Form)
    fields      (jQuery : Reference to All Input Fields inside Form)
    action      (String : URL to process form Data)
    method      (String : HTTP Method)
    contentType (String : Type of Data That You Wish to Send - application/x-www-form-urlencoded | multipart/form-data | text/plain)
    dataType    (String : Type of Data That You are Expecting)
    processData (Boolean : true / false)
    cache       (Boolean : true / false)
    status      (Boolean : Wheather Form had been Processed at least One Time)
    dataFields  (jQuery : Reference to Input Fields other Than File )
    asJSON      (JSON : Representation of 1D form data)
    fileFields  (jQuery : Reference to all FILE Input Fields)
    asArray     (Array : key=value pairs for All Input Fields Other Than File)

    validator   (object: Input Fields Name that You Wish to Validate - name => validator_function)
    validity    (Boolean : IF `validator` Object found inside configuration - this will become true - now form will be automatically validate itself)
    isvalid     (Boolean : Default true - Means There are now Input Field with any Error - if this becomes false - form will not send to server though ajax - untill this flag becomes true)
    
    imgloader   (String : CSS selector for loading Image)
    progressbar (String : CSS selector - Where to Progress Bar)

Methods:
    config()    (Function: Setup Some Configuration Options)
    process()   (Function: Process and Extract Required DATA from FORM)
    send()      (Function: Send Form Through Ajax to Server)

    successCall  (Function: Success Callback with Data returned from Server - Defalult: Print Content to Console)
    errorCall    (Function: Error Callback with Data returned from Server - Defalult: Print Content to Console)

    isUserName   (Function : Valiate User name)
    isValidEmail (Function : Validate Email Address)
    injectOKIcon    (Function : What to do When Form Field Validate with Success Status)
    tooltipconfig (Object : for Tooltip configuration)
    injectCancelIcon      (Function : What to do When Form Field Does not Validate Successfully)

Flow:
    - All You Need to do is, Create a New Object and configure some options if required.
    - Then call send() method
    - If Form Successfully validated, this will send an Ajax Request to Server
    - and By default, it will Write Down response to JavaScript Console.

Example:
    var i = new ProcessForm('#myform');
    var c = {
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
    i.config(c);
    
*/


function ProcessForm(formcsspath) {
    var self = this;
    this.formcsspath = formcsspath;
    this.form   = $(this.formcsspath);     // Refernece to Form Field item 
    /*
    * If Value of Any Field Change
    * Mark This Form State as Changed 
    * So That we can Process it Again and Then Submit it ..
    */
    this.form.change(function(ev){
        self.status = false;
    });

    /*
    * Lets Submit the Form Automatically When `submit` event emmits in
    form context, lets process the form and send the data to Server..
    */
    this.form.on("submit", function(ev){
        ev.preventDefault();
        self.send(self.successCall, self.errorCall);
    });

    /*
    * Default Callback for `successCall` and `errorCall`
    */
    this.successCall = function(i){ console.log(i); };
    this.errorCall = function(i){ console.log(i); };

    /* Reference to All Input Fields inside Form Field */
    this.fields = $("input", this.form);
    
    /* Extract `action` and `method` from FORM attributes */
    var action = this.form.attr("action");
    var method = this.form.attr("method");
    /* 
    * Validate `action` and `method` attributes - or 
    * setup default values for these attributes, these are necessary 
    */
    this.action = ( action )?( action ):("/");
    this.method = ( method )?( method ):("GET");

    /* What TYPE of data You are Expecting */
    this.dataType = "json";
    /* What TYPE of data You are sending */
    this.contentType = 'false';
    /* Wheather You Want jQuery to Process Data or NOT */
    this.processData = 'false';
    this.cache = 'true';
    this.crossDomain = 'false';
    /* Wheather a Form had been Processed at Least One Time And Mark as Valid */
    this.status = false;
    /* Would You Like to Inject Bootstrap Tooltips for Invalid Form Field */
    this.injectTooltip = true;
    /* 
    * Would You Like to Inject Bootstrap OK Icon or Cancel Icon (to show validation)
    * Note: This works great for Form designed using Bootstrap_v3 class `form-horizonal` Markup
    */
    this.injectBSIcon = true;
};

ProcessForm.prototype = {
    /*
    * Want to Change Some Default Configuration Options 
    * Lets Inject Some Variables into this Class
    */
    config: function(object) {
        // Save This Scope into self
        /*
        {
            "action": "/",
            "method": "GET",
            "contentType": "text",
            "dataType": "text",
            "dataFields": new Object(),
            "asJSON": new Object(),
            "fileFields": new Object(),
            "asArray": new Array(),
            "validator": array()
        }
        */
        var self = this;
        $.each(object, function(key, value){
            self[key] = value;
        });
        return true;
    },
    /* 
    * Inject Progress Bar into HTML form 
    */
    injectProgressbar: function(){
        var self = this;
        if (self.progressbar){
            /*
            * This is Twitter Bootstrap HTML Markup
            * That we are Going to use to Dynamically Generate Progressbar
            */
            var _ps = '<div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%"><span class="sr-only">0% </span></div></div>';
            $(self.progressbar).html(_ps);
        }
        return true;
    },

    /* 
    * Update Progress Bar with New State
    */
    updateProgrssbar: function(amount){
        var self = this;
        if (self.progressbar) {
            /*
            * Select the Progress bar and Change Its Style
            */
            $(self.progressbar + " > div > div").css("width", amount*100 + "%");
        }
        return true;
    },
    /* 
    * It's Time to Process Form Data 
    */
    process: function() {
        // Save This Scope into self
        var self = this;

        self.dataFields = {};
        self.asJSON = {};
        self.fileFields = {};
        self.asFormData = new FormData();
        self.asArray = [];

        /* 
        * Activating validator routines 
        */
        if (self.validator && !$.isEmptyObject(self.validator)) {
            /* So, We Have Something To Validate */
            self.validity = true;
            /* If, Something Break While Validating - this flag will be false */
            /* If This Flag is FALSE User will not be able to Send Ajax request to Server */
            self.isvalid = true;
        }

        /*
        * I want You to Loop Through Each and Every Input Field
        * Inside my Form Then Process and Validate each of Them ..
        */
        this.fields.each(function(counter, item){
            /* - Convert Each Item into a jQuery Object - */
            var _item = $(item, self.form);
            /* - Extract Form Field NAME and TYPE - */
            var _name  =  _item.attr("name");
            var _type  =  _item.attr("type");
            /* Checking for Validation */
            if (self.validity && self.validator[_name]) {
                /* self.function_name to call to validate Field Value */
                var fname = self.validator[_name]['func'];
                var fmsg  = self.validator[_name]['msg'];
                /*
                * Accepts a jQuery Reference Object to HTML Element
                * And One Message to Display as Tooltip if Validation failed
                * Calling a function to validate this Field 
                */
                self[fname](_item, fmsg);
            }
            /* - Setup Default Values for Field NAME and Field TYPE - */
            _name = (_name && _name !== "")?( _name ):( counter.toString() );
            _type = (_type && _type !== "")?( _type ):( "text" );
            if (_type != "file") {
                /* - This is not a File Fields - */
                self.dataFields[_name] = _item;
                var _value = _item.val();
                _value = (_value )?( _value ):( "" );
                
                // * TWO Main Categories ( TEXT like and Radio Like)
                
                if (_type == 'text' || _type == 'hidden' || _type == 'password') {
                    // for text
                    self.asJSON[_name] = _value;
                    self.asFormData.append(_name, _value);
                    self.asArray.push( _name + "=" + _value );
                } else if (_type == 'checkbox' || _type == 'radio') {
                    // for Checkbox and Radio
                    if (_item.is(":checked")){
                        _value = _item.val();
                        _value = (_value )?( _value ):( "1" );
                        self.asJSON[_name] = _value;
                        self.asFormData.append(_name, _value);
                        self.asArray.push(_name + "=" + _value);
                    }
                }
            } else {
                /* - This is Form File Field - */
                if (_item && _item[0] && _item[0].files && _item[0].files[0]) {
                    /*console.log(_name);*/
                    self.asFormData.append(_name, _item[0].files[0]);
                }
                self.fileFields[_name] = _item;
            }
        });
        self.status = true;
        return true;    
    },

    /* 
    * Now Time to Send form to Server Using Ajax 
    */
    send: function(successCall, errorCall) {
        var self = this;
        if (!self.isvalid || !self.status) {
            /* 
            * Form Should be Processed At Least One Time
            * As well as Successfully Validated 
            */
            self.process();
        }
        /*var formdata = self.asArray.join("&");*/
        /*
        * These are Options/Configuration that we are Going to use
        * for jQuery.Ajax() Function.
        */
        var options = {
            url: self.action,
            method: self.method,
            data: self.asFormData,
            success: function(data) {
                self.successCall(data);
            },
            error: function(data){
                self.errorCall(data);
            },
            xhr: function()
              {
                var xhr = new window.XMLHttpRequest();
                //Upload progress
                xhr.upload.addEventListener("progress", function(evt){
                  if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    //Do something with upload progress
                    self.updateProgrssbar(percentComplete);
                    console.log(percentComplete);
                  }
                }, false);
                //Download progress
                xhr.addEventListener("progress", function(evt){
                  if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    //Do something with download progress
                    self.updateProgrssbar(percentComplete);
                    console.log(percentComplete);
                  }
                }, false);
                return xhr;
              },
            beforeSend: function () {
                /* self.imgloader - CSS Selector to show loading image */
                console.log("request started -- ");
                if (self.imgloader) {
                    /*
                    * If asked for, Load and View Animated Image Loader
                    */
                    $(self.imgloader).parent().show();
                }
                if (self.progressbar) {
                    /*
                    * Lets Inject Progress bar Template into Progress_bar_container Area
                    */
                    self.injectProgressbar();
                }
            },
            complete: function () {
                console.log("request ends -- ");
                if (self.imgloader) {
                    /*
                    * Lets Hide The Animated GIF loader - Ajax request has been completed
                    */
                    $(self.imgloader).parent().hide();
                }
                if (self.progressbar) {
                    /* 
                    * Check Out, if There is any Progress bar Template Inside that Container 
                    * If there is remove it ..
                    */
                    $(self.progressbar).html("");
                }
            },
        };
        /*
        * If Not Explicity defined, Let jQuery to do some work 
        */
        if (self.dataType && self.dataType !== "") {
            options['dataType'] = self.dataType;
        }
        if (self.contentType && self.contentType !== "") {
            /*  Required Option When You Want To Send Image file Using Ajax */
            options['contentType'] = (self.contentType == 'false')?( false ):( self.contentType );
        }
        if (self.processData && self.processData !== "") {
            /*  Required Option When You Want To Send Image file Using Ajax */
            options['processData'] = (self.processData == 'false')?( false ):( true );
        }
        // if (self.cache && self.cache !== "") {
        //  options['cache'] = (self.cache == 'false')?( false ):( true );
        // }
        // if (self.crossDomain && self.crossDomain != "") {
        //  options['crossDomain'] = (self.crossDomain == 'false')?( false ):( true );
        // }

        /* 
        * Finally SEND an Ajax Request - if Form had been Successfully validated
        */
        if (self.isvalid) {
            $.ajax(options);
        } else {
            console.log("* - Please, First Validate the Form Fields.");
            console.log("* - There were Some errors While Validating Form Fields.");
        }
        return true;
    },

    /* 
    * Validating a Username 
    */
    isUserName: function(item, message){
        var self = this;
        var pattern, data, vusrname;
        pattern = /(^[a-z][\w._]+)/;
        data = pattern.exec(item.val());
        if (data && data[0]){
            /* Update data with - What we extracted using regex */
            item.val(data[0]);
            self.injectOKIcon(item, message);
        } else {
            /* Invalid Data - remove all of it */
            item.val("");
            self.injectCancelIcon(item, message);
        }
    },

    /*
    * Validate a User Email Address Using Regex
    */
    isValidEmail: function(item, message) {
        var self = this;
        var pattern, data;
        pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        data = pattern.exec(item.val());
        if (data && data[0]) {
            /*
            * I want you to update Form Field with data
            * That we extracted Using RegEx
            */
            item.val(data[0]);
            self.injectOKIcon(item, message);
        } else {
            /*
            * Not a Single Match
            * So remove any Character, if There are Any..
            * And Mark This Form Field as Invalid Form Field
            */
            item.val("");
            self.injectCancelIcon(item, message);
        }
    },

    /*
    * Settings / Configuration to Display Tooltip with Error Message as Tooltip
    */
    tooltipconfig: {
        title: "",
        container: 'body',
        placement: 'top',
    },

    /*
    * Inject glyphicon glyphicon-ok
    * When Validation Successed 
    * Validator are designed for Bootstrap - But 
    * if needed You can easily edit them as well 
    */
    injectOKIcon: function(item, message){
        var self = this;
        if (item && item.parent() && item.parent().parent()) {
            var _i = item.parent();
            var _j = item.parent().parent();
            if (self.injectTooltip) {
               /* Remove Bootstrap Tooltip (if There is any) */
               _i.tooltip('destroy'); 
            }
            if (self.injectBSIcon) {
                /* Inject BS OK Icon */
                $(".myicon", _j).remove();
                _j.append('<span style="font-size: 25px;" class="myicon glyphicon glyphicon-ok"></span>');
            }
            _j.removeClass('has-error')
                .removeClass('bg-danger')
                .addClass('has-feedback')
                .addClass('has-success');
        } else {
            /*
            * Invalid HTML Markup (we thought this will be Twitter Bootstrap Form)
            */
            console.log("Success - valid __");
            console.log(item);
        }
        return true;
    },

    /*
    * Change OK Icon to Cancel Icon
    */
    injectCancelIcon: function(item, message){
        var self = this;
        /* SO, Some Form Field Validation Failed */
        self.isvalid = false;
        /*
        * Update Error Tooltip Message for this Field
        */
        self.tooltipconfig['title'] = message;
        if (item && item.parent() && item.parent().parent()) {
            var _i = item.parent();
            var _j = item.parent().parent();
            if (self.injectTooltip) {
                /* Activate Bootstrap Tooltip */
                _i.tooltip(self.tooltipconfig); 
            }
            if (self.injectBSIcon) {
                $(".myicon", _j).remove();
                _j.append('<span style="font-size: 25px;" class="myicon glyphicon glyphicon-remove"></span>');
            }
            _j.removeClass('has-success')
                .addClass('has-feedback')
                .addClass('has-error')
                .addClass('bg-danger');

        } else {
            /*
            * So, This Form was not designed with Bootstrap Components
            * Because, This seems that You are not Following basic HTML
            * Markup for form Fields.
            */
            console.log("Error - invalid __");
            console.log(item);
        }
        return true;
    }
};



/*
#
By Default PHP:-
upload_max_filesize = 2M; post_max_size = 8MB;

Change its value to upload big file size:-
upload_max_filesize = 100M; post_max_size = 100MB;

#
<div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%"><span class="sr-only">0% </span></div></div>

# Bootstrap_v3 Markup for Form Input Field
<div class="form-group">
    <label for="name" class="control-label col-xs-1">Name</label>
    <div class="col-xs-4">
        <input type="text" class="form-control" name="name">
    </div>
</div>

*/