$(function () {

    // 引入模块
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

    // 引入模块

    // 渲染注册信息到登录框
    if ($.cookie("user")) {
        $("#txt_AccountName").val($.cookie("user"));
    } else {
        console.log("当前没有保存cookie");
    }

    // 点击记住用户名，就设置cookie
    $(".login-item .ckdiv .ck").click(function () {
        console.log(66);
        $(this).children("i").toggleClass("checked");
    })

    // 点击提交按钮，验证账号和密码（非空验证，正则验证）
    var sendtype = '';
    // 发送请求
    function theRequest() { //点击登录
        var p = new Promise(function (resolve) {
            $.ajax({
                type: "post",
                url: "../api/login.php",
                data: {
                    user: $("#txt_AccountName").val(),
                    psw: $("#txt_Password").val(),
                    sendtype: sendtype
                },
                success: function (res) {
                    console.log(res);
                    resolve(res);
                }
            })
        })
        p.then(function (result) {
            if (result === "yes") {
                $("#div_error").hide()
                location.href = "../first.html";
                // 判断是否勾选了保存用户名
                // 存cookie
                if ($(".ckdiv .ck i").attr("class") == "checked") {
                    $.cookie("user", $("#txt_AccountName").val(), { //存手机号码
                        expires: 30,
                        path: '/'
                    });
                } else {
                    console.log("未保存用户名")
                }

            } else {
                $("#div_error").show().children(".text").html("用户名或密码错误！");
            }
        })
    }

    $("#btn_Submit").click(function () {
        if ($("#txt_AccountName").val() == '' || $("#txt_Password").val() == '') {
            $("#div_error").show().children(".text").html("请输入完整用户登录信息！");
        } else if (!$("#txt_AccountName").val() == '' && !$("#txt_Password").val() == '') {
            // 第二步，进行正则判断
            if (/^[a-zA-Z0-9_-]{2,18}$/i.test(
                    $("#txt_AccountName").val())) {
                sendtype = 'yonghuming';

                if (/^(?![0-9]+$)(?![a-zA-Z]+$)/i.test($("#txt_Password").val())) {
                    // 验证密码
                    theRequest(); //点击登录
                } else {
                    $("#div_error").show().children(".text").html("用户名或密码错误！");
                }
            } else if (/^1[3|4|5|8][0-9]\d{4,8}$/.test($("#txt_AccountName").val())) {
                sendtype = "usephone";
                if (/^(?![0-9]+$)(?![a-zA-Z]+$)/i.test($("#txt_Password").val())) {
                    theRequest(); //点击登录
                } else {
                    $("#div_error").show().children(".text").html("用户名或密码错误！");
                }
            } else {
                $("#div_error").show().children(".text").html("用户名或密码错误！");
            }
        }
    })






})