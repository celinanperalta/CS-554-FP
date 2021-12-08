import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import useUser from "../../lib/useUser";
import queries from "../../queries";

const User = () => {
  const userData = useUser({
    redirectTo: "/login",
  });

  const router = useRouter();
  const { userId } = router.query;

  const { data, loading, error } = useQuery(queries.GET_USER, {
    variables: {
      id: userId,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.getUserById;
  return (
    <div>
      <h1>User</h1>
      <p>{user.username}</p>
      <p>{user.email}</p>
      <p>{user.likes}</p>
    </div>
  );
};

export default User;
