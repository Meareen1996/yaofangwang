$(function () {
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
        let smallpic = arr[0].smallpic.split(',');
        toRender = arr.map(function (item) {
            return `
            <div class="d-show">
                <div class="big-pic">
                    <img src="${item.src}" jqimg="${smallpic[0]}" alt="">
                    </div>
                <div class="small-pic">
                    <a class="prev" href="javascript:;">
                        <</a> 
                
                        <ul>
                            <li><img src="${smallpic[0]}" alt=""></li>
                            <li><img src="${smallpic[1]}" alt=""></li>
                            <li><img src="${smallpic[2]}" alt=""></li>
                            <li><img src="${smallpic[3]}" alt=""></li>
                            <li><img src="${smallpic[4]}" alt=""></li>
                            </ul>
                            <a class="next" href="javascript:;">></a>
                            </ul>
            
                </div>
            </div>
           
            <div class="d-information">
                <ul class="infor-box">
                    <li class="d-title">
                        <h1>${item.title}</h1>
                    </li>
                    <li class="d-price">
                        <span>酒仙价</span>
                        <h2>￥${item.price}</h2>
                    </li>
                    <li>
                        <img src="../img/1557117799(1).jpg" alt="">
                    </li>
                    <li class="d-quantity">
                        <span>数量</span>
                        <input class="quantity" type="text" value="${item.quantity}">
                        <a class="add" href="javascript:;">
    
                            <</a> <a class="cut" href="javascript:;">>
                        </a>
                    </li>
                    <li class="go-to-shopping">
                        <input type="button" class="d-buy" value="加入购物车">
                    </li>
                </ul>
            </div>`

        })
        $('.dIntro').html('');
        $('.dIntro').append(toRender);
    }).then(function () { //放大镜实现js
        $(".big-pic").jqueryzoom({
            xzoom: 400, //放大图的宽度(默认是 200)
            yzoom: 400, //放大图的高度(默认是 200)
            offset: 10, //离原图的距离(默认是 10)
            position: "right", //放大图的定位(默认是 "right")
            preload: 1
        });
        //底部图片hover切换实现js
        $('.small-pic ul li img').hover(function () {
            // console.log($(this).attr('src'));
            $('.big-pic img').attr('src', $(this).attr('src'));
            $('.big-pic img').attr('jqimg', $(this).attr('src'));
        }, function () {
            $.noop();
        });
    }).then(function () {
        $('.add').click(function () {
            var num = $('.d-quantity .quantity').val();
            num++;
            $('.d-quantity .quantity').val(num);
        })
        $('.cut').click(function () {
            var num = $('.d-quantity .quantity').val();
            num--;
            if (num <= 1) {
                num = 1;
            }
            $('.d-quantity .quantity').val(num);
        })
        $('.d-buy').click(function () {
            location.href = "../html/cart.html?quantity=" + $('.d-quantity .quantity').val() + "&id=" + dataid;
            // $.ajax({

            // })
        })
    })

    // ===========================================================================================

})