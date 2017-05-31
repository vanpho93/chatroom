const io = require('socket.io-client');
const $ = require('jquery');
const handleListOnlineUser = require('./xuLyDanhSach');

let username = '';
let room = '';
//init UI
$('#div-chat').hide();

const socket = io('http://localhost:3000');

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
    $('.red').removeClass('red');
    $(this).addClass('red');
});

$('#listRoom').on('click', 'li', function () {
    room = $(this).text();
    socket.emit('CLIENT_JOIN_ROOM', room);
});

$('#btnSendRoom').click(() => {
    const message = $('#txtMessage').val();
    socket.emit('TIN_NHAN_ROOM', { room, message });
});
