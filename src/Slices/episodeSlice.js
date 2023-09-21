import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    episodes: []
}

const episodeSlice = createSlice({
    name: "episodes",
    initialState,
    reducers: {
        setEpisodes: (state, action) => {
            state.episodes = action.payload;
        },
    }
});

export const { setEpisodes } = episodeSlice.actions;
export default episodeSlice.reducer;