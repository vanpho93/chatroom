const io = require('socket.io-client');
const $ = require('jquery');
const handleListOnlineUser = require('./xuLyDanhSach');

let username = '';
//init UI
$('#div-chat').hide();

const socket = io();

handleListOnlineUser(socket);

socket.on('TIN_NHAN_MOI', message => {
    $('#listMessage').append(`<li>${message}</li>`);
});

$('#btnSend').click(() => {
    const message = $('#txtMessage').val();
    socket.emit('TIN_NHAN_RIENG', { username, message });
});

$('#onlineUser').on('click', 'li', function () {
    username = $(this).text();
});
