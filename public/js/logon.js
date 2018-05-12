"use strict";

$(window, document).load(function() {

    var $wssURL = document.getElementById("#wssURL");

    if ($('#wssURL').val()) {
        var wss = new WebSocket($('#wssURL').val());
        openSocket();
    }
    window.onbeforeunload = function() {
        wss.onclose = function() {};
        wss.close();
        localStorage.clear();
    };

    console.log(wss);

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
                    wss.pong();
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


    var userLogon = function(username, userpasswd) {
        var jsonData = {
            'username': username,
            'userpasswd': userpasswd
        };
        var fnUserLogon = new AJAXCallDeferred('/user/login', 'POST', jsonData, true);
        console.log(username, userpasswd);
        $.when(fnUserLogon)
            .done((data) => {
                console.log(data);
                localStorage.setItem('UserName', data.UserName);
                localStorage.setItem('Token', data.Token);
                localStorage.setItem('Role', data.Role);
                $("#wssURL").val(data.wssURL);
                $("#username").val("");
                $("#userpasswd").val("");
                $("#frmLogon").hide();
                $('#dashboard').show();
                openSocket();
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
    });

    $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function(e) {
        $(this).removeClass('is-active');
    });

    if (localStorage.UserName &&
        localStorage.Token &&
        localStorage.Role) {
        $('#frmLogon').hide();
        $('#dashboard').show();
    } else {
        $('#frmLogon').show();
        $('#dashboard').hide();
    }

});