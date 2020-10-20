export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
};

// action down here is how we manipulate what the datalayer looks like and state is what does the data layer look like
const reducer = (state, action) => {
    // console.log(action);

    // Action -> type, [payload] (in our case the payload is the user, we can write anything in place of payload)

    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists
            }
        case 'SET_DISCOVER_WEEKLY':
            return {
                ...state,
                discover_weekly: action.discover_weekly
            }
        case 'SET_TOP_ARTISTS':
            return {
                ...state,   
                top_artists: action.top_artists
            }
        case 'SET_SPOTIFY':
            return {
                ...state,
                spotify: action.spotify
            }
        case "SET_PLAYING":
            debugger;
            return {
                ...state,
                playing: action.playing,
            }
        case "SET_ITEM":
            return {
                ...state,
                item: action.item,
            }
        
        default:
            return state;
    }
}

export default reducer;
