const io = require("socket.io-client");
const os = require("os");
const { resolve } = require("path");
const { rejects } = require("assert");

class Client{

    constructor(address){

      this.address=address;
      
      
      this.socket  = io(this.address);
      console.log("Connection to : "+this.address)

      

    };



    async init(callback){ 

      this.socket.on('connect', () => {
        console.log("Connected")
        // Envoyer un message au serveur une fois la connexion établie
        this.socket.emit('identification', os.hostname+"");
      });

        // Écouter les messages du serveur
      this.socket.on('message', (message) => {
        console.log('NETWORK | Server :', message);
        
      });

      // Écouter les messages du serveur
      this.socket.on('command', (message) => {
        console.log('COMMAND | Server :', message);
        callback(message);
      });


    }

    //ping function
    async ping(){
      try {
        const result = await new Promise((resolve, reject) => {
          // Send ping
          this.socket.emit('ping', 'ping');
    
          // listen answer
          this.socket.on('pong', (message) => {
            if (message === 'pong') {
              resolve([true, 'Success']);
            } else {
              reject([false, 'Unexpected response']);
            }
          });
    
          // Timeout 
          setTimeout(() => {
            reject([false, 'Timeout']);
          }, 5000); 
        });
    
        return result;
      } catch (error) {
        return error;
      } finally {
        this.disconnect();
      }
    }



    disconnect(){

      this.socket.disconnect();
      console.log("Disconnected");
    }


}

module.exports = Client