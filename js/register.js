$(function () {
    $(".header_top").load("register_top.html", function () {
        // 顶部导航下拉菜单
        $(".header_top .right .daohang").hover(function () {
            console.log(888);
            $(".other").show();
            $(".icons").addClass("dropup");
        }, function () {
            $(".other").hide();
            $(".icons").removeClass("dropup");
        })
    });
    $(".header").load("register_header.html");
    $(".footer").load("register_footer.html");


    // 注册
    // 1.聚焦显示提示信息
    function getFocus(inputBox, text) {
        inputBox.focus(function () {
            $(this).parent().parent().children().last(".oninfo").show()
                .html(text).addClass("focus");
        })
    }
    getFocus($("#txtUserName"), '请输入你的用户名，2-18个字符，只能字母、数字、中/下划线');
    getFocus($("#txtUserPass"), '请输入您的登录密码，6-20位数字和字符组合，两边不能有空符号');
    getFocus($("#txtUserPass2"), '请输入您的确认密码，6-20位数字和字符组合，必须和密码相等');
    getFocus($("#txt_Mobile"), '请输入您的手机号码，11位数字');
    getFocus($("#txtMobileCode"), '请输入6位手机验证码');
    getFocus($("#txt_RealName"), '请输入您的真实姓名，至少2个字符');
    getFocus($("#txtEmail"), '请输入您的电子邮箱，格式如：xxx@qq.com，6-100个字符');
    getFocus($("#txt_phone1"), '电话区号3或4位数字');
    getFocus($("#txt_phone2"), '电话号码7或8位数字（可选填）');

    //    2.失焦验证
    var isOk = false; //判断状态
    // 验证用户名
    $("#txtUserName").blur(function () {
        //第一步：非空验证
        if ($(this).val() == '') {
            $(this).parent().parent().children().last(".oninfo").show().html("<i></i>请输入你的用户名，2-18个字符，只能字母、数字、中/下划线")
                .addClass("err");
        } else {
            // 第二步，进行正则判断
            if (!/^[a-zA-Z0-9_-]{2,18}$/i.test(
                    $(this).val())) {
                $(this).parent().parent().children().last(".oninfo").show().html("<i></i>")
                    .addClass("err");
                isOk = false;
            } else {
                $.ajax({
                    url: "../api/register.php",
                    type: 'get',
                    data: {
                        userName: $(this).val()
                    },
                    success: $exist => {
                        console.log($exist);
                        if ($exist == "yes") {
                            $(this).parent().parent().children().last(".oninfo").show()
                                .html("<i class='ok'></i>").addClass("borderbox");
                            isOk = true;

                        } else if ($exist == "no") {
                            $(this).parent().parent().children().last(".oninfo").show().html("<i></i>用户名已注册，请更换")
                                .addClass("err");
                            isOk = false;
                        }
                    }

                })
            }
        }
        // console.log(isOk);

    })
    // 验证密码
    var miOk = false;
    $('#txtUserPass').blur(function () {
        if ($(this).val() == '') {
            $(this).parent().parent().children().last(".oninfo").show().html("<i></i>请输入您的登录密码，6-20位数字和字符组合，两边不能有空符号")
                .addClass("err");
        } else {
            if (!/^(?![0-9]+$)(?![a-zA-Z]+$)/i.test($(this).val())) {
                $(this).parent().parent().children().last(".oninfo").show().html("<i></i>请输入您的登录密码，6-20位数字和字符组合，两边不能有空符号")
                    .addClass("err");
                miOk = false;
            } else {
                $(this).parent().parent().children().last(".oninfo").show()
                    .html("<i class='ok'></i>").addClass("borderbox");
                miOk = true;
            }
        }
        // console.log(miOk);
    })

    var resure = false;
    //判断两次输入的密码是否一致
    $("#txtUserPass2").blur(function () {
        if ($(this).val() == '') {
            $(this).parent().parent().children().last(".oninfo").show().html("<i></i>请输入您的登录密码，6-20位数字和字符组合，两边不能有空符号")
                .addClass("err");
        } else if ($('#txtUserPass').val() !== $('#txtUserPass2').val()) {
            $(this).parent().parent().children().last(".oninfo").show().html("<i></i>两次输入的密码不一致，请重新输入！")
                .addClass("err");
            resure = false;
        } else if ($('#txtUserPass').val() == $('#txtUserPass2').val()) {
            $(this).parent().parent().children().last(".oninfo").show()
                .html("<i class='ok'></i>").addClass("borderbox");
            resure = true;
        }
        // console.log(resure);
    })

    // 验证手机号码
    var phoneOk = false;
    $("#txt_Mobile").blur(function () {
        //第一步：非空验证
        if ($(this).val() == '') {
            $(this).parent().parent().children().last(".oninfo").show().html("<i></i>请输入您的手机号码，11位数字")
                .addClass("err");
        } else {
            // 第二步，进行正则判断
            if (!/^1[3|4|5|8][0-9]\d{4,8}$/.test(
                    $(this).val())) {
                $(this).parent().parent().children().last(".oninfo").show().html("<i></i>请输入正确的手机号码")
                    .addClass("err");
                phoneOk = false;
            } else {
                $.ajax({
                    url: "../api/phone.php",
                    type: 'get',
                    data: {
                        phone: $(this).val()
                    },
                    success: $exist => {
                        if ($exist == "yes") {
                            $(this).parent().parent().children().last(".oninfo").show()
                                .html("<i class='ok'></i>").addClass("borderbox");
                            phoneOk = true;

                        } else if ($exist == "no") {
                            $(this).parent().parent().children().last(".oninfo").show().html("<i></i>手机号已注册，请更换")
                                .addClass("err");
                            phoneOk = false;
                        }
                    }

                })
            }
        }
    })

    // 验证码
    // 点击按钮。出现弹窗
    $(".btn9").click(function () {
        var dialog = `<div class='mask'></div>"
        <div class='tanchuang'>
            <div id='inside'>
                <h2 id='locked' onselectstart='return false;'>安全验证<a id='closebox' class='span' href='#'></a></h2>
                <div class='boxcentent'>
                    <span class='icon success'></span>
                    <div class='txt'>
                        <div class=' please clearfix'>
                            请输入您看到的4位图形验证码
                        </div>
                        <div class='iform clearfix'>
                            <span class='bginput'>
                                <input type='text' class='input_big s' maxlength='4' id='txtImageCode'>
                            </span>
                            <canvas id='canvas' width='100' height='40'></canvas>
                        </div>
                        <div id='errTipM'>
                        </div>
                    </div>
                </div>
                <div class='opdiv clearfix'>
                    <a href='#' class='send-btn1 fl js-send-confirm'>确定发送</a>
                    <a href='#' class='send-btn2 fl'>重新修改</a>
                </div>
            </div>
        </div>`
        $(".footer").after(dialog);
        var show_num = [];
        draw(show_num);

        $("#canvas").on('click', function () {
            draw(show_num);
        });

        $(".send-btn1").click(function () {
            var val = $("#txtImageCode").val().toLowerCase();
            var num = show_num.join("");
            if (val == '') {
                $("#errTipM").html("请输入您看到的4位图形验证码");
            } else if (val == num) {
                $.ajax({
                    type: "post",
                    url: "../api/sms_verification.php",
                    data: {
                        mobile: $("#txt_Mobile").val()
                    },
                    success: function (res) {
                        var data = JSON.parse(res);
                        console.log(data);
                        if (data.phonecode) {
                            var thecode = data.phonecode;
                            codeTest(thecode);

                        }
                    }

                })
                $(".mask").remove();
                $(".tanchuang").remove();

            } else {
                alert("请输入正确的验证码");
            }
        })

        $(".send-btn2").click(function () {
            console.log(999);
            $("#txtImageCode").val() = '';
        });

        /****成功示例**/
        // {
        //     "reason": "短信发送成功",
        //     "result": {
        //         "count": 1, /*发送数量*/
        //         "fee": 1, /*扣除条数*/
        //         "sid": "23d6bc4913614919a823271d820662af" /*短信ID*/
        //     },
        //     "error_code": 0 /*发送成功*/
        // }


        //生成并渲染出验证码图形
        function draw(show_num) {
            var canvas_width = $('#canvas').width();
            var canvas_height = $('#canvas').height();
            var canvas = document.getElementById("canvas"); //获取到canvas的对象，演员
            var context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台
            canvas.width = canvas_width;
            canvas.height = canvas_height;
            var sCode = "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
            var aCode = sCode.split(",");
            var aLength = aCode.length; //获取到数组的长度

            for (var i = 0; i < 4; i++) { //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
                var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
                // var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
                var deg = Math.random() - 0.5; //产生一个随机弧度
                var txt = aCode[j]; //得到随机的一个内容
                show_num[i] = txt.toLowerCase();
                var x = 10 + i * 20; //文字在canvas上的x坐标
                var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
                context.font = "bold 23px 微软雅黑";

                context.translate(x, y);
                context.rotate(deg);

                context.fillStyle = randomColor();
                context.fillText(txt, 0, 0);

                context.rotate(-deg);
                context.translate(-x, -y);
            }
            for (var i = 0; i <= 5; i++) { //验证码上显示线条
                context.strokeStyle = randomColor();
                context.beginPath();
                context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
                context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
                context.stroke();
            }
            for (var i = 0; i <= 30; i++) { //验证码上显示小点
                context.strokeStyle = randomColor();
                context.beginPath();
                var x = Math.random() * canvas_width;
                var y = Math.random() * canvas_height;
                context.moveTo(x, y);
                context.lineTo(x + 1, y + 1);
                context.stroke();
            }
        }

        //得到随机的颜色值
        function randomColor() {
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            return "rgb(" + r + "," + g + "," + b + ")";
        }
    });

    // 手机验证码验证
    var codeOk = false;

    function codeTest(yanz) {
        $("#txtMobileCode").blur(function () {
            if ($(this).val() == '') {
                $(this).parent().parent().children().last(".oninfo").show().html("<i></i>请输入6位手机验证码").addClass("err");
            } else if (!/^\w{6}$/i.test($(this).val())) {
                $(this).parent().parent().children().last(".oninfo").show().html("<i></i>请输入6位手机验证码")
                    .addClass("err");
                codeOk = false;
            } else if ($(this).val().toLowerCase() == yanz.toLowerCase()) {
                $(this).parent().parent().children().last(".oninfo").show()
                    .html("<i class='ok'></i>").addClass("borderbox");
                codeOk = true;
            } else {
                $(this).parent().parent().children().last(".oninfo").show().html("<i></i>请输入6位手机验证码")
                    .addClass("err");
                codeOk = false;
            }
        })
    }


    //验证姓名
    var nameOk = false;
    $("#txt_RealName").blur(function () {
        if ($(this).val() == '') {
            $(this).parent().parent().children().last(".oninfo").hide();
        } else if (!/^([\u4E00-\u9FA5]+|[a-zA-Z]+)$/i.test($(this).val())) {
            console.log(11);
            $(this).parent().parent().children().last(".oninfo").show().html("<i></i>请输入您的真实姓名，至少2个字符")
                .addClass("err");
            nameOk = false;
        } else {
            $(this).parent().parent().children().last(".oninfo").show()
                .html("<i class='ok'></i>").addClass("borderbox");
            nameOk = true;
        }
    })

    //验证邮箱
    var emailOk = false;
    $("#txtEmail").blur(function () {
        if ($(this).val() == '') {
            $(this).parent().parent().children().last(".oninfo").hide();
        } else if (!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/i.test($(this).val())) {
            console.log(11);
            $(this).parent().parent().children().last(".oninfo").show().html("<i></i>请输入您的电子邮箱，格式如：xxx@qq.com，6-100个字符")
                .addClass("err");
            emailOk = false;
        } else {
            $(this).parent().parent().children().last(".oninfo").show()
                .html("<i class='ok'></i>").addClass("borderbox");
            emailOk = true;
        }
    })

    // 验证固定电话
    var fixedNumber1 = false;
    $("#txt_phone1").blur(function () {
        if ($(this).val() == '') {
            $(this).parent().parent().children().last(".oninfo").hide();
        } else if (!/^[0-9]\d{2,3}$/i.test($(this).val())) {
            console.log(11);
            $(this).parent().parent().children().last(".oninfo").show().html("<i></i>电话区号3或4位数字")
                .addClass("err");
            fixedNumber1 = false;
        } else {
            $(this).parent().parent().children().last(".oninfo").show()
                .html("<i class='ok'></i>").addClass("borderbox");
            fixedNumber1 = true;
        }
    });
    var fixedNumber2 = false;
    $("#txt_phone2").blur(function () {
        if ($(this).val() == '') {
            $(this).parent().parent().children().last(".oninfo").hide();
        } else if (!/^[0-9]\d{6,7}$/i.test($(this).val())) {
            console.log(11);
            $(this).parent().parent().children().last(".oninfo").show().html("<i></i>电话号码7或8位数字（可选填）")
                .addClass("err");
            fixedNumber2 = false;
        } else {
            $(this).parent().parent().children().last(".oninfo").show()
                .html("<i class='ok'></i>").addClass("borderbox");
            fixedNumber2 = true;
        }
    })

    // 是否同意协议
    var agreement = false;
    $(".license .ckdiv .ck i").click(function () {
        $(this).toggleClass("checked");
        if ($(this).attr("class") == "checked") {
            agreement = true;
        } else {
            agreement = false;
        }
        console.log(agreement);

    })

    // 如果说全部验证通过,则提交信息,注册,并储存用户信息(手机和名字,名字用于显示在首页)
    $("#submit").click(function () {
        if (!isOk || !miOk || !resure || !phoneOk || !codeOk || !nameOk || !emailOk || !agreement) {
            alert("信息输入有误");
        } else if (isOk && miOk && resure && phoneOk && codeOk && nameOk && emailOk && agreement) {
            var p = new Promise(function (resolve) {
                $.ajax({
                    type: "post",
                    url: "../api/registry.php",
                    data: {
                        user: $("#txtUserName").val(),
                        password: $("#txtUserPass").val(),
                        phone: $("#txt_Mobile").val(),
                        name: $("#txt_RealName").val(),
                        email: $("#txtEmail").val(),
                    },
                    success: function (res) {
                        resolve(res);
                    }
                })
            })
            p.then(function (data) {
                if (data == "yes") {
                    location.href = "../first.html";
                    $.cookie("name", $("#txt_RealName").val(), { //存名字
                        expires: 7,
                        path: '/'
                    }); // 设置过期时间为7天后
                    $.cookie("user", $("#txtUserName").val(), { //存手机号码
                        expires: 7,
                        path: '/'
                    })
                }
            })
        }
    })
})