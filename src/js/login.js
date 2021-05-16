import { $ } from './library/jquery.js';
let ddrop = $('#hwid-selectCountryImg .vue-dropdown')
let dropDown = $('#hwid-selectCountryImg .hwid-dropMenu')


$('#loginByPhone').click(function () {
    $(".hwid-pwdlogin-root").css('display', 'none')
    $(".hwid-smslogin-root").css('display', 'block')
    $(".hwid-full-link").css('display', 'none')
    $(".hwid-third-login-list").css('display', 'none')
})
$('#loginByPwd').click(function () {
    $(".hwid-pwdlogin-root").css('display', 'block')
    $(".hwid-smslogin-root").css('display', 'none')
    $(".hwid-full-link").css('display', 'block')
    $(".hwid-third-login-list").css('display', 'block')
})

$('.hwid-password-eye').click(function () {
    console.log($(this).parent().children('input'))
    $(this).toggleClass('eyeup')
    if ($(this).parent().find('input').attr('type') == 'password') {
        $(this).parent().find('input').attr('type', 'text')
    } else {
        $(this).parent().find('input').attr('type', 'password')
    }
})

$(dropDown).click(function () {
    if (ddrop.css('display') == 'block') {
        ddrop.css('display', 'none')
    } else if (ddrop.css('display') == 'none') {
        ddrop.css('display', 'block')
    }
})

$('#login').click(function () {
    let username = $('#username').val();
    let password = $('#pwd').val();
    $.ajax({
        type: "get",
        url: "../../interface/login.php",
        data: {
            username: username,
            password: password,
        },
        dataType: "json",
        success: function (res) {
    
            if (res.has == true) {
                $('.hwid-input-msg-error').html(`<i class="ic-tips"></i>
                    <span>账户密码错误</span>`);
            } else if(res.has == false){
                $('.hwid-input-msg-error').append('<script>location.href="./index.html";</script>');
            }
        }
    })
})
