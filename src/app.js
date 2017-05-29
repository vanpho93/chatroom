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
});

socket.on('DANH_SACH_USER_ONLINE', arrUsername => {
    arrUsername.forEach(e => {
        $('#onlineUser').append(`<li>${e}</li>`);
    });
});
