import { $ } from './library/jquery.js';
import cookie from './library/cookie.js'

let username = cookie.get('username')
let tota = null
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

let shop = cookie.get('shop');

if (shop) {
    shop = JSON.parse(shop);

    let idList = shop.map(el => el.id).join();
    $.ajax({
        type: "get",
        url: "../../interface/getItems.php",
        data: { idList: idList },
        dataType: "json",
        success: function (res) {
            let temp = '';
            res.forEach(elm => {
                let picture = JSON.parse(elm.picture);
                let color = JSON.parse(elm.color)
                let price = parseFloat(elm.price).toFixed(2)
                let current = shop.filter(val => val.id == elm.id);

                temp +=
                    `<div class="sc-pro">
                        <div>
                            <div class="sc-pro-list clearfix">
                                <label class="checkbox">
                                    <input readonly="readonly" class="vam">
                                </label>
                                <div class="sc-pro-area">
                                
                                    <div class="sc-pro-main clearfix">
                                        <a class="p-img">
                                            <img src="${picture[0].src}">
                                        </a>
                                       
                                        <ul>
                                            <li><a class="p-name">
                                                    ${elm.title3}
                                                </a>
                                                <p class="p-info">${color[0].color}</p>
                                                <div class="p-label">
                                                  <span>分期免息</span>
                                                </div>
                                             
                                            </li>
                                            <li>
                                                <div class="p-price"><span>¥&nbsp;<em>${price}</em></span>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="p-stock">
                                                    <div class="p-stock-area">
                                                        <input type="number" class="p-stock-text" value="${current[0].num}" max="${elm.num}" min="1">
                                                        <p class="p-stock-btn">
                                                            <a class='pro-quantity-minus' class="disabled">−</a>
                                                            <a class='pro-quantity-plus' class="disabled">+</a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="p-price-total">¥&nbsp;<i>${(elm.price * current[0].num).toFixed(2)}</i>
                                              
                                            </li>
                                            <li><a class="p-del" data-id="${elm.id}">删除</a>
                                            </li>
                                        </ul>
                                    </div>
                                  
                                </div>
                            </div>
                         
                        </div>
                    </div>`
            });
            $('.sc-list').append(temp);
            $(".vam").click(function () {
                if ($(this).hasClass('checked')) {
                    $(this).removeClass('checked')

                    if (!($(this).hasClass('checked'))) {
                        let total = $(this).parent().parent().find('.p-price-total i').html()
                        let oltotals = $('.sc-total-price').find('em').html()
                        $('.sc-total-price').find('em').eq(0).html(`${(+oltotals - +total).toFixed(2)}`)
                    }
                } else {
                    $(this).addClass('checked')

                    if (($(this).hasClass('checked'))) {
                        let total = $(this).parent().parent()
                            .find('.p-price-total i').html()
                        let oltotals = $('.sc-total-price').find('em').html()
                        $('.sc-total-price').find('em').eq(0).html(`${(+oltotals + +total).toFixed(2)}`)
                    }

                }
                $('.total-choose em').html($('.vam').filter('.checked').length)
            })
            $('.vam').each(function () {
                tota += +$(this).parents().eq(1).find('.p-price-total i').html()
            })
            $('.p-del').click(function () {
                let res = shop.filter(el => el.id != $(this).attr('data-id'));
                cookie.set('shop', JSON.stringify(res), 1);
                location.reload();
            })
            $('#delAll').click(function () {
                let id = []
                $('.vam').filter('.checked').each(function () {
                    id.push($(this).parents().eq(1).find('.p-del').attr('data-id'))
                })
                for (let key in id) {
                    shop = shop.filter(el => el.id != id[key]);
                }


                cookie.set('shop', JSON.stringify(shop), 1);
                location.reload();
            })

            $('.pro-quantity-plus').click(function () {
                let buynum = +$(this).parent().parent().find('input').val()
                let dan = $(this).parents().eq(4).find('.p-price em').html()
                $(this).parents().eq(4).find('.p-price-total i').html(((buynum + 1) * dan).toFixed(2))
                $(this).parent().parent().find('input').val(+buynum + 1)

                let oltotals = $('.sc-total-price').find('em').html()
                if ($(this).parents().eq(7).find('.vam').hasClass('checked')) {
                    $('.sc-total-price').find('em').eq(0).html(`${(+oltotals + +dan).toFixed(2)}`)
                }


            })

            $('.pro-quantity-minus').click(function () {

                let buynum = $(this).parent().parent().find('input').val()
                let dan = $(this).parents().eq(4).find('.p-price em').html()
                $(this).parents().eq(4).find('.p-price-total i').html(((buynum - 1) * dan).toFixed(2))
                if (+$(this).parents().eq(4).find('.p-price-total i').html() <= +dan) {
                    $(this).parents().eq(4).find('.p-price-total i').html(dan)
                }
                if (+buynum > 1) {
                    $(this).parent().parent().find('input').val(+buynum - 1)
                }
                let oltotals = $('.sc-total-price').find('em').html()
                if ($(this).parents().eq(7).find('.vam').hasClass('checked') && +buynum > 1) {
                    $('.sc-total-price').find('em').eq(0).html(`${(+oltotals - +dan).toFixed(2)}`)
                }
                if ($('.sc-total-price').find('em').html() <= 0) {
                    $('.sc-total-price').find('em').html('0.00')
                }
            })

            // $("#checkedAll").click(function () {

            //     if ($(this).hasClass('checked')) {

            //         $(this).removeClass('checked')
            //         $('.vam').each(function () {
            //             if ($(this).hasClass('checked')) {
            //                 tota += +$(this).parents().eq(1).find('.p-price-total i').html()
            //             }
            //         })
            //         $('.sc-total-price').find('em').eq(0).html(`0.00`)
            //     } else if (!$(this).hasClass('checked')) {
            //         $(this).addClass('checked')
            //         $('.sc-total-price').find('em').eq(0).html(`${(tota).toFixed(2)}`)
            //         tota = null

            //     }

            // })
            // $("#checkedAll2").click(function () {
            //     if ($(this).hasClass('checked')) {

            //         $(this).removeClass('checked')
            //         $('.vam').each(function () {
            //             if ($(this).hasClass('checked')) {
            //                 tota += +$(this).parents().eq(1).find('.p-price-total i').html()
            //             }
            //         })
            //         $('.sc-total-price').find('em').eq(0).html(`0.00`)
            //     } else if (!$(this).hasClass('checked')) {
            //         $(this).addClass('checked')
            //         $('.sc-total-price').find('em').eq(0).html(`${(tota).toFixed(2)}`)
            //         console.log(tota)
            //         tota = null

            //     }
            // })

            $('#checkedAll').click(function () {
                if ($(this).hasClass('checked')) {

                    $(this).removeClass('checked')
                    $('.vam').each(function () {
                        if ($(this).hasClass('checked')) {
                            tota += +$(this).parents().eq(1).find('.p-price-total i').html()
                        }
                    })
                    $('.sc-total-price').find('em').eq(0).html(`0.00`)
                } else if (!$(this).hasClass('checked')) {
                    $(this).addClass('checked')
                    $('.sc-total-price').find('em').eq(0).html(`${(tota).toFixed(2)}`)
                    tota = null

                }

                let ck = $(this).attr('class')
                $(".vam").attr('class', ck + ' vam')
                if ($('#checkedAll2').attr('class')) {
                    $('#checkedAll2').attr('class', '')
                } else {
                    $('#checkedAll2').attr('class', 'checked')
                }
                $('.total-choose em').html($('.vam').filter('.checked').length)

            })
            $('#checkedAll2').click(function () {
                if ($(this).hasClass('checked')) {

                    $(this).removeClass('checked')
                    $('.vam').each(function () {
                        if ($(this).hasClass('checked')) {
                            tota += +$(this).parents().eq(1).find('.p-price-total i').html()
                        }
                    })
                    $('.sc-total-price').find('em').eq(0).html(`0.00`)
                } else if (!$(this).hasClass('checked')) {
                    $(this).addClass('checked')
                    $('.sc-total-price').find('em').eq(0).html(`${(tota).toFixed(2)}`)
                    tota = null
                }

                let ck2 = $(this).attr('class')

                $(".vam").attr('class', ck2 + ' vam')

                if ($('#checkedAll').attr('class')) {
                    $('#checkedAll').attr('class', '')

                } else {
                    $('#checkedAll').attr('class', 'checked')

                }

                $('.total-choose em').html($('.vam').filter('.checked').length)
            })
        }
    });
};












