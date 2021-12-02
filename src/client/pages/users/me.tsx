import useUser from "../../lib/useUser";

const Me = () => {
  const { data } = useUser({
    redirectTo: "/login",
  });

  return (
    <div>
      <h1>My Profile</h1>
      <p>{data?.me.username}</p>
    </div>
  );
};

export default Me;