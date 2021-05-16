import carousel from './Carousel.js'
import carousel2 from './Carousel2.js'
import { $ } from './library/jquery.js';
import cookie from './library/cookie.js';
$.ajax({
    type: "get",
    url: "../../interface/getData.php",
    dataType: "json",
    success: function(res) {
        let temp = '';
        res.forEach((elm, i) => {
            let picture = JSON.parse(elm.picture);
            // console.log(picture);

            temp += `<li class="grid-items">
            <a class="thumb" href="./product.html?id=${elm.id}">
                <p class="grid-img">
                    <img class='lazy' src="${picture[0].src}" alt="">
                </p>
                <div class="grid-title">
                    ${elm.title}
                </div>
                <p class="grid-desc">
                    ${elm.title2}&nbsp; 
                </p>
                <p class="grid-price">
                    ￥${elm.price}
                </p>
            </a>
        </li>`;
        });

        $('#list').append(temp);
    }
});



carousel();
carousel2();

var img = $("img");
img.on("contextmenu", function () { return false; });
img.on("dragstart", function () { return false; });


$.fn.extend({
    drag: function (btns, wid, row) {
        let box = $(this);
        let btn = btns
        $(box).mousedown(function (ev) {
            let oldPlaceX = ev.pageX;
            let oldtran = box.css('transform').replace(/[^0-9\-,]/g, '').split(',')[4]
            box.css('transition-duration', '0s')
            $(document).mousemove(function (ev) {
                let newPlaceX = ev.pageX;
                let changeX = newPlaceX - oldPlaceX;
                box.css('transform', `translate3d(${+oldtran + +changeX}px, 0px, 0px)`);
            })
            $(document).mouseup(function () {
                $(this).unbind()
                let oldtran = box.css('transform').replace(/[^0-9\-,]/g, '').split(',')[4]
                box.css('transition-duration', '.3s')
                if (oldtran >= 0) {
                    box.css('transform', `translate3d(${0}px, 0px, 0px)`);
                } else if (+oldtran <= -((box.children().length - row) * wid)) {
                    oldtran = -((box.children().length - row) * wid)
                    box.css('transform', `translate3d(${oldtran}px, 0px, 0px)`);
                }
            })
        });


        $(btn[0]).click(function () {
            let oldtran = box.css('transform').replace(/[^0-9\-,]/g, '').split(',')[4]
            if (oldtran <= -(wid * row)) {
                box.css('transform', `translate3d(${+oldtran + wid * row}px, 0px, 0px)`);
            }
        });
        $(btn[1]).click(function () {
            let oldtran = box.css('transform').replace(/[^0-9\-,]/g, '').split(',')[4]
            if (+oldtran >= -((box.children().length - row * 2) * wid)) {
                box.css('transform', `translate3d(${oldtran - wid * row}px, 0px, 0px)`);
            }
        });
    }
})

$('#drag').drag($('#goodsRecommend-recommend .grid-btn'), 242, 5)

$('#drag2').drag($('#goodsContent1 .grid-btn'), 202, 6)





let username = cookie.get('username')

if (username) {
    $('.username').html(username).attr('href', 'javascript:;')

    $('.username').css('font-size', '13px')

    $('.manger').children('.regout').remove()

    $('.manger').append('<a class = "loginOut">退出</a>')

    $('.loginOut').click(function () {
        cookie.remove('username');
        location.reload();
    })
}


// <img src="../img/index/gird-items1.png" alt=""></img>



// [{"color":"陶瓷白"},{"color":"碳晶黑"},{"color":"蜜语红"}]




// [{ "src": "../img/index/gird-items9.png"}, { "src": "../img/index/gird-items9-1.png"}, { "src": "../img/index/gird-items9-2.png"}, { "src": "../img/index/gird-items9-3.png"}, { "src": "../img/index/gird-items9-4.png"}, { "src": "../img/index/gird-items9-5.png"}, { "src": "../img/index/gird-items9-6.png"}]