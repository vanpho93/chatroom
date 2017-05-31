const $ = require('jquery');

function handleListOnline(socket) {
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
}

module.exports = handleListOnline;

