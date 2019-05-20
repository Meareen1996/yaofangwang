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


    // 制作一个小小的吸顶菜单
    var titleTop = $(".infotip").position().top;
    console.log(titleTop);
    var height = $(".dfix").outerHeight();
    roll_Y = parseInt(titleTop) + parseInt(height) + 550;
    $(window).scroll(function () {
        console.log(titleTop);
        if ($(window).scrollTop() > roll_Y) {
            $('.dfix').css({
                "position": "fixed",
            });
        } else {
            $('.dfix').css(
                "position", "static"
            );
        }
    })
    // 吸顶菜单完


    // 渲染商品到详情页
    var needid = location.search;
    console.log(needid);
    var dataid = needid.slice(4);
    // 发送id，请求数据，进行渲染
    var p = new Promise(function (resolve) {
        $.ajax({
            type: "get",
            url: "../api/detail.php",
            data: {
                id: dataid
            },
            success: function (str) {
                // console.log(str);
                resolve(str);
            }
        })
    })
    p.then(function (res) { //渲染数据
        var arr = JSON.parse(res);
        console.log(arr)
        let smallpic = arr[0].small_pic.split('&');
        toRender = arr.map(function (item) {
            // <!-- 左边 -->
            return `
             <div class="detail_left">
                <a class="bigpic" href="">
                    <div class="zoomPad">
                        <img class="imgzoom" src="../img/index/${item.src}" jqimg="${item.src}"alt="">
                    </div>
                    <span class="imgTip">温馨提醒：商品包装因厂家更换频繁，如有不符请以实物为准。</span>
                </a>

                <div class="piccontainer clearfix">
                    <div class="pic_list clearfix" id="thumblist" style="width: 632px;">
                        <a href="" title="" class="p first">
                            <img alt="" src="../img/index/${smallpic[0]}">
                        </a>
                        <a href="" title="" class="p first">
                            <img alt="" src="../img/index/${smallpic[1]}">
                        </a>
                        <a href="" title="" class="p first">
                            <img alt="" src="../img/index/${smallpic[2]}">
                        </a>
                        <a href="" title="" class="p first">
                            <img alt="" src="../img/index/${smallpic[3]}">
                        </a>
                        <a href="" title="" class="p first">
                            <img alt="" src="../img/index/${smallpic[4]}">
                        </a>
                        <a href="" title="" class="p first">
                            <img alt="" src="../img/index/${smallpic[5]}">
                        </a>
                        <a href="" title="" class="p first">
                            <img alt="" src="../img/index/${smallpic[6]}">
                        </a>
                       
                    </div>
                    <a class="icons arrow l");"></a>
                    <a class="icons arrow r");"></a>
                </div>
            

                
                <div class="share clearfix">
                    <div class="ids">
                        商品编号：566172
                    </div>
                    <a class="item f " id="aFavorite" data-mid="566172" data-sid="165786"><b
                            class="icons"></b><em>收藏该商品</em></a>
                </div>
            </div>
            <!-- 左边完 -->
            <!-- 中间 -->
            <div class="detail_center">
                <h1 class="clearfix">
                    <strong class="short-width">
                        <span>${item.title}</span>
                        <i class="icon_rx_dw"></i></strong>
                </h1>
                <div class="appad">
                    <a target="_blank" href="javascript:void(0);" class="i2" rel="nofollow">下载App领20元优惠券</a>
                    <a href="javascript:void(0);" class="right-entry" rel="nofollow">
                        <img src="../img/index/662c3ccf33ec90f127b4827e91c0091c.jpg">
                    </a>
                </div>
                <div class="info clearfix">
                    <dl class="clearfix">
                        <dt class="l">通&nbsp;&nbsp;用&nbsp;&nbsp;名</dt>
                        <dd class="w2 l"><strong>六神丸</strong></dd>
                        <dt class="l">商品名/品牌</dt>
                        <dd class="w3 l">
                            雷允上
                            <span class="z" id="pz">[注]</span>
                            <div class="tip" id="amore2">
                            </div>
                        </dd>
                        <dt class="l">包装规格</dt>
                        <dd class="w2n l">
                            <div class="downup" id="standardOther">
                                <div class="now">
                                   <span>${item.size}</span>
                                   <i class="icons"></i>
                                </div>
                                <div class="line">
                                </div>
                            </div>
                        </dd>
                        <dt class="l">剂型/型号</dt>
                        <dd class="w3 l">${item.eat_type}</dd>
                        <dt class="l">生产企业</dt>
                        <dd class="w2 l">雷允上药业集团有限公司</dd>
                        <dt class="l">批准文号</dt>
                        <dd class="w3 l">
                            <div class="f2">
                                <img style="height:14px;"
                                    src="../img/index/${item.approve}">
                            </div>
                        </dd>
                    </dl>
                    <div class="prices clearfix">
                        <dl class="price h2" id="pricedl">
                            <dt>零售价格</dt>
                            <dd class="w1">
                                <a style="text-decoration:none" rel="nofollow" href="javascript:void(0);">
                                    <span class="hide_price">${item.price}</span>
                                    <span>
                                    </span>
                                </a>
                            </dd>
                        </dl>
                        <div class="qrcode">
                            <i class="icons"></i>手机扫一扫<s class="icons"></s>
                            <div class="code" style="display:none">
                                <img src="../img/index/QRCode.gif" alt="雷允上 六神丸价格比价更便捷">
                                <div class="txt">
                                    查药比价更方便
                                </div>
                            </div>
                        </div>
                    </div>
                    <dl>
                        <dt>运&nbsp;&nbsp;&nbsp;&nbsp;费</dt>
                        <dd class="w1">
                            <div class="downup" id="regionContainer">
                                <div class="now" id="regionSelect">
                                    至 广州市<i class="icons"></i>
                                </div>
                                <div class="line">
                                </div>
                                <div class="reginbox big" id="areaDiv">
                                    <ul id="provinces">
                                        <li><a href="javascript:void(0);" rel="40" title="北京">北京</a></li>
                                        <li><a href="javascript:void(0);" rel="4821" title="天津">天津</a></li>
                                        <li><a href="javascript:void(0);" rel="95" title="上海">上海</a></li>
                                        <li><a href="javascript:void(0);" rel="96" title="重庆">重庆</a></li>
                                        <li><a href="javascript:void(0);" rel="97" title="黑龙江">黑龙江</a></li>
                                        <li><a href="javascript:void(0);" rel="1265" title="吉林">吉林</a></li>
                                        <li><a href="javascript:void(0);" rel="1316" title="辽宁">辽宁</a></li>
                                        <li><a href="javascript:void(0);" rel="1377" title="河北">河北</a></li>
                                        <li><a href="javascript:void(0);" rel="1525" title="山西">山西</a></li>
                                        <li><a href="javascript:void(0);" rel="1633" title="内蒙古">内蒙古</a></li>
                                        <li><a href="javascript:void(0);" rel="1726" title="江苏">江苏</a></li>
                                        <li><a href="javascript:void(0);" rel="1792" title="浙江">浙江</a></li>
                                        <li><a href="javascript:void(0);" rel="1862" title="安徽">安徽</a></li>
                                        <li><a href="javascript:void(0);" rel="1942" title="福建">福建</a></li>
                                        <li><a href="javascript:void(0);" rel="2011" title="江西">江西</a></li>
                                        <li><a href="javascript:void(0);" rel="2103" title="山东">山东</a></li>
                                        <li><a href="javascript:void(0);" rel="2212" title="河南">河南</a></li>
                                        <li><a href="javascript:void(0);" rel="2339" title="湖北">湖北</a></li>
                                        <li><a href="javascript:void(0);" rel="2418" title="湖南">湖南</a></li>
                                        <li><a href="javascript:void(0);" rel="2521" title="广东">广东</a></li>
                                        <li><a href="javascript:void(0);" rel="2610" title="广西">广西</a></li>
                                        <li><a href="javascript:void(0);" rel="2700" title="海南">海南</a></li>
                                        <li><a href="javascript:void(0);" rel="2721" title="四川">四川</a></li>
                                        <li><a href="javascript:void(0);" rel="2882" title="贵州">贵州</a></li>
                                        <li><a href="javascript:void(0);" rel="2970" title="云南">云南</a></li>
                                        <li><a href="javascript:void(0);" rel="3112" title="西藏">西藏</a></li>
                                        <li><a href="javascript:void(0);" rel="3192" title="陕西">陕西</a></li>
                                        <li><a href="javascript:void(0);" rel="3302" title="甘肃">甘肃</a></li>
                                        <li><a href="javascript:void(0);" rel="3388" title="青海">青海</a></li>
                                        <li><a href="javascript:void(0);" rel="3436" title="宁夏">宁夏</a></li>
                                        <li><a href="javascript:void(0);" rel="3442" title="新疆">新疆</a></li>
                                    </ul>
                                    <div class="dline" id="areaLine" style="display: none;">
                                    </div>
                                    <ul id="citys">
                                    </ul>
                                    <div class="dline" id="areaLine2" style="display: none;">
                                    </div>
                                    <ul id="xians">
                                    </ul>
                                </div>
                            </div>
                            <span class="par" id="shopPrice">快递：10.00</span>
                        </dd>
                    </dl>
                    <dl class="h2">
                        <dt>需求数量</dt>
                        <dd class="w1">
                            <span class="quantity">
                                <a class="sub dis" href="javascript:void(0);" id="buyminus"></a>
                                <input type="text" class="num" value="1" id="quantity">
                                <a class="add" href="javascript:void(0);" id="buyplus"></a>
                            </span>
                            <span class="par">
                                库存：
                                <label id="reserve">${item.in_stock}</label>盒
                            </span>
                        </dd>
                    </dl>
                    <div class="mainop clearfix">
                        <a href="javascript:void(0);" class="ibtn2" id="buy">提交需求</a>
                        <a href="javascript:void(0);" class="ibtn1" id="addcart">加入需求单</a>
                    </div>
                    <div class="sinfo clearfix">
                        <p class="hui">
                            该报价由：武汉福康大药房零售连锁有限公司康源药店发布，商家承诺：
                        </p>
                        <div class="spec clearfix">
                            <span><i class="icons fahuo2"></i>24小时内发货</span>
                            <span><i class="icons zheng2"></i>正品保障</span>
                            <span><i class="icons piao2"></i>提供发票</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="detail_right saleinfo" style="height:508px;">
                    <div class="title">
                        <p class="np">
                            <a rel="nofollow" href="javascript:void(0);"><img
                                    src="../img/index/25e49c52-f46b-4b41-87cf-6842cdd010ee7003.jpg.png"
                                    alt="武汉福康大药房零售连锁有限公司康源药店"></a>
                        </p>
                        <p id="morebtn" class="pr">
                            武汉福康大药房零售连锁有限公司康源药店<i class="icons"></i>
                        </p>
                    </div>
                    <div style="display:block;" class="detail" id="maininfo">
                        <div class="pf clearfix">
                            <dl>
                                <dt>服务</dt>
                                <dd>5.0</dd>
                            </dl>
                            <dl>
                                <dt>发货</dt>
                                <dd>4.6</dd>
                            </dl>
                            <dl>
                                <dt>物流</dt>
                                <dd>4.6</dd>
                            </dl>
                            <dl class="nr">
                                <dt>包装</dt>
                                <dd>4.9</dd>
                            </dl>
                        </div>
                        <p>
                            店铺评分：<span class="star"><label style="width:96.0%;"></label></span><label
                                class="num fa">4.8</label>
                        </p>
                        <p>
                            退&nbsp;&nbsp;单&nbsp;&nbsp;率：<label class="fa">0.2%</label>
                        </p>
                        <p>
                            发货时长：<label class="fa">6.4</label>小时
                        </p>
                        <p>
                            营业时间：<label class="fa">8:00-20:00</label>
                        </p>
                        <p style="overflow: hidden; max-height: 70px;">
                            店铺地址：武汉市蔡甸区蔡甸街树藩大街413附23、24、25号
                        </p>
                    </div>
                    <div style="display: none;" class="detail" id="subinfo">
                        <div class="zz clearfix">
                            <i class="gsp" title="GSP已验证"></i>
                            <i class="yyzz" title="营业执照已验证"></i>
                            <i class="jyxkz" title="经营许可证已验证"></i>
                        </div>
                        <p>
                            营业执照：914201140777334054
                        </p>
                        <p>
                            GSP证号：B-HUB16-01-0365
                        </p>
                        <p>
                            经营许可证：鄂CB0278653
                        </p>
                        <p>
                            经营范围：中成药、化学药制剂、抗生素制剂、生化药品、生物制品(不含疫苗)、(不含冷藏冷冻药品)。
                        </p>
                    </div>
                    <div class="enter2 clearfix">
                    </div>
                    <div class="go">
                        <a href="javascript:void(0);" rel="nofollow">进入店铺</a>
                    </div>
                </div>
            `
            // <!-- 中间完 -->

        })
        $('.maininfo2').html(toRender);
    }).then(function () { //放大镜实现js
        $(".zoomPad").jqueryzoom({
            xzoom: 400, //放大图的宽度(默认是 200)
            yzoom: 400, //放大图的高度(默认是 200)
            offset: 10, //离原图的距离(默认是 10)
            position: "right", //放大图的定位(默认是 "right")
            preload: 1
        });
        //底部图片hover切换实现js
        $('.piccontainer .pic_list a img').hover(function () {
            $('.bigpic img').attr('src', $(this).attr('src'));
            $('.bigpic img').attr('jqimg', $(this).attr('src'));
        }, function () {
            $.noop();
        });
    }).then(function () {
        $('.add').click(function () {
            var num = $('#quantity').val();
            num++;
            $('#quantity').val(num);
        })
        $('.dis').click(function () {
            var num = $('#quantity').val();
            num--;
            if (num <= 1) {
                num = 1;
            }
            $('#quantity').val(num);
        })

        $('#addcart').click(function () {
            // 点击加入购物车
            //先获取商品名字和单价还有库存以备后面使用  
            var $pic = $(".imgzoom").attr("src"); //图片
            var $title = $(".short-width span").text(); //标题
            var $quantity = $('#quantity').val(); //数量
            // console.log($quantity);
            var $size = $(".now span").text(); //规格
            var $eat_type = $("w3 l").text(); //类型
            var $price = $(".hide_price").text(); //单价
            var $stock = $(".w1 .par #reserve").text(); //库存

            //查看库存是否还有<=0  
            if ($stock <= 0) {
                return;
            } else {
                //无论购物车中是否有该商品,库存都要-1  
                $("#reserve").html(--$stock); //点击加入购物车，库存减，数量加
                // $("#quantity").val(++$quantity);
            }
            // 判断用户是否登录，如果未登录，存到cookie
            // console.log($.cookie("user"));
            var readyGoods = [$.cookie(readyGoods)] || [];
            if ($.cookie("user") == null) {
                //在添加之前确定该商品在购物车中是否存在,若存在,则数量+1  
                if ($.inArray(dataid, readyGoods) < 0) {
                    var obj = {};
                    obj.guid = dataid;
                    obj.imgurl = $pic;
                    obj.gname = $title;
                    obj.price = $price;
                    obj.qty = $quantity;
                    obj.size = $size;
                    obj.eat_type = $eat_type;
                    obj.stock = $stock;
                    readyGoods.push(obj);
                    // $.removeCookie('user', {
                    //     path: '/'
                    // });
                    $.cookie("want_goods", JSON.stringify(readyGoods), {
                        path: '/'
                    }); //把购物车先存在cookie里面
                    location.href = "../html/cart.html";
                } else {
                    var i;
                    i = $.inArray(dataid, readyGoods);
                    readyGoods[i].qty++;
                    $.cookie('want_goods', JSON.stringify(readyGoods), {
                        path: '/'
                    }); //把购物车先存在cookie里面
                    console.log(readyGoods);
                    // console.log(document.cookie);
                    location.href = "../html/cart.html";
                }
            } else if ($.cookie("user") !== '') { //如果用户已登录，把购物车信息存到数据库
                console.log(66);
                console.log("插入数据库吧");
                var $uid = $.cookie("user");
                cid = $uid;
                gid = dataid;
                qty = $quantity;
                var p = new Promise(function (resolve) {
                    $.ajax({
                        type: "post",
                        url: "../api/save_goods.php",
                        data: {
                            cid: cid,
                            gid: gid,
                            qty: qty,
                        },
                        success: function (res) {
                            resolve(res);
                        }
                    })
                });
                p.then(function () {
                    location.href = "../html/cart.html";
                })
            }
        })
    })

    // ===========================================================================================
    // 底部！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    $(".footer").load("index_footer.html", function () {
        $(this).parent().css("height", "auto");
        $(this).children("label").html("")
    })
})