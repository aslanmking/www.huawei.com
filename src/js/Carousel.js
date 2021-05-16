import { $ } from './library/jquery.js'

function carousel() {
    const speed = 500; // 动画执行时间
    const delay = 5000; // 图片停留时间

    let main = null, // 主函数(入口函数)
        init = null, // 初始化
        start = null, // 开始动画
        stop = null, // 停止动画
        next = null, // 下一张
        prev = null, // 上一张
        timer = null, // 计时器
        elms = {}; // 命名空间 提供可共享作用域的变量

    init = function () {
        elms.index = 0
        elms.sliderElm = $('.hot-board .ec-slider-item')
        elms.btn = $('.hot-board .button-slider-prev')
        elms.btn2 = $('.hot-board .button-slider-next')

        $(".hot-board .ec-slider-middle").hover(function () {
            stop();
        }, function () {
            timer = setInterval(start.bind(null, 1), 3000);
        })


        elms.btn.on("click", function () {
            prev();
        })
        elms.btn2.on("click", function () {
            next();
        })

        $(".hot-board .ec-slider-nav-1").children('span').on('mouseenter', function () {
            $(this).siblings().removeClass('scolor')
            $(this).addClass('scolor');
            elms.index = $(this).index();
            start();
            
        })



    }


    start = function (direction) {

        
        elms.sliderElm.eq(elms.index).siblings().css("display", 'none')
        // elms.sliderElm.eq(elms.index).siblings().removeClass("change", "a")
        
        elms.sliderElm.eq(elms.index).css("display", '')
        // elms.sliderElm.eq(elms.index).addClass("change", "a")

        elms.sliderElm.eq(elms.index).animate({
            opacity: 0
        }, 500, function () {
            elms.sliderElm.eq(elms.index).css("display", "none")
            $(".hot-board .ec-slider-nav-1>span").removeClass('scolor')

            $(".hot-board .ec-slider-nav-1>span").eq(elms.index).addClass('scolor');
        })


        setTimeout(function () {
            let num = null
            if (!direction) {
                if (elms.index == 0) {
                    elms.index = 7
                    num = 6
                } else {
                    num = elms.index - 1
                }
            } else {
                if (elms.index == 6) {
                    elms.index = -1
                    num = 0
                } else {
                    num = elms.index + 1
                }
            }



            elms.sliderElm.eq(num).css("display", "block")
            elms.sliderElm.eq(num).css("opacity", "0")
            elms.sliderElm.eq(num).animate({
                opacity: 1
            }, 500, function () {
                elms.sliderElm.css("opacity", "1")
                if (direction) {
                    elms.index++
                } else {
                    elms.index--
                }
            })
        }, 300)
    }


    stop = function () {
        clearTimeout(timer);
        elms.sliderElm.stop(true, true)
    }

    next = function () {
        stop();
        start(1);
    }

    prev = function () {
        stop();
        start(0);
    }



    main = function () {
        init();
        timer = setInterval(start.bind(null, 1), 3000);
    }
    main()
}


export default carousel;

