import { $ } from './library/jquery.js';

let dropDown = $('#hwid-selectCountryImg .hwid-dropMenu')
let dropDown2 = $('#hwid-selectCountryImg2 .hwid-dropMenu')
let ddrop = $('#hwid-selectCountryImg .vue-dropdown')
let ddrop2 = $('#hwid-selectCountryImg2 .vue-dropdown')
let cont = 0

$(dropDown).click(function () {
    if (ddrop.css('display') == 'block') {
        ddrop.css('display', 'none')
    } else if (ddrop.css('display') == 'none') {
        ddrop.css('display', 'block')
    }
})

$('#hwid-selectCountryImg .vue-dropdown li').click(function () {

    let contury = $(this).children('span').html()
    dropDown.children('span').html(contury);
    ddrop.css('display', 'none')
    let num = $('#hwid-selectCountryImg .vue-dropdown li').index($(this))
    dropDown2.children('span').html($(ddrop2).children('ul').find('span').eq(num).html());
})


$(dropDown2).click(function () {
    if (ddrop2.css('display') == 'block') {
        ddrop2.css('display', 'none')
    } else if (ddrop2.css('display') == 'none') {
        ddrop2.css('display', 'block')
    }
})

$('#hwid-selectCountryImg2 .vue-dropdown li').click(function () {

    let phone = $(this).children('span').html()
    dropDown2.children('span').html(phone);
    ddrop2.css('display', 'none')

})

$('#username').on('change', function () {
    let reg = /^1\d{10}$/;
    // this.val()
    let flag = reg.test($(this).val())

    if (!flag) {
        $('#msg_phone .errorDiv').html(`<i class="ic-tips"></i>
        <span>手机号不正确</span>`)
    } else {
        $('#msg_phone .errorDiv').html(``)
    }
    if (!$('.errorDiv').children().length && $('#username').val() && $('#authCode').val() && $('#password').val() && $('#confirmPwd').val()) {
        $('#hwid-btnSubmit').removeClass('send-ajax')
    } else (
        $('#hwid-btnSubmit').addClass('send-ajax')
    )
})

function code() {
    let code = ''
    let num = null
    for (let i = 0; i <= 5; i++) {
        num = Math.floor(Math.random(1, 10) * 10)
        code += num
    }
    return code

}

let codes = null


function changeCode() {
    codes = code()
    $('#authCode').val(codes)
    $('#msg_phoneRandomCode .errorDiv').html(``)
}
$('#getValiCode').on('click', function () {
    if (!($('#getValiCode').hasClass('has'))) {
        changeCode()
        $('#getValiCode').addClass('has')
        let nums = 60
        let timer = setInterval(function () {

            nums--
            $('#getValiCode').val(`重新获取验证码(${nums})`)
            if (nums == 0) {
                nums = 60
                $('#getValiCode').removeClass('has')
                $('#getValiCode').val('获取验证码')
                clearInterval(timer)
            }

        }, 1000)
    }
})


$('#authCode').change(function () {
    if ($('#authCode').val() == codes) {
        $('#msg_phoneRandomCode .errorDiv').html(``)
    } else {
        $('#msg_phoneRandomCode .errorDiv').html(`<i class="ic-tips"></i>
        <span>验证码错误</span>`)
    }
    if (!$('.errorDiv').children().length && $('#username').val() && $('#authCode').val() && $('#password').val() && $('#confirmPwd').val()) {
        $('#hwid-btnSubmit').removeClass('send-ajax')
    } else (
        $('#hwid-btnSubmit').addClass('send-ajax')
    )

})

let pwd = null
$('#password').on('change', function () {
    let reg = /.{8,}/;
    // this.val()
    pwd = $(this).val()
    let flag = reg.test($(this).val())
    if (flag) {
        $('#msg_password .errorDiv').html(`
        `)
    } else {
        $('#msg_password .errorDiv').html(`<i class="ic-tips"></i>
        <span>至少包含8个字符</span>`)
    }
    if (!($('.errorDiv span').val()) && $('#username').val() && $('#authCode').val() && $('#password').val() && $('#confirmPwd').val()) {
        $('#hwid-btnSubmit').removeClass('send-ajax')
    } else (
        $('#hwid-btnSubmit').addClass('send-ajax')
    )
})

$('#confirmPwd').on('change', function () {
    if ($(this).val() != pwd) {
        $('#msg_checkPassword .errorDiv').html(`<i class="ic-tips"></i>
        <span>密码与确认密码不一致</span>`)
    } else {
        $('#msg_checkPassword .errorDiv').html(``)
    }
    if (!$('.errorDiv').children().length && $('#username').val() && $('#authCode').val() && $('#password').val() && $('#confirmPwd').val()) {
        $('#hwid-btnSubmit').removeClass('send-ajax')
    } else (
        $('#hwid-btnSubmit').addClass('send-ajax')
    )
})

$('.hwid-password-eye').click(function () {
    $(this).toggleClass('eyeup')
    if ($(this).parent().children('input').attr('type') == 'password') {
        $(this).parent().children('input').attr('type', 'text')
    } else {
        $(this).parent().children('input').attr('type', 'password')
    }
})




$('#hwid-btnSubmit').click(function () {
    if (!$(this).hasClass('send-ajax')) {
        let username = $('#username').val()
        let password = $('#confirmPwd').val()

        $.ajax({
            type: "get",
            url: "../../interface/reg.php",
            data: {
                username: username,
                password: password,
            },
            dataType: "json",
            success: function (res) {
                
                if (res.has == true ) {
                    $('#msg_phone .errorDiv').html(`<i class="ic-tips"></i>
                    <span>用户名已存在</span>`);
                } else{
                    $('#login').css('display','')
                }
            }
        });
    }
})


$('#close').click(function(){
    $('#login').css('display','none')
})






