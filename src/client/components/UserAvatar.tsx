import React from "react";
import { useQuery } from "@apollo/client";
import { Avatar, Typography, CardHeader } from "@material-ui/core";
import queries from "../queries";
import Image from "next/image";

const UserAvatar = (props) => {
  const { data, loading, error } = useQuery(queries.GET_USER, {
    variables: {
      id: props.userId,
    },
  });

  if (data && data.getUserById)
    return (
      <CardHeader
        avatar={<Avatar>
          <Image
            src={
              data.getUserById.profile_picture || "/public/userDefault.jpeg"
            }
            alt="profile"
            width={50}
            height={50}
          />
        </Avatar>}
        title={
        <Typography>{data.getUserById.username}</Typography>}
        />
    );
  console.log(error);
  return null;
};

export default UserAvatar;
