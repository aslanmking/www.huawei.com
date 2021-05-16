import { $ } from './library/jquery.js';
let dropDown = $('#hwid-selectCountryImg .hwid-dropMenu')
let ddrop = $('#hwid-selectCountryImg .vue-dropdown')


$(dropDown).click(function () {
    if (ddrop.css('display') == 'block') {
        ddrop.css('display', 'none')
    } else if (ddrop.css('display') == 'none') {
        ddrop.css('display', 'block')
    }
})

$('#username').on('change', function () {
    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let flag = reg.test($(this).val())

    if (!flag) {
        $('#msg_email .errorDiv').html(`<i class="ic-tips"></i>
        <span>邮箱不正确</span>`)
    } else {
        $('#msg_email .errorDiv').html(``)
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
                    $('#msg_email .errorDiv').html(`<i class="ic-tips"></i>
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






