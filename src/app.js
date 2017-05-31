const io = require('socket.io-client');
const $ = require('jquery');
const handleListOnlineUser = require('./xuLyDanhSach');

//init UI
$('#div-chat').hide();

const socket = io();

handleListOnlineUser(socket);

socket.on('TIN_NHAN_MOI', message => {
    $('#listMessage').append(`<li>${message}</li>`);
});

$('#btnSend').click(() => {
    const message = $('#txtMessage').val();
    socket.emit('CLIENT_GUI_TIN', message);
});

