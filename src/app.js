const io = require('socket.io-client');
const $ = require('jquery');

//init UI
$('#div-chat').hide();

const socket = io();

$('#btnSignUp').click(() => {
    const username = $('#txtUsername').val();
    socket.emit('DANG_KY_USERNAME', username);
});

socket.on('XAC_NHAN_DANG_KY', isSuccess => {
    if (!isSuccess) return alert('Username da ton tai!');
    $('#div-chat').show();
    $('#div-sign-up').hide();

    socket.on('DANH_SACH_USER_ONLINE', arrUsername => {
        arrUsername.forEach(e => {
            $('#onlineUser').append(`<li id="${e}">${e}</li>`);
        });
    });

    socket.on('NGUOI_DUNG_MOI', username => {
        $('#onlineUser').append(`<li id="${username}">${username}</li>`);
    });
});

socket.on('AI_DO_NGAT_KET_NOI', username => {
    $(`#${username}`).remove();
});

socket.on('TIN_NHAN_MOI', message => {
    $('#listMessage').append(`<li>${message}</li>`);
});

$('#btnSend').click(() => {
    const message = $('#txtMessage').val();
    socket.emit('CLIENT_GUI_TIN', message);
});

