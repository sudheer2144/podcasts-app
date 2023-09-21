import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Slices/userSlice";
import podcastReducer from "./Slices/podcastSlice"
import episodesReducer from "./Slices/episodeSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        podcasts: podcastReducer,
        episodes: episodesReducer
    }
});
