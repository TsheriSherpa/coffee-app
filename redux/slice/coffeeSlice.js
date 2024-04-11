import { createSlice} from "@reduxjs/toolkit"
import { categories, coffeeItems } from "../../constants";

const initialState = {
    categories: categories,
    items: coffeeItems,
    displayItems: coffeeItems
}


export const coffeeSlice = createSlice({
    name: 'coffee',
    initialState: initialState,
    reducers: {
        changeDisplayItems: (state, action) => {
            if (action.payload == 0) {
                state.displayItems = state.items
            }else{
                const catId = action.payload
                state.displayItems = state.items.filter((item) => item.cat_id == catId)
            }
        },
        setInCartCountToInitial: (state, action) => {
            state.items = state.items.map((item) => {
                if (item.id == action.payload.id) {
                    item.in_cart = 0;
                }
                return item;
            })
        }
    }
});


export const { changeDisplayItems, setInCartCountToInitial } = coffeeSlice.actions;

export const selectCoffeeDisplayItems = (state) => state.coffee.displayItems;
export const selectCoffeeCategories = (state) => state.coffee.categories;

export const selectCoffeeByCategory = (state, catId) => state.coffee.items.filter((item) => item.cat_id == catId)


export default coffeeSlice.reducer