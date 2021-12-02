import useUser from "../../lib/useUser";

const User = ({ user }) => {
  const { data } = useUser({
    redirectTo: "/login",
  });

  return (
    <div>
      <h1>User</h1>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  );
};

export default User;
