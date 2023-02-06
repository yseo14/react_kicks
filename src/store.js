import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './store/userSlice.js';


let stock = createSlice({
    name: 'stock',
    initialState: [10, 11, 12]
})
let cart = createSlice({
    name: 'cartData',
    initialState: [
        { id: 0, name: "Nike Kobe 5 Bruce Lee", count: 2 },
        { id: 2, name: 'UA Curry 10', count: 1 }
    ],
    reducers: {
        increaseCart(state, action) {   //action에 아이디가 들어가면 
            state.map((a, i) => {
                if (state[i].id == action.payload) {
                    state[i].count += 1;
                }
            })
            // let 번호 = state.findIndex((a) => { return a.id === action.payload })
            // state[번호].count++
        },

        addItem(state, action) {
            let exist = false;
            state.map((a, i) => {
                if (state[i].id == action.payload.id) {
                    state[i].count++;
                    exist = true;
                }
            })
            if(!exist){
                state.push(action.payload);
            }
        }
    }
})

export let { increaseCart, addItem } = cart.actions;

export default configureStore({
    reducer: {
        user: user.reducer,
        stock: stock.reducer,
        cart: cart.reducer
    }
})

