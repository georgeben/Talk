import { ChatManager, TokenProvider} from '@pusher/chatkit-client'

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

    let currentUser = await chatManager.connect()
    return currentUser
}


export default {
    connectUser
}