const io = require('socket.io-client');
const $ = require('jquery');

//init UI
$('#div-chat').hide();

const socket = io();

$('#btnSignUp').click(() => {
    const username = $('#txtUsername').val();
    socket.emit('DANG_KY_USERNAME', username);
});
