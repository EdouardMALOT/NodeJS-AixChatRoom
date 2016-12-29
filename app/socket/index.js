'user strict';

module.exports = (io, app) => {
   let allRooms = app.locals.chatRooms;

   allRooms.push({
       room: 'Morning places',
       roomID: '0001',
       user: []
   });

   allRooms.push({
       room: 'Lunch',
       roomID: '0002',
       user: []
   });


   io.of('/roomsList').on('connection', socket => {
       console.log('Socket.io connected');

       socket.on('getChatRooms', () => {
            console.log('getChatRooms called');
            socket.emit('chatRoomsList', JSON.stringify(allRooms));
       });
   });
}