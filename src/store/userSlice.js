import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name: 'user',
    initialState: { name: 'kim', age: 24 },
    reducers: {
        changeName(state) {
            state.name='john ' + state.name;
        },
        increase(state, action) {
            state.age += action.payload;
        }
    }
})

export let { changeName, increase } = user.actions

export default user