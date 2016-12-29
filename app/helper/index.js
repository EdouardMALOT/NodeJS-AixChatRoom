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



module.exports = {
    isExistingRoom,
    getRoomFromId
}