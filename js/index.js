$(function () {
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

    // 导航栏
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

    // 轮播图
    var backgroundClassname = ["one", "two", "three", "four", "five"];
    var mySwiper = new Swiper('.gallery-top', {
        autoplay: true, //可选选项，自动滑动
        loop: true,
        effect: 'fade',
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        grabCursor: true, //鼠标光标
        // 缩略图部分
        on: {
            slideChange: function () { //当轮播开始时候，背景图也开始轮播
                var moveindex = this.activeIndex;
                $(backgroundClassname).each(function (index, item) {
                    $(".banner").removeClass(item);
                })
                if (moveindex > 5) {
                    moveindex = 1;
                }
                if (moveindex < 1) {
                    moveindex = 5;
                }
                $(".banner").addClass(backgroundClassname[moveindex - 1]);

            },
        },

        // on: {
        //     slideChange: function () {
        //         $(".small-part").eq(this.activeIndex - 1).addClass("special").siblings().removeClass("special");
        //     },
        // }

    })
    // 鼠标移入移出控制
    $('.gallery-top').hover(function () {
        $(".gallery-thumbs").show();
    }, function () {
        $(".gallery-thumbs").hide();
    })

    // $(".gallery-thumbs").on("mouseenter", ".small-part", function () {
    //     console.log(66);
    //     $(this).addClass("special").siblings().removeClass("special");
    // })

    //限时购特效
    $(".xs-list .relative-msg").hover(function () {
        $(this).find("img").addClass("xs-go");
    }, function () {
        $(this).find("img").removeClass("xs-go");
    })


    //楼层内容轮播图
    var mySwiper = new Swiper('.floor-carousel', {
        autoplay: true, //可选选项，自动滑动
        loop: true,
        effect: 'fade',
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    // 楼层轮播图完
    // 首页选项卡，发送请求，渲染选项卡数据

    function init(num) {
        $.get("api/first.php", {
            leiid: num
        }, function (res) {
            // console.log(res);
            render(res);
        })

    };
    init(1);

    //渲染到页面

    function render(res) {
        var renderdate = JSON.parse(res);
        //切割字符串
        var newsrc = renderdate[0].src.split("&");
        var newtitle = renderdate[0].title.split("&");
        var newquantity = renderdate[0].quantity.split("&");
        var newprice = renderdate[0].price.split("&");
        str = renderdate.map(function (item) {
            return `
            <li class="each-drug-item" data-id="${item.lei_id}">
            <a class="goods-pic" href="javascript:void(0);">
                <img src="img/index/${newsrc[0]}" alt="">
            </a>
            <a class="goods-title" href="javascript:void(0);">
               ${newtitle[0]}
            </a>
            <p class="goods-quantity">${newquantity[0]}</p>
            <p class="goods-price">${newprice[0]}</p>
        </li>
            <li class="each-drug-item" data-id="${item.lei_id}">
            <a class="goods-pic" href="javascript:void(0);">
                <img src="img/index/${newsrc[1]}" alt="">
            </a>
            <a class="goods-title" href="javascript:void(1);">
               ${newtitle[1]}
            </a>
            <p class="goods-quantity">${newquantity[1]}</p>
            <p class="goods-price">${newprice[1]}</p>
        </li>
            <li class="each-drug-item" data-id="${item.lei_id}">
            <a class="goods-pic" href="javascript:void(0);">
                <img src="img/index/${newsrc[2]}" alt="">
            </a>
            <a class="goods-title" href="javascript:void(2);">
               ${newtitle[2]}
            </a>
            <p class="goods-quantity">${newquantity[2]}</p>
            <p class="goods-price">${newprice[2]}</p>
        </li>
            <li class="each-drug-item" data-id="${item.lei_id}">
            <a class="goods-pic" href="javascript:void(0);">
                <img src="img/index/${newsrc[3]}" alt="">
            </a>
            <a class="goods-title" href="javascript:void(0);">
               ${newtitle[3]}
            </a>
            <p class="goods-quantity">${newquantity[3]}</p>
            <p class="goods-price">${newprice[3]}</p>
        </li>
            <li class="each-drug-item" data-id="${item.lei_id}">
            <a class="goods-pic" href="javascript:void(0);">
                <img src="img/index/${newsrc[4]}" alt="">
            </a>
            <a class="goods-title" href="javascript:void(0);">
               ${newtitle[4]}
            </a>
            <p class="goods-quantity">${newquantity[4]}</p>
            <p class="goods-price">${newprice[4]}</p>
        </li>
            <li class="each-drug-item" data-id="${item.lei_id}">
            <a class="goods-pic" href="javascript:void(0);">
                <img src="img/index/${newsrc[5]}" alt="">
            </a>
            <a class="goods-title" href="javascript:void(0);">
               ${newtitle[5]}
            </a>
            <p class="goods-quantity">${newquantity[5]}</p>
            <p class="goods-price">${newprice[5]}</p>
        </li>
        </li>
            <li class="each-drug-item" data-id="${item.lei_id}">
            <a class="goods-pic" href="javascript:void(0);">
                <img src="img/index/${newsrc[6]}" alt="">
            </a>
            <a class="goods-title" href="javascript:void(0);">
               ${newtitle[6]}
            </a>
            <p class="goods-quantity">${newquantity[6]}</p>
            <p class="goods-price">${newprice[6]}</p>
        </li>
        </li>
            <li class="each-drug-item" data-id="${item.lei_id}">
            <a class="goods-pic" href="javascript:void(0);">
                <img src="img/index/${newsrc[7]}" alt="">
            </a>
            <a class="goods-title" href="javascript:void(0);">
               ${newtitle[7]}
            </a>
            <p class="goods-quantity">${newquantity[7]}</p>
            <p class="goods-price">${newprice[7]}</p>
        </li>  
        `
        })
        $(".fl-drug-right").html(str);
    }

    // 选项卡切换
    var leinum = 0;
    $(".fc-right").on("mouseenter", "a", function () {
        leinum = $(this).index() + 1;
        console.log(leinum);
        $(".fl-drug-right").html('');
        init(leinum);
    })

    // link部分选项卡操作

    $(".links .link-nav .tab_bottom").on("mouseenter", "li", function () {
        console.log(66);
        var linkNum = $(this).index();
        $(this).addClass("link-in-active").siblings().removeClass("link-in-active");
        console.log(linkNum);
        $(".all-join-in-webside .those-web").eq(linkNum).show().siblings().hide();
    })





});