"use strict";
$(window, document).load(function() {

    var wss = new WebSocket('wss://localhost:8443');
    var Base64 = (function() {


        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        var _utf8_encode = function(string) {

            var utftext = "",
                c, n;

            string = string.toString().replace(/\r\n/g, "\n");

            for (n = 0; n < string.length; n++) {

                c = string.charCodeAt(n);

                if (c < 128) {

                    utftext += String.fromCharCode(c);

                } else if ((c > 127) && (c < 2048)) {

                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);

                } else {

                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);

                }

            }

            return utftext;
        };

        var _utf8_decode = function(utftext) {
            var string = "",
                i = 0,
                c = 0,
                c1 = 0,
                c2 = 0;

            while (i < utftext.length) {

                c = utftext.charCodeAt(i);

                if (c < 128) {

                    string += String.fromCharCode(c);
                    i++;

                } else if ((c > 191) && (c < 224)) {

                    c1 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
                    i += 2;

                } else {

                    c1 = utftext.charCodeAt(i + 1);
                    c2 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
                    i += 3;

                }

            }

            return string;
        };

        var _hexEncode = function(input) {
            var output = '',
                i;

            for (i = 0; i < input.length; i++) {
                output += input.charCodeAt(i).toString(16);
            }

            return output;
        };

        var _hexDecode = function(input) {
            var output = '',
                i;

            if (input.length % 2 > 0) {
                input = '0' + input;
            }

            for (i = 0; i < input.length; i = i + 2) {
                output += String.fromCharCode(parseInt(input.charAt(i) + input.charAt(i + 1), 16));
            }

            return output;
        };

        var encode = function(input) {
            var output = "",
                chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;

            input = _utf8_encode(input);

            while (i < input.length) {

                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output += _keyStr.charAt(enc1);
                output += _keyStr.charAt(enc2);
                output += _keyStr.charAt(enc3);
                output += _keyStr.charAt(enc4);

            }

            return output;
        };

        var decode = function(input) {
            var output = "",
                chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output += String.fromCharCode(chr1);

                if (enc3 !== 64) {
                    output += String.fromCharCode(chr2);
                }
                if (enc4 !== 64) {
                    output += String.fromCharCode(chr3);
                }

            }

            return _utf8_decode(output);
        };

        var decodeToHex = function(input) {
            return _hexEncode(decode(input));
        };

        var encodeFromHex = function(input) {
            return encode(_hexDecode(input));
        };

        return {
            'encode': encode,
            'decode': decode,
            'decodeToHex': decodeToHex,
            'encodeFromHex': encodeFromHex
        };
    }());



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
        var fnUserLogon = new AJAXCallDeferred('/user/login', 'POST', {
            'username': username,
            'userpasswd': userpasswd
        }, true);
        console.log(username, userpasswd);
        $.when(fnUserLogon)
            .done((data) => {
                console.log("token", data.token);
                localStorage.UserName = data.UserName;
                localStorage.Token = data.Token;
                localStorage.Role = data.Role;
                $("#username").val("");
                $("#userpasswd").val("");
                $("#frmLogon").hide();
                $('#dashboard').show();
                return false;
            })
            .fail((data) => {
                console.error('Auth Failed');
                return false;
            });
    };


    $("#btnLogon").on('click', function(e) {
        e.preventDefault();
        userLogon($("#username").val(), Base64.encode($("#userpasswd").val()));
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
    wss.onmessage = function(message) {
        console.log(message.data);
        var data = $.parseJSON(message.data);
        var event = data.event;
        var message = data.message;

        if (event === 'KeepAlive') wss.send(JSON.stringify({ 'event': 'KeepAlive', 'message': '' }));
        $('#message').html(`received: ${data.message}`);

    };
});