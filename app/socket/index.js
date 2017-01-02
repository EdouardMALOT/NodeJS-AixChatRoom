'user strict';
const crypto = require('crypto');
const helper = require('../helper');

module.exports = (io, app) => {

   let allRooms = app.locals.chatRooms;

   //Socket connection
   //-----------------
   io.of('/roomsList').on('connection', socket => {
       console.log('Socket.io connected');

       //Send Room list
        socket.on('getChatRooms', () => {
            console.log('getChatRooms called');
            socket.emit('chatRoomsList', JSON.stringify(allRooms));
        });

       //Create new room
        socket.on('CreateNewRoom', (name) => {
        
        //Check if the room already exist
         if(!helper.isExistingRoom(allRooms, name)){
             console.log('Create new room :' + name);  
             
             //Add the new room
             allRooms.push({
                room: name,
                roomID: crypto.randomBytes(24).toString('hex'),
                users: []
             });        

             //Update list (to everyone))
                 socket.emit('chatRoomsList', JSON.stringify(allRooms));
                 socket.broadcast.emit('chatRoomsList', JSON.stringify(allRooms));

          }else{
              console.log('The room already exist');
         }

        });
   });

   io.of('/chatter').on('connection', socket => {
        //Join chat room
        socket.on('join', (datas) =>{
            let userList = helper.AddUserToRoom(allRooms, datas, socket);
        
        //Brodcast the new list of users
            socket.broadcast.to(datas.roomID).emit('updateUserList', JSON.stringify(userList.users));
        //Send back the list to the new user 
            socket.emit('updateUserList', JSON.stringify(userList.users));
        });


        socket.on('disconnect', () => {
            //Find the room where the user left
            let room = helper.removeUserFromRoom(allRooms, socket);

            //Brodcast the new list of user
            socket.broadcast.to(room.roomID).emit('updateUserList', JSON.stringify(room.users));
        });

        //Broadcast the new message to all users
        socket.on('newMessage', data => {
            console.log("newMessage received and Broadcast : ", data.message);
            socket.broadcast.to(data.roomID).emit('inMessage', JSON.stringify(data));
        });
   });
   
} 