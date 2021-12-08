import React from "react";
import { useRouter } from "next/router";
import useUser from "../../lib/useUser";

const Prompt = () => {
  const { data } = useUser({
    redirectTo: "/login",
  });

  const router = useRouter();
  const { promptId } = router.query;
  const dummyList = [
    { id: 1, name: "Song1", artist: "Artist1" },
    { id: 2, name: "Song2", artist: "Artist1" },
    { id: 3, name: "Song3", artist: "Artist2" },
    { id: 4, name: "Song4", artist: "Artist3" },
  ];

  const dummyComments = [
    {
      id: 1,
      prompt_id: promptId,
      comment: "Wow great suggestion",
      posted_by: "user1",
      likes: 3,
    },
    {
      id: 2,
      prompt_id: promptId,
      comment: "Wow this sucks!!!",
      posted_by: "user2",
      likes: 0,
    },
    {
      id: 3,
      prompt_id: promptId,
      comment: "Ehhh",
      posted_by: "user4",
      likes: 10,
    },
  ];
  return (
    <div className="app">
      <h2>Song Suggestions on this page</h2>
      <ul className="song-suggestions">
        {dummyList.map((item, index) => (
          <li key={item.id}>
            {item.name} - {item.artist}
          </li>
        ))}
      </ul>
      <h2>Comments: </h2>
      <ul className="comments">
        {dummyComments.map((item, index) => (
          <li key={item.id}>
            <p>
              {item.comment} - {item.posted_by}
              <br />
              {item.likes} likes
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Prompt;
