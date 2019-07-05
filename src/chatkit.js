import { ChatManager, TokenProvider} from '@pusher/chatkit-client';
import store from './store/index.js'
import moment from 'moment';

const INSTANCE_LOCATOR = process.env.VUE_APP_CHATKIT_INSTANCE
const CHATKIT_SECRET_KEY = process.env.VUE_APP_CHATKIT_SECRET_KEY
const TEST_TOKEN_URL = process.env.VUE_APP_TEST_TOKEN_URL
const MESSAGE_LIMIT = Number(process.env.VUE_APP_MESSAGE_LIMIT) || 10

let currentUser = null
let activeRoom = null

const tokenProvider = new TokenProvider({
    url: TEST_TOKEN_URL
})

const connectUser = async (userId) => {
    const chatManager = new ChatManager({
        instanceLocator: INSTANCE_LOCATOR,
        tokenProvider,
        userId,
    })

    currentUser = await chatManager.connect()
    return currentUser
}

const setMembers = () => {
    let members = activeRoom.users.map(user => {
        return {
            username: user.id,
            name: user.name,
            presence: user.presence.state
        }
    });

    store.commit('setUsers', members)
}

const subscribeToRoom = async (roomId) => {
    store.commit('clearChatRoom')
    activeRoom = await currentUser.subscribeToRoom({
        roomId,
        message_limit: MESSAGE_LIMIT,
        hooks: {
            onMessage: message => {
                store.commit('addMessage', {
                    name: message.sender.name,
                    username: message.senderId,
                    text: message.text,
                    date: moment(message.createdAt).format('h:mm:ss a DD-MM-YYYY')
                })
            },
            onPresenceChanged: () => {
                setMembers()
            },
            onUserStartedTyping: user => {
                store.commit('setTyping', user.id)
            },
            onUserStoppedTyping: () => {
                store.commit('setTyping', null)
            }
        }
    });
    console.log(activeRoom)
    setMembers()
    return activeRoom
}

export default {
    connectUser,
    subscribeToRoom
}