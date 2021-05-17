import { $ } from './library/jquery.js';
import cookie from './library/cookie.js'
let small = $('#wrap')
let movebox = $(".cloud-zoom-lens")
let big = $('.cloud-zoom-big')
let id = location.search.split('=')[1];
let username = cookie.get('username')
if (username) {
    $('.username').html(username).attr('href', 'javascript:;')

    $('.username').css('font-size', '20px')

    $('.manger').children('.regout').remove()

    $('.manger').append('<a class = "loginOut">退出</a>')

    $('.loginOut').click(function () {
        cookie.remove('username');
        location.reload();
    })
}


$.ajax({
    type: "get",
    url: "../../interface/getItem.php",
    data: {
        id: id
    },
    dataType: "json",
    success: function (res) {
        let picture = JSON.parse(res.picture);
        let color = JSON.parse(res.color);
        let price = parseFloat(res.price).toFixed(2);
        $('#pro-name').html(res.title3);

        picture.forEach((elm, i) => {
            $('#pro-gallerys').find('img').eq(i - 1).attr('src', `${elm.src}`)
        });

        $(".attr2 span").text(color[0].color)
        $(".attr4 span").text(color[1].color)
        $(".attr6 span").text(color[2].color)
        $('#product-img').find('img').attr('src', picture[1].src)
        $("#pro-price").html(`<em>¥</em>${price}`)
        $("#pro-select-sku").html(`标准版 / ${color[0].color}`)
        $(".cloud-zoom-big").css('background-image', `url(${picture[1].src})`)
        $('.product-button01').on('click', function() {
            addItem(res.id, res.price, $('#pro-quantity').val());
            
            $('.success').fadeIn();
            setTimeout(function(){
                $('.success').fadeOut();
            },500)
        });


    }
});


function addItem(id, price, num) {
    let shop = cookie.get('shop');

    let product = {
        id,
        price,
        num
    }


    if (shop) {
        shop = JSON.parse(shop);


        if (shop.some(el => el.id === id)) {
            let _index = shop.findIndex(elm => elm.id == id);
            let count = parseInt(shop[_index].num);
            count += parseInt(num);
            shop[_index].num = count;
        } else {
            shop.push(product);
        }


    } else {
        shop = [];
        shop.push(product);
    }

    cookie.set('shop', JSON.stringify(shop), 1);
}

$('#pro-gallerys li').hover(function () {
    $(this).addClass('current')
    let bimg = $(this).find('img').attr('src')
    $('#product-img').find('img').attr('src', bimg)
    $(".cloud-zoom-big").css('background-image', `url(${bimg})`)
}, function () {
    $(this).removeClass('current')
}
);


$('.product-gallery-back').click(function () {
    let left = $('#pro-gallerys').position().left
    if (left < 0) {
        $('#pro-gallerys').css('left', `${left + 74}px`)
    }


});


$('.product-gallery-forward').click(function () {
    let left = $('#pro-gallerys').position().left
    if (left > -74) {
        $('#pro-gallerys').css('left', `${left - 74}px`)
    }
});

$('#pro-quantity-plus').click(function () {
    let buynum = $('#pro-quantity').val()
    $('#pro-quantity-minus').removeClass('disabled');
    $('#pro-quantity').val(+buynum + 1)
})

$('#pro-quantity-minus').click(function () {
    let buynum = $('#pro-quantity').val()
    if (+buynum < 2) {
        $('#pro-quantity-minus').addClass('disabled')
    } else if (+buynum > 1) {
        $('#pro-quantity').val(+buynum - 1)
    }
})





small.on('mouseenter', function () {
    movebox.css('display', '')
    big.css('display', '')
    movebox.css({
        width: small.width() * big.width() / 900 + 'px',
        height: small.height() * big.height() / 900 + 'px'
    });
    small.on('mousemove', function (ev) {
        let top = ev.pageY - small.offset().top - movebox.height() / 2
        let left = ev.pageX - small.offset().left - movebox.width() / 2;
        let ratio = 2;

        if (top <= 0) {
            top = 0;
        } else if (top >= small.height() - movebox.height()) {
            top = small.height() - movebox.height();
        }

        if (left <= 0) {
            left = 0;
        } else if (left >= small.width() - movebox.width()) {
            left = small.width() - movebox.width();
        }


        movebox.css({
            top: top + 'px',
            left: left + 'px'
        });
        big.css('background-position', `${ratio * -left + 'px'} ${ratio * -top + 'px'}`)
    })
})

small.on('mouseleave', function () {
    movebox.css('display', 'none')
    big.css('display', 'none')
});


