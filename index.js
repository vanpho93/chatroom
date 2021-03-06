const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));

server.listen(3000, () => console.log('Server started!'));

const arrUsername = [];
const arrSocketInfo = []; //1

io.on('connection', socket => {
    socket.on('DANG_KY_USERNAME', username => {
        const isExist = arrUsername.indexOf(username) !== -1;
        if (isExist) return socket.emit('XAC_NHAN_DANG_KY', false);
        socket.username = username;// eslint-disable-line
        arrUsername.push(username);
        arrSocketInfo.push({ username, id: socket.id }); //2
        socket.emit('XAC_NHAN_DANG_KY', true);
        socket.emit('DANH_SACH_USER_ONLINE', arrUsername);
        socket.broadcast.emit('NGUOI_DUNG_MOI', username);
    });

    socket.on('disconnect', () => {
        if (!socket.username) return;
        io.emit('AI_DO_NGAT_KET_NOI', socket.username);
        const index = arrUsername.indexOf(socket.username);
        arrUsername.splice(index, 1);
    });

    // socket.on('CLIENT_GUI_TIN', message => {
    //     io.emit('TIN_NHAN_MOI', `${socket.username}: ${message}`);
    // });

    socket.on('TIN_NHAN_RIENG', messageObject => {
        const { username, message } = messageObject;
        //TODO HERE
        const index = arrSocketInfo.findIndex(e => e.username === username);
        const { id } = arrSocketInfo[index];
        socket.to(id).emit('TIN_NHAN_MOI', `${socket.username}: ${message}`);
    });

    socket.on('CLIENT_JOIN_ROOM', room => socket.join(room));

    socket.on('TIN_NHAN_ROOM', messageObject => {
        const { room, message } = messageObject;
        socket.to(room).emit('TIN_NHAN_MOI', `${socket.username}: ${message}`);
    });
});
