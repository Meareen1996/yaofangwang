$(function () {
    // 顶部！！！！！！！！！！！！！！！！！！！！！！！！！！！
    $(".header").load("index_header.html", function () {
        // 渲染登录信息
        $name = $.cookie('name'); //把cookie值放在登录页
        $user = $.cookie('user'); //把cookie值放在登录页
        if ($name) {
            $('.reg-and-login').children().hide(); //如果账号已登录，则隐藏注册和登录按钮
            res = `<span>您好，${$name}</span><b class="quit">退出</b>`
            $('.reg-and-login').append(res);
        } else if ($user) {
            $('.reg-and-login').children().hide(); //如果账号已登录，则隐藏注册和登录按钮
            res = `<span>您好，${$user}</span><b class="quit">退出</b>`
            $('.reg-and-login').append(res);
        }
        //退出账号操作
        $('.quit').click(function () { //点击按钮，清除cookie
            // console.log(666);
            $.removeCookie('user', {
                path: '/'
            });
            $.removeCookie('name', {
                path: '/'
            });
            $('.reg-and-login').find('a').show();
            $(".reg-and-login span").remove();
            $(".reg-and-login b").remove();
        })


        // 最顶部的个人中心下拉菜单
        $(".header .right .personal").hover(function () {
            $(this).addClass("hover").css("borderColor", "#ccc");
            $(".header .right .personal-content").show().addClass("hover").prev().hide();
            $(".top-dh").addClass("turnup");
        }, function () {
            $(this).removeClass("hover");
            $(".header .right .personal-content").hide();
            $(this).addClass("hover").css("borderColor", "#fff");
            $(".header .right .personal-content").hide().removeClass("hover").prev().show();
            $(".top-dh").removeClass("turnup");
        })

        //最顶部的网站导航下拉菜单
        $('.Website-navigation').hover(function () {
            $(this).css("borderColor", "#ccc");
            $(this).addClass("hover").children(".other-website").show();
            $(this).children(".line").show();
            $(".top-dh").addClass("turnup");
        }, function () {
            $(this).css("borderColor", "#fff");
            $(this).removeClass("hover").children(".other-website").hide();
            $(this).children(".line").hide();
            $(".top-dh").removeClass("turnup");
        })
        //顶部下拉菜单完
    })

    // 先判断一下user是否存在
    // 操作购物车
    var username = $.cookie("user"); //用户名
    var readyGoods = $.cookie("want_goods"); //本地购物车
    // console.log(readyGoods);
    if (username != '') {
        var p = new Promise(function (resolve) {
            $.ajax({
                type: "post",
                url: "../api/cart.php",
                data: {
                    cid: username,
                },
                success: function (str) {
                    resolve(str);
                }
            })
        })
        p.then(function (data) {
            var data = JSON.parse(data);
            render(data);
        }).then(function () {
            // 操作购物车
            //全局的checkbox选中和未选中的样式
            var $wholeChexbox = $('table tbody .w1 .js-checkAll');
            var $singleChexbox = $('table tbody .w1 .js-ck-medicine');
            var type = "";
            var gid = 0;
            var storage = 0;
            var $all_total = 0;
            var sumGood=0;

            $("table tbody .w1 .ck").click(function () {
                // 控制全选
                $(this).children('i').toggleClass("checked");
                if ($singleChexbox.children('.checked').length == $singleChexbox.children('i').length) {
                    $($wholeChexbox).children('i').attr("class", 'checked');
                } else {
                    $($wholeChexbox).children('i').attr("class", '');
                }
            });
            // 点击全选框，控制下面的盒子
            $wholeChexbox.click(function () { //点击全选时，下面的商品全部选中
                $(this).children('i').toggleClass("checked");
                $singleChexbox.children('i').attr('class', $(this).children('i').prop('class'))
            });

            function init(c_type, quantity, gid, storage) { //封装一个发送请求的函数
                var p2 = new Promise(function (resolve) {
                    $.ajax({
                        type: "post",
                        url: "../api/control_cart.php",
                        data: {
                            gid: gid,
                            cid: username,
                            type: c_type,
                            quantity: quantity,
                            storage: storage

                        },
                        success: function (res) {
                            resolve(res);
                        }
                    });
                });
                p2.then(function (res) {
                    // rendering(res)
                })
            }

            // 点击加+
            $("tr").on("click", ".js-add", function () {
                type = "add";
                gid = $(this).parent().parent().parent().attr("data-id");
                storage = $(this).parent().parent().parent().attr("data-store");
                // storage--;
                storage = --storage;
                // console.log(storage);
                var num = $(this).prev(".js-num").val();
                num++;
                if (num >= $(this).parent().parent().parent().attr("data-store")) { //加入购物车的数量不能大于库存
                    num = $(this).parent().parent().parent().attr("data-store");
                }
                $(this).prev(".num").val(num);
                quantity = num;
                init(type, quantity, gid, storage);
                // 商品的总价跟着变
                $conut_price = quantity * $(this).parent().parent().parent().find(".money2").html();
                $conut_price = $conut_price.toFixed(2); +
                $(this).parent().parent().parent().find(".js-money").html($conut_price);
                // $(this).parent().parent().parent().find("i").attr("class", "checked");
                // all();
            })

            // 点击减-;
            $("tr").on('click', '.js-sub', function () {
                type = "sub";
                gid = $(this).parent().parent().parent().attr("data-id");
                storage = $(this).parent().parent().parent().attr("data-store");
                console.log(storage);
                storage++;
                storage += storage;
                var num = $(this).next(".js-num").val();
                num--;
                if (num <= 1) {
                    num = 1;
                }
                $(this).next(".js-num").val(num);
                quantity = num;
                init(type, quantity, gid, storage);
                // 商品总价跟着变
                $conut_price = quantity * $(this).parent().parent().parent().find(".money2").html();
                $conut_price = $conut_price.toFixed(2);
                // console.log($conut_price);
                $(this).parent().parent().parent().find(".js-money").html($conut_price);
                // $(this).parent().parent().parent().find("i").attr("class", "checked");
                // all();
            })

            //删除单个商品
            $("tr").on("click", ".js-delete", function () {
                console.log("删除");
                type = "del";
                gid = $(this).parent().parent().attr("data-id");
                console.log(gid);
                init(type, '', gid, '');
                $(this).parent().parent().remove();
            })


            // 计算总计
            var arr = [];

            function all() {
                arr = [];
                $('tr .w1 .js-ck-medicine>i').each(function (i, item) {
                    if ($(item).prop('class') == 'checked') {
                        //被勾选了，把下标存起来
                        arr.push(i);
                    }
                });
                console.log(arr);

                for (var j = 0; j < arr.length; j++) {
                    console.log($('.js-money').eq(j));
                     sumGood = Number($('.js-money').eq(j).text());
                    console.log(sumGood);
                }
                $all_total += sumGood;
                console.log($all_total);
                $('.js-cart-total').html($all_total);
            }

            $('tr .w1 .js-ck-medicine').click(function () {
                if($(this).children(".checked")){
                    all();
                }else{
                    $('.js-cart-total').html(0);
                }
            })

        });

    }
    // 渲染商品
    function render(str) {
        var res = str.map(function (item) {
            return `
            <tr data-id="${item.gid}" data-store="${item.storage}">
            <td class="w1">
                <div class="ck js-ck js-ck-medicine"><i class="" data-cartid="21205157"></i></div>
            </td>
            <td class="w2">
                <a target="_blank" href="/detail-3268752.html">
                    <img src="../img/index/${item.img}"
                        alt="${item.title}">
                </a>
            </td>
            <td class="w3">
                <a target="_blank" class="clearfix" href="/detail-3268752.html">
                    <i class="icon_rx_dw fl"></i>
                    <strong>${item.title}</strong>
                </a>
                <p>${item.size}</p>
                <p>${item.eat_type}</p>

            </td>
            <td class="w4">
                <span class="money2">${item.price}</span>
            </td>
            <td class="w5">
                <span class="quantity">
                    <a class="sub jian js-sub" href="javascript:void(0);" data-step="-1"></a>
                    <input type="text" class="num js-num" value="${item.quantity}" data-unit-price="18.6"
                        data-lock-price="18.6" data-cartid="21205157" data-pkid="0">
                    <a class="add jia js-add" href="javascript:void(0);" data-step="1"></a>
                </span>
            </td>
            <td class="w6">
                <span class="money js-money">${item.total_price}</span>
            </td>
            <td class="w7">
                <a href="javascript:void(0);" data-cartid="21205157" data-pkid="0" class="js-delete">删除</a>
            </td>
        </tr>
        <tr>
        <td colspan="5"></td>
        <td class="w7" colspan="2">商品金额合计：<span class="money js-total">${item.total_price}</span></td>
        </tr>
        `

        }).join('');
        $('.order_content').append(res);
    }

    // 底部！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    $(".footer").load("index_footer.html", function () {
        $(this).parent().css("height", "auto");
        $(this).children("label").html("")
    })
})