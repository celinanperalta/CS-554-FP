import useUser from "../lib/useUser";
import axios from "axios";

const SpotifyLoginButton = () => {

//   TODO: Once we have a user, we need to send them to the Spotify API to get their access token.
//          We can then use that access token to make requests to the Spotify API.
//          After successfully getting the access token and updating the user's access token in the database,
//          we need to be able to redirect back to the current page without clearing the session.   


    return (
        <div>
            <button><a href="http://localhost:4000/auth/spotify">Login with Spotify</a></button>
        </div>
    );
};

export default SpotifyLoginButton;
