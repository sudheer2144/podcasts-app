import { Route, BrowserRouter, Routes, useNavigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import SignUpPage from "./Pages/LoginSignUpPage/SignUpLoginPage";
import Profile from "./Pages/Profile/Profile";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./Slices/userSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import PrivateRoutes from "./PrivateRoutes";
import { ToastContainer } from "react-toastify";
import CreatePodcast from "./Pages/CreatePodcast/CreatePodcast";
import Podcasts from "./Pages/Podcasts/Podcasts";
import PodcastDetails from "./Pages/PodcastDetails/PodcastDetails";
import CreateEpisode from "./Pages/CreateEpisode/CreateEpisode";
import Loader from "./Components/Loader/Loader";
import { flushSync } from "react-dom";

export const App = () => {
  const dispatch = useDispatch();

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      onSnapshot(
        doc(db, "users", user.uid),
        (userDoc) => {
          if (userDoc.exists()) {
            const userData = userDoc.data();
            dispatch(setUser(userData));
          }
        },
        (error) => {
          console.error("Error fetching user data:", error.message);
        }
      );
    }
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer
          theme="dark"
          autoClose={2000}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          className={"toast"}
          closeOnClick={true}
        />
        <Header user={user} />
        <Routes>
          {user ? (
            <Route path="/" element={<Podcasts />} />
          ) : (
            <Route path="/" element={<SignUpPage />} />
          )}
          <Route path="" element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-podcast" element={<CreatePodcast />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/podcast/:id" element={<PodcastDetails />} />
            <Route
              path="/podcast/:id/create-episode"
              element={<CreateEpisode />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};
