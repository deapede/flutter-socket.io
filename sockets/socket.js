const { io } = require('../index');

// Mensajes de sockets
io.on('connection', client => {

    console.log('Cliente conectado');

    client.on('disconnect', () => { console.log('Cliente desconectado') });

    //Obtiene mensaje emitido desde el index.html
    client.on('mensaje', (payload) => {
        console.log('Mensaje recibido: ', payload);

        io.emit('Mensaje desde backend:', { admin: 'Nuevo mensaje de admin' })
    });

    client.on('emitir-mensaje', (payload) => {
        // io.emit('nuevo-mensaje', payload); //emite a todos
        client.broadcast.emit('nuevo-mensaje', payload); //emite a todos menos a lo que env

    })
});