import { createContext, useState ,useEffect} from "react";
import { auth,firestore } from "./firebase";

export const AuthContext = createContext();

let AuthProvider = ({ children }) => {
    let [currentUser, setCurrentUser] = useState(null);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsub = auth.onAuthStateChanged(async (user) => {
            if (user) {
                let { displayName, email, uid,PhotoUrl} = user;
                let docRef = firestore.collection("users").doc(uid);

                let document = await docRef.get();
                if (!document.exists) {
                    docRef.set({
                        displayName,
                        email,
                        PhotoUrl,
                    });
                }

                setCurrentUser({ displayName, email, uid,PhotoUrl });
            } else {
                setCurrentUser(user);
            }

            setLoading(false);
        });

        return ()=>{
            unsub();
        }

    }, []);

    return (
        <AuthContext.Provider value={currentUser}>
            {!loading && children}
        </AuthContext.Provider>
    );

}

export default AuthProvider;