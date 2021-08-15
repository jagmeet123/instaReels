import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { firestore } from "./firebase";
import "./Home.css";

let VideoCard = (props) => {
    let [isOpen, setisOpen] = useState(false);
    let [playing, setPlaying] = useState(false);
    let [currentComment, setCurrentUserComment] = useState("");
    let [allComments, setAllComments] = useState("");

    let value = useContext(AuthContext);

    return (
        <div className="video-card">
            <video src={props.post.data.url}
                onClick={(e) => {
                    if (playing) {
                        setPlaying(false);
                        e.currentTarget.pause();
                    } else {
                        setPlaying(true);
                        e.currentTarget.play();
                    }
                }}></video>
            <span className="material-icons-outlined like">favorite_border</span>
            <span className="material-icons-outlined comment" onClick={() => {
                if (isOpen) setisOpen(false); else setisOpen(true);
            }}>chat_bubble</span>
            <p className="username"><b>@username</b></p>
            <p className="song">
                <span class="material-icons-outlined">music_note</span>
                <marquee>song name</marquee>
            </p>

            {
                isOpen ? (<div className="comment-box">
                    <button
                        className="comment-box-close-btn"
                        onClick={() => {
                            setisOpen(false);
                        }}
                    >
                        Close
                    </button>

                    <div className="all-comments"></div>

                    <div className="comment-form">
                        <input type="text" value={currentComment} onChange={(e) => {
                            setCurrentUserComment(e.currentTarget.value);
                            console.log(e.currentTarget.value);
                        }} />

                        <button
                            onClick={() => {
                                let p = firestore.collection("comments").add({
                                    comment: currentComment,
                                    username: value.displayName,
                                });

                                setCurrentUserComment("");

                                p.then((docRef) => {
                                    return docRef.get();
                                }).then((doc) => {
                                    firestore
                                        .collection("posts")
                                        .doc(props.post.id)
                                        .update({
                                            comments: [...props.post.comment, doc.id],
                                        });
                                });
                            }}
                        >
                            Post
                        </button>
                    </div>
                </div>
                ) : (
                    ""
                )}
        </div>
    )
}

export default VideoCard;