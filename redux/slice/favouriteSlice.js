import { createSlice, createAsyncThunk, unwrapResult } from "@reduxjs/toolkit"
import { deleteFavoritesByUserEmail, fetchFavoritesFromDB, saveFavouritesToDb } from "../../services/FirebaseService";


const initialState = {
    items: []
}

export const saveFavourites = createAsyncThunk(
    'favourite/saveFavourites',
    async ({ user, item }, { rejectWithValue }) => {
        try {
            return await saveFavouritesToDb(user, item);
        } catch (error) {
            console.error('Error saving favourite:', error);
            return rejectWithValue(error.message)
        }
    });

export const fetchFavorites = createAsyncThunk(
    'favourite/fetchFavorites',
    async (user, { rejectWithValue }) => {
        try {
            return await fetchFavoritesFromDB(user);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteFavorite = createAsyncThunk(
    'favourite/deleteFavoriteByUserEmailAndItemId',
    async ({ user, item }, { rejectWithValue }) => {
        try {
            return await deleteFavoritesByUserEmail(user, item);
        } catch (error) {
            console.error('Error deleting favorite:', error);
            return rejectWithValue(error.message);
        }
    }
);


export const favouriteSlice = createSlice({
    name: 'favourite',
    initialState: initialState,
    reducers: {
        removeAllFavourite: (state, action) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(saveFavourites.fulfilled, (state, action) => {
            console.log('Favourite saved to store successfully!');
            state.items.push(action.payload);
        });

        builder.addCase(fetchFavorites.fulfilled, (state, action) => {
            console.log('Favourite saved to store successfully!');
            state.items = action.payload;
        });

        builder.addCase(deleteFavorite.fulfilled, (state, action) => {
            console.log('Favourite deleted from store successfully!');
            console.log(action.payload);
            state.items = state.items.filter(item => item.id != action.payload);

        })
    }

});

export const { removeAllFavourite } = favouriteSlice.actions;

export const selectIsFavourite = (state, item) => state.favourite.items.some(fav => fav.id === item.id)
export const selectFavouriteItems = (state) => state.favourite.items;

export default favouriteSlice.reducer