//Helper
    let isExistingRoom = (roomsTab, nameToFind) => {
        for(room of roomsTab){
            if(room.room === nameToFind) {       return true;    }
        }
        return false;
    };


    let getRoomFromId = (roomsTab, id) => {
        for(room of roomsTab){
            if(room.roomID === id) {       return room;    }
        }
        return undefined;  
    };


    let AddUserToRoom = (allRooms, datas, socket) => {
        let getRoom = getRoomFromId(allRooms, datas.roomID);  //Get the room obj
        if(getRoom !== undefined){
            let userID = socket.request.session.passport.user;

            //Check if user exist
            let checkUser = getRoom.users.findIndex((element, index, array) => {
                if(element.userID === userID){
                    return true;
                }else{
                    return false;
                }
            });

            //If the user already exist, we remove it
                if(checkUser > -1) {
                    getRoom.users.splice(checkUser, 1);
                }

            //Push the new user ID
                getRoom.users.push({
                    socketID: socket.id,
                    userID,
                    user: datas.user,
                    userPic: datas.userPic
                });
            
            //Join the room channel
                socket.join(datas.roomID);
            
            //Return the updated room object
                return getRoom;
        }
    };


    let removeUserFromRoom = (allRooms, socket) => {
        for(let room of allRooms) {
            
            let findUser = room.users.findIndex((element, index, array) => {
                if(element.socketID === socket.id) {
                    return true;
                }else{
                    return false;
                }
            });

            if(findUser > -1) {
                socket.leave(room.roomID);
                room.users.splice(findUser, 1);
                return room;
            }
        }
    };

module.exports = {
    isExistingRoom,
    getRoomFromId,
    AddUserToRoom,
    removeUserFromRoom
}