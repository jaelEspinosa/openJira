import mongoose from 'mongoose'

/**
 * 1 = Connected
 * 2 = Connecting
 * 3 = Disconnecting
*/


const mongoConnection = {
    isConnected: 0
    
}

export const connect = async()=>{

    if (mongoConnection.isConnected){
        console.log('ya estabamos conectados a la db', process.env.MONGO_URL);
        return
    }
    if (mongoose.connections.length > 0){
        mongoConnection.isConnected = mongoose.connections[0].readyState
        if(mongoConnection.isConnected === 1){
            console.log('Usando conexión anterior')
            return
        }
        await mongoose.disconnect()
    }

    await mongoose.connect(process.env.MONGO_URL || '')
    mongoConnection.isConnected = 1
    console.log('Conectado a MongoDB: ',process.env.MONGO_URL)

  
}

export const disconnect = async ()=>{

if (process.env.NODE_ENV === 'development' ) return;    

if (mongoConnection.isConnected === 0 ) return;
    await mongoose.disconnect();

    mongoConnection.isConnected = 0

    console.log('Desconectado de MongoDB')
}