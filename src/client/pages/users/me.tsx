import { useQuery } from "@apollo/client";
import SpotifyLoginButton from "../../components/SpotifyLoginButton";
import withPrivateRoute from "../../components/withPrivateRoute";
import useUser from "../../lib/useUser";
import queries from "../../queries";

const Me = () => {
  const { data } = useUser({
    redirectTo: "/login",
  });

  const user = useQuery(queries.GET_USER, {
    skip: !data,
    variables: {
      id: data && data.me && data.me.id,
    },
  });

  if (data && user.data) {
    console.log(user);
    return (
      <div>
        <h1>My Profile</h1>
        <p>{user.data.getUserById.id}</p>
        <p>{user.data.getUserById.username}</p>
        <p>{user.data.getUserById.profile_picture}</p>
        <p>{user.data.getUserById.prompts}</p>
        <SpotifyLoginButton />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Me;