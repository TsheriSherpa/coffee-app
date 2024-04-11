import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { saveOrder } from "../../services/FirebaseService";

const initialState = {
    error: null,
    items: []
}

export const saveOrderDetails = createAsyncThunk(
    'cart/saveOrderDetails',
    async ({user, orderDetails} , {rejectWithValue}) => {
        console.log('test')
        console.log(user)
        try {
            await saveOrder(user, orderDetails)
                .then(() => console.log('order added to db'))
                .catch((err) => {
                    throw err
                })
                
            console.log('Order saved successfully!');
        } catch (error) {
            console.error('Error saving order:', error);
            return rejectWithValue(error.message)
        }
    });

  
export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addItem: (state, action) => {
            if (!state.items.some(fav => fav.id === action.payload.id)) {
                state.items.push(action.payload)
                state.items = state.items.map((item) => {
                    if (item.id == action.payload.id) {
                        item.in_cart = 1;
                    }
                    return item
                })
            }else{
                state.items = state.items.map((item) => {
                    if (item.id == action.payload.id) {
                        item.in_cart = item.in_cart + 1;
                    }
                    return item;
                })
            }
        },
        decreaseItemCount: (state, action) => {
            if (action.payload.in_cart > 1) {
                state.items = state.items.map((item) => {
                    if (item.id == action.payload.id) {
                        item.in_cart = item.in_cart - 1;
                    }
                    return item;
                })
            }
        },
        increaseItemCount: (state, action) => {
            state.items = state.items.map((item) => {
                if (item.id == action.payload.id) {
                    item.in_cart = item.in_cart + 1;
                }
                return item;
            })
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        emptyCart: (state, action) => {
            state.items = [];
        }
    },

    extraReducers: (builder) => {
        builder.addCase(saveOrderDetails.fulfilled, (state, action) => {

        })

        builder.addCase(saveOrderDetails.pending, (state, action) => {
        })

        builder.addCase(saveOrderDetails.rejected, (state, action) => {
            state.error = action.payload;
        })
    }
});

export const { addItem, removeItem, emptyCart, increaseItemCount, decreaseItemCount } = cartSlice.actions;

export const selectCartCount = (state) => state.cart.items.length;

export const selectCartItems = (state) => state.cart.items;

export const selectCartItemCount = (state, itemToFind) => state.cart.items.find((item) => item.id == itemToFind.id).in_cart

export const selectCartTotalPrice = (state) => state.cart.items.reduce((total, item) => {
    return total + item.price * (item.in_cart == 0 ? 1 : item.in_cart);
  }, 0);

export default cartSlice.reducer