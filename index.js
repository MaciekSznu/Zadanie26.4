const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const UsersService = require('./UserService');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const usersService = new UsersService();

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
  //miejsce dla funkcji, które zostaną wykonane po podłączeniu klienta
  socket.on('join', (name) => {
    // użytkownika, który pojawił się w aplikacji, zapisujemy do serwisu trzymającego listę osób w czacie
    usersService.addUser({
      id: socket.id,
      name
    });
    // aplikacja emituje zdarzenie update, które aktualizuje informację na temat listy użytkowników każdemu nasłuchującemu na wydarzenie 'update'
    io.emit('update', {
      users: usersService.getAllUsers()
    });
  });
});

io.on('connection', (socket) => {
  //obsługa rozłączenia użytkownika z serwerem
  socket.on('disconnect', () => {
    usersService.removeUser(socket.id);
    socket.broadcast.emit('update', {
      users: usersService.getAllUsers()
    });
  });
});

io.on('connection', (socket) => {
  //obsługa wysłania wiadomości
  socket.on('message', (message) => {
    const {name} = usersService.getUserById(socket.id);
    socket.broadcast.emit('message', {
      text: message.text,
      from: name
    });
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});