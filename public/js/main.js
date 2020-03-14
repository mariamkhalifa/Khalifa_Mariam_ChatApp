import ChatMessage from "./modules/ChatMessage.js";

const socket = io();

function setUserId({sID, message}) {
    // debugger;
    // testing in multiple browsers, you will have different IDs
    // console.log(packet);

    vm.socketID = sID;
}

function runDisconnectMessage(packet) {
    //debugger;
    console.log(packet);
}

function appendNewMessage(msg) {
    // take the incoming message and push it into the Vue instance
    // into the messages array
    vm.messages.push(msg);
}

// this is our main Vue instance
const vm = new Vue({
    data: {
        socketID: "",
        messages: [],
        message: "",
        name: "",
        menu: {
            open: false
        },
        nameForm: {
            hide: false
        }
    },

    methods: {
        // catches the information the user passes in
        // using two way binding
        dispatchName() {
            //console.log('store name');
            socket.on('chat_message', {
                name: this.name 
            })
            this.nameForm.hide = true;
        },

        dispatchMessage() {
            //emit a message event and send the message to the server
            //console.log('handle send message');
            socket.emit('chat_message', {
                content: this.message,
                name: this.name || "anonymous"
            })
            // resets message after it sends
            this.message = "";
        },
        
        openMenu() {
            console.log('open');
            this.menu.open = (this.menu.open) ? false : true;
        },

        closeMenu() {
            console.log('closed');
            this.menu.open = (this.menu.open) ? false : true;
        },

        closeName() {
            console.log('closed');
            this.nameForm.hide = true;
        }
    },

    components: {
        // newmessage = internal variable name, could name it anything
        // use the component when you reference it with newmessage in the markup
        // custom element
        newmessage: ChatMessage
    },

    mounted: function() {
        console.log('mounted');
    }
    
}).$mount("#app");

// event handling -> these events come from the server
// emits are in app.js ('______, function')
socket.addEventListener('connected', setUserId);
socket.addEventListener('user_disconnect', runDisconnectMessage);
socket.addEventListener('new_message', appendNewMessage);