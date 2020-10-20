import React from 'react';
import { useEffect } from 'react';
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js'; // spotify-web-api-js is basically a wrapper to interact with Spotify API
import Player from './Player';
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotifyWebApi(); // This is the super object responsible for every interaction between our react app and Apotify itself
// it is basically an instance of SpotifyWebApi

function App() {
  // Run code based on a given condition
  const [{ token }, dispatch] = useDataLayerValue(); // syntax to push and pull from data layer
  // the user is being pulled from the data layer, it's thie same as datalayer.user = { user } or const [datalayer, dispatch] = useDataLayerValue();


  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = '';
    const _token = hash.access_token;

    if (_token) {
      spotify.setAccessToken(_token);
      dispatch({
        type: 'SET_TOKEN',
        token: _token
      })
      
      spotify.getMe().then(user => {  // this function here is a promise which is getting back the user from spotify
        dispatch({    // here the user is being dispatched onto the data layer, it is dispatching an action
          type: 'SET_USER',
          user: user
        })
      });

      spotify.getUserPlaylists().then(playlists => { 
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists
        })
      })

      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify
      })

      spotify.getPlaylist("15QgYvZwITibHpBn4ap3fd").then(response => {
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: response
        })
      })

    }

  }, [token, dispatch]);

  return (
    <div className="app">
      {!token && <Login />}
      { 
        token && <Player spotify={spotify} />  // token ? <h1>I am logged in</h1> :  
      }
    </div>
  );
}

export default App;
