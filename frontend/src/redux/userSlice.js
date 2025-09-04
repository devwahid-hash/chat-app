import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        allUsers: [],
        selectedUser: null
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setAllUsers: (state, action) => {
            state.allUsers = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        logout: (state) => {
            state.userData = null;
            state.allUsers = [];
            state.selectedUser = null;
        }
    }
});

export const { setUserData, setAllUsers, setSelectedUser, logout } = userSlice.actions;
export default userSlice.reducer;