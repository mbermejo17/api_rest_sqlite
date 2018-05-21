"use strict";

$(window, document).load(function() {

    var $wssURL = document.getElementById("#wssURL");
    var $Token = document.getElementsByName("token");
    var $UserName = document.getElementsByName("UserName");
    var $UserRole = document.getElementsByName("UserRole");
    var wss = undefined;
    var getCookie = function(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };


    /* if ($('#wssURL').val()) {
        var wss = new WebSocket($('#wssURL').val());
        openSocket();
    }
 */


    window.onbeforeunload = function() {
        if (getCookie('sessionId') === "") {
            if (!wss === undefined) {
                wss.onclose = function() {};
                wss.close();
            }
            localStorage.clear();
        }
    };


    var openSocket = function() {
        console.log('WebSocket connection ')
        wss = new WebSocket($('#wssURL').val());
        wss.onopen = function(event) {
            $('#message').html('Connected to: ' + event.currentTarget.url);
            wss.onmessage = function(message) {
                console.log(message.data);
                var data = $.parseJSON(message.data);
                var event = data.event;
                var message = data.message;
                if (event === 'KeepAlive') {
                    wss.send(JSON.stringify({ 'event': 'KeepAlive', 'message': '' }));
                    //wss.pong();
                }
                $('#message').html(`received: ${data.message}`);
            };
        };
    };
    // AJAX call object
    var AJAXCallDeferred = function(url, type, data, stringify) {
        var type = type || 'POST';
        var stringify = stringify || false;
        var df = $.Deferred();
        $.ajax({
            url: url,
            type: type,
            data: data,
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader(headerParams);
            },
            timeout: 10000,
            success: function(result) {
                if (result) {
                    console.log(result);
                    if (stringify === true) {
                        var jsonstring = $.parseJSON(JSON.stringify(result));
                    } else {
                        var jsonstring = $.parseJSON(result);
                    }
                    if (jsonstring.status === 'OK') {
                        df.resolve(jsonstring.message);
                    } else {
                        df.reject(jsonstring.message);
                    }
                }
            },
            error: function(xhr, status) {
                if (status === "timeout") {
                    df.reject('Servicio no disponible\n, intÃ©ntelo mas tarde.');
                } else {
                    df.reject(status);
                }
                console.log(xhr, status);
            },
            complete: function(xhr, status) {
                console.log(xhr, status);
            }
        });
        return df.promise();
    };


    var $ripples = $('.ripples');


    <<
    << << < HEAD
    var userTest = function(username, userpasswd) {
        var jsonData = {
            'username': username,
            'userpasswd': userpasswd
        };
        var fnUserLogon = new AJAXCallDeferred('/user', 'GET', jsonData, true);
        console.log(username, userpasswd);
        $.when(fnUserLogon)
            .done((data) => {
                console.log(data);
                return false;
            })
            .fail((data) => {
                console.error('Auth Failed');
                return false;
            });
    };


    $("#btnLogon").on('click', function(e) {
        e.preventDefault();
        userLogon($("#username").val(), Base64.encode(md5($("#userpasswd").val())));
    });

    ===
    === = >>>
    >>> > 801 fd1d5bc1d90dc779551758124c31c54524f12
    $('input').blur(function() {
        var $this = $(this);
        console.log($this);
        if ($this.val())
            $this.addClass('used');
        else
            $this.removeClass('used');
    });


    $ripples.on('click.Ripples', function(e) {

        var $this = $(this);
        console.log($this[0].id);
        var $offset = $this.parent().offset();
        var $circle = $this.find('.ripplesCircle');

        var x = e.pageX - $offset.left;
        var y = e.pageY - $offset.top;

        $circle.css({
            top: y + 'px',
            left: x + 'px'
        });

        $this.addClass('is-active');
        if ($this[0].id === 'btnIZQ') wss.send(JSON.stringify("{'event': 'CAM','message':'MOV_IZQ'}"));
        if ($this[0].id === 'btnDER') wss.send(JSON.stringify("{'event': 'CAM','message':'MOV_DER'}"));
        if ($this[0].id === 'btnUP') wss.send(JSON.stringify("{'event': 'CAM','message':'MOV_UP'}"));
        if ($this[0].id === 'btnDOWN') wss.send(JSON.stringify("{'event': 'CAM','message':'MOV_DOWN'}"));
        if ($this[0].id === 'btnZIN') wss.send(JSON.stringify("{'event': 'CAM','message':'MOV_ZIN'}"));
        if ($this[0].id === 'btnZOUT') wss.send(JSON.stringify("{'event': 'CAM','message':'MOV_ZOUT'}"));
        if ($this[0].id === 'btnHOME') wss.send(JSON.stringify("{'event': 'CAM','message':'MOV_HOME'}"));
        if ($this[0].id === 'btnM1') wss.send(JSON.stringify("{'event': 'CAM','message':'MOV_M1'}"));
        if ($this[0].id === 'btnM2') wss.send(JSON.stringify("{'event': 'CAM','message':'MOV_M2'}"));
        if ($this[0].id === 'btnM3') wss.send(JSON.stringify("{'event': 'CAM','message':'MOV_M3'}"));
    });

    $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function(e) {
        $(this).removeClass('is-active');
    }); <<
    << << < HEAD
        ===
        === =

        if (!(localStorage.UserName &&
                localStorage.Token &&
                localStorage.Role)) {
            //got to logon
        } >>>
        >>> > 801 fd1d5bc1d90dc779551758124c31c54524f12
});