// $("#checkedAll").click(function () {

//     if ($(this).hasClass('checked')) {

//         $(this).removeClass('checked')
//         $('.vam').each(function () {
//             if ($(this).hasClass('checked')) {
//                 tota += +$(this).parents().eq(1).find('.p-price-total i').html()
//             }
//         })
//     } else if (!$(this).hasClass('checked')) {
//         $(this).addClass('checked')
//         // $('.sc-total-price').find('em').eq(0).html(`${(tota).toFixed(2)}`)
//         console.log(tota)
//         tota = null

//     }

// })
// $("#checkedAll2").click(function () {
//     $(this).toggleClass('checked')
// })

// $('#checkedAll').click(function () {

//     let ck = $(this).attr('class')
//     $(".vam").attr('class', ck + ' vam')
//     if ($('#checkedAll2').attr('class')) {
//         $('#checkedAll2').attr('class', '')
//     } else {
//         $('#checkedAll2').attr('class', 'checked')
//     }


// })
// $('#checkedAll2').click(function () {

//     let ck2 = $(this).attr('class')

//     $(".vam").attr('class', ck2 + ' vam')

//     if ($('#checkedAll').attr('class')) {
//         $('#checkedAll').attr('class', '')

//     } else {
//         $('#checkedAll').attr('class', 'checked')

//     }


// })


