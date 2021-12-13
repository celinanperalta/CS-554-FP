import queries from "../queries";
import { useQuery } from "@apollo/client";
import User from "./User";

const SongSubmission = (props) =>{

    const {loading, error, data} = useQuery(queries.GET_SONG_SUB, {variables: {id:props.songSubId}, pollInterval: 5000})

    if (loading) {
        return <div className="app">
          <h2>Loading Song Submission</h2>
        </div>
    }
    console.log(data.getSongSubmissionById);
        return(
            <div>
                <iframe src={`https://open.spotify.com/embed/track/${data.getSongSubmissionById.song.id}?utm_source=generator`} width="100%" height="80" frameBorder="0"  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                <ul>
                    <li>{data.getSongSubmissionById.song.name} by {data.getSongSubmissionById.song.artist}</li>
                    <li>{data.getSongSubmissionById.votes.length} votes</li>
                    <User userId={data.getSongSubmissionById.submitted_by}/>
                </ul>
            </div>
        )
}

export default SongSubmission;