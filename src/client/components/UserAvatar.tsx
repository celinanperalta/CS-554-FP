import React from "react";
import { useQuery } from "@apollo/client";
import { Avatar, Typography, CardHeader, makeStyles } from "@material-ui/core";
import queries from "../queries";
import Image from "next/image";

const useStyles = makeStyles({
  cardHeader: {
    paddingBottom: 0,
    marginBottom: 0,
  },
});

const UserAvatar = (props) => {
  const classes = useStyles();
  const { data, loading, error } = useQuery(queries.GET_USER, {
    variables: {
      id: props.userId,
    },
  });

  if (data && data.getUserById)
    return (
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Avatar>
            <Image
              src={
                data.getUserById.profile_picture || "/public/userDefault.jpeg"
              }
              alt="profile"
              width={50}
              height={50}
            />
          </Avatar>
        }
        title={<Typography>{data.getUserById.username}</Typography>}
      />
    );
  return null;
};

export default UserAvatar;
