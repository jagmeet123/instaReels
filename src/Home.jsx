import { Redirect } from "react-router-dom";
import { userContext } from "./App";
import { auth, firestore } from "./firebase";
import { useContext, useEffect, useState } from "react";
import "./Home.css"
import VideoCard from "./VideoCard";
import { storage } from "./firebase";
import { AuthContext } from "./AuthProvider";

let Home = () => {

    let [posts, setPosts] = useState([]);
    let value = useContext(AuthContext);

    useEffect(() => {
        console.log(value);
        let unsubscription = firestore.collection("posts").onSnapshot((querySnapshot) => {
            let temp = [];
            querySnapshot.forEach((document) => {
                temp.push({
                    data: document.data(),
                    id: document.id
                });
            }
            );
            setPosts(temp);
        });

        // Runs when we remove the component home
        return () => {
            unsubscription();
        }

    }, []);


    return (
        <div>
            {value ? (
                <>

                    <div className="posts-container">
                        {posts.map((post, index) => {
                            return <VideoCard key={post.id} post={post} />
                        })}

                    </div>
                    <button className="btn-logout"
                        onClick={() => {
                            auth.signOut();
                        }}
                    >
                        Logout
                    </button>

                    <input type="file" className="btn-upload"

                        onClick={(e) => e.currentTarget.value = null}

                        onChange={(e) => {
                            // firebase storage to upload files.

                            // console.log(e.currentTarget.files);
                            // console.log(e.currentTarget.files[0]);

                            if (!e.currentTarget.files[0]) return;

                            let { name, size, type } = e.currentTarget.files[0];
                            let file = e.currentTarget.files[0];
                            console.log(file);
                            type = type.split("/")[0];
                            size = size / 1000000;

                            if (type != "video") {
                            } else if (size > 10) {
                                alert("Please upload a video")
                                alert("size is too big")
                            } else {

                                console.log(size, type);

                                let f1 = (snapshot) => {
                                    console.log(snapshot.bytesTransferred);
                                    console.log(snapshot.totalBytes);
                                }

                                let f2 = (error) => {
                                    console.log(error);
                                }

                                let f3 = () => {
                                    let p = uploadTask.snapshot.ref.getDownloadURL();
                                    p.then((url) => {

                                        firestore.collection("posts").add({
                                            name: value.displayName,
                                            url,
                                            like: 0,
                                            comments: 0
                                        });

                                    });
                                    console.log(p);
                                }

                                console.log(`/posts/${value.uid}/${Date.now() + name}`);

                                let uploadTask = storage.ref(`posts/${value.uid}/${Date.now() + name}`).put(file);
                                uploadTask.on("state_changed", f1, f2, f3);
                            }

                        }} />
                </>
            ) : (
                <Redirect to="/" />
            )}
        </div>
    );
};

export default Home;