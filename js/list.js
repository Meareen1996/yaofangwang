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
            console.log(666);
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

    // 搜索框！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！


    $(".top-search").load("index_search.html", function () {
        // 搜索框下拉
        $(".opt-list li:first").hover(function () {
            $(this).css("background", "rbg(222,222,222)").nextAll().show();
            $(this).siblings().addClass("choose-supplier");
            $(this).prev().show();
            $(".opt-list li:last").addClass("choose-supplier2");
        }, function () {
            $(this).css("background", "#fff").nextAll().hide();
            $(this).prev().hide();
        })
    })
    // 导航！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    $(".nav").load("index_nav.html", function () {
        // 导航栏
        $(".category").hover(function () {
            $(".vertical-nav").show();
        }, function () {
            $(".vertical-nav").hide();
        })
        // 二级导航功能

        $(".horizontal-nav .category .vertical-nav").on("mouseenter", "li", function () {
            $(this).css({
                "background": "#eaeaea",
                "borderBottom": "1px solid #ccc",
            }).siblings().css({
                "background": "#fff",
                "borderBottom": "1px dashed #e5e5e5",
            });
            var index = $(this).index();
            $(".horizontal-nav .category .sec-nav-box .secondary-navigation").eq(index).show()
                .css({
                    "background": "#eaeaea",
                }).siblings().hide();
        })
        $(".horizontal-nav .category .vertical-nav").on("mouseleave", "li", function () {
            $(this).css({
                "background": "#fff",
                "border": "1px dashed #e5e5e5",
            });
            var index = $(this).index();
            $(".horizontal-nav .category .sec-nav-box .secondary-navigation").eq(index).hide()
                .css({
                    "background": "#fff",
                }).siblings().hide();
        })
    })

    // 列表页核心部分！！！！！！！！！！！！！！！！！！！！！！！！！
    // 相关产品的说明分类部分
    $(".pag-right .select .sitems").on("click", ".plus", function () {
        $(this).parent().toggleClass("tryExpand")
        $(this).children(".icons").toggleClass("upward");
    })




    // 渲染列表页！！！！！！！！！！！！！！！！！！！！！！！！！！！！

    //渲染商品
    var num = 20;
    var total_page = 0;
    var total_recording = 0;
    var type = ''; //price:根据价格排序 
    var order = ''; //up:升序   down：降序
    var curr = 0;


    function init(page) {
        var p = new Promise(function (resolve) {
            $.ajax({
                type: "get",
                url: "../api/list.php",
                data: {
                    page: page,
                    num: num,
                    type: type,
                    order: order
                },
                success: function (res) {
                    resolve(res);
                }
            })
        })
        p.then(function (res) {
            var data2 = JSON.parse(res);
            total_recording = data2.total_recording;
            rendering(data2);
        }).then(function () {
            layui.use('laypage', function () {
                var laypage = layui.laypage;
                //执行一个laypage实例
                laypage.render({
                    elem: 'green_page', //注意，这里的 test1 是 ID，不用加 # 号
                    count: total_recording, //数据总数，从服务端得到
                    limit: num,
                    curr: page,
                    theme: "#0cb95f",
                    jump: function (obj, first) {
                        curr = obj.curr;
                        console.log(curr);
                        //console.log(obj.limit); //得到每页显示的条数
                        if (!first) {
                            console.log(curr);
                            init(curr);
                            // (obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                        }
                    }
                });
            });

        }).then(function () {
            $(".layui-box").on("click", "a", function () {
                if ($(".layui-box").children("a").html() == page) {
                    console.log(page);
                    var trunGreen = `<span class = "layui-laypage-curr"> <em class = "layui-laypage-em"
                style = "background-color:#0cb95f;"> </em><em>${page}</em> </span>`
                    $(this).html(trunGreen);
                }
            })
        }).then(function () {
            // 列表页特效（商品部分）
            $(".goodlist li").hover(function () {
                $(this).addClass("active");
                $(this).children(".info").addClass("showborder");
                $(this).find(".op span").css("background", "#e5e5e5");
                $(this).find(".op a").addClass("a_detail");
                $(this).find(".info .n").addClass("n_factory");
            }, function () {
                $(this).removeClass("active");
                $(this).children(".info").removeClass("showborder");
                $(this).find(".op span").css("background", "#fff");
                $(this).find(".op a").removeClass("a_detail");
                $(this).find(".info .n").removeClass("n_factory");
            })
        }).then(function () {
            //点击跳转详情页
            // function tiaozhuan() {
            $('.goodlist').on("click", "li", function () {
                console.log("detail.html?id=" + $(this).parent().parent().attr("data-id"))
                location.href = "detail.html?id=" + $(this).attr("data-id");
            })
            // }
        })

    }
    init(1);

    function rendering(str) { //渲染函数
        res2 = str.data.map(function (item) {
            return `
         <li class="" data-id="${item.id}">
    <div class="info medicineInfo" rel="198178">
    <a href="javascript:void(0);" class="photo" target="_blank">
        <img src="../img/index/${item.src}" class="autoimg">
    </a>
    <p class="money big">
    ¥${item.price}
    </p>
    <a href="javascript:void(0);" class="txt" target="_blank">${item.title}</a>
    <p class="st">
        ${item.size}
    </p>
    <p class="st">
        ${item.eat_type}
    </p>
    <p class="ph">
        批准文号：<img style="height:14px;"
            src="../img/index/${item.approve}">
    </p>
    <div class="op">
        <span>共<b>${item.merchant_num}</b>个商家有售</span><a href="javascript:void(0);" target="_blank">查看详情</a>
    </div>
    <p class="n">
        生产厂家：西安杨森制药有限公司
    </p>
</div>
</li>`
        }).join('');
        $('.pag-right .goodlist').html(res2);
    }




    // 底部！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    $(".footer").load("index_footer.html", function () {
        $(this).parent().css("height", "auto");
        $(this).children("label").html("")
    })

})