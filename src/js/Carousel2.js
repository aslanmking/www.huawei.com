import { $ } from './library/jquery.js';

function carousel() {
    const speed = 500; // 动画执行时间
    const delay = 5000; // 图片停留时间

    let main = null, // 主函数(入口函数)
        init = null, // 初始化
        start = null, // 开始动画
        stop = null, // 停止动画
        timer = null, // 计时器
        elms = {}; // 命名空间 提供可共享作用域的变量

    init = function () {
        elms.index = 0
        elms.sliderElm = $('#m-banner .ec-slider-item')

        $("#m-banner").hover(function () {
            stop();
        }, function () {
            timer = setInterval(start.bind(null, 1), 3000);
        })

        $("#m-banner .ec-slider-nav").children('span').on('mouseenter', function () {
            $(this).siblings().removeClass('scolor')
            $(this).addClass('scolor');
            elms.index = $(this).index();
            start();
        })
    }

    start = function (direction) {

        elms.sliderElm.eq(elms.index).siblings().css("display", 'none')
        elms.sliderElm.eq(elms.index).css("display", '')
            elms.sliderElm.eq(elms.index).animate({
                opacity: 0
            }, 500, function () {
                elms.sliderElm.eq(elms.index).css("display", "none")
                $("#m-banner .ec-slider-nav>span").removeClass('scolor')
        
                $("#m-banner .ec-slider-nav>span").eq(elms.index).addClass('scolor');
            })


            setTimeout(function () {
                let num = null

                if (elms.index == 2) {
                    elms.index = -1
                    num = 0
                } else {
                    num = elms.index + 1
                }


                elms.sliderElm.eq(num).css("display", "")
                elms.sliderElm.eq(num).css("opacity", "0")
                elms.sliderElm.eq(num).animate({
                    opacity: 1
                }, 500, function () {
                    elms.sliderElm.css("opacity", "1")
                    elms.index++

                })
            }, 300)
    }

    stop = function () {
        clearTimeout(timer);
        elms.sliderElm.stop(true, true)
    }

    main = function () {
        init();
        timer = setInterval(start.bind(null, 1), 3000);
    }
    main()
}
export default carousel;

