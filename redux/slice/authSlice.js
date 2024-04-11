import { createSlice, createAsyncThunk, unwrapResult } from "@reduxjs/toolkit"
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { addUser } from "../../services/FirebaseService";
import { updateProfile } from 'firebase/auth'

const initialState = {
    isLoggedIn: false,
    email: null,
    name: null,
    token: null
}

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userData = {
                email: userCredential.user.email,
                name: userCredential.user.displayName,
                token: userCredential.user.refreshToken,
            };
            
            return userData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async ({ email, password, name }, { rejectWithValue }) => {
        try {
            const {user} = await createUserWithEmailAndPassword(auth, email, password)
              .catch((error) => {throw error});

            await addUser(user, name)
                .then(() => console.log('user added'))
                .catch((err) => {
                    console.log(err)
                    throw err
                })
            
            await updateProfile(auth.currentUser, { displayName: name }).catch(
                (err) => console.log(err)
            );
               
            const userData = {
                name: name,
                email: user.email,
                token: user.refreshToken,
            };
            return userData;
        } catch (error) {
            console.log(error.message)
            return rejectWithValue(error.message);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.token = action.payload.token;
        },
        logout: (state, action) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        })

        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.token = action.payload.token;
        })

        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.token = action.payload.token;
        })

        builder.addCase(signupUser.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        })

        builder.addCase(signupUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    },
});

export const { login, logout } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectDisplayName = (state) => state.auth.name;

export const selectLoggedInUser = (state) => state.auth;

export default authSlice.reducer