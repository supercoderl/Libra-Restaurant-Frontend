import { authenticate, currentUser } from "@/api/business/userApi"
import { clear, keys, set } from "@/utils/localStorage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";

export const login = createAsyncThunk('auth/login', async (data: { email: string, password: string }, { dispatch }) => {

    // Set Is Authenticating `true`
    dispatch(setIsAuthenticating(true))

    try {
        const res = await authenticate(data);

        // If Error or Token Doesn't Exist
        if (!res?.data) {
            throw new Error('Token Not Found')
        }

        const token = res.data.accessToken;
        set(keys.KEY_TOKEN, token);

        const refreshToken = res.data.refreshToken;
        set(keys.KEY_REFRESH_TOKEN, refreshToken);

        // Validate User By Token
        dispatch(validateUser(token))

    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            // Đây là lỗi từ Axios, bạn có thể truy cập vào `err.response.data.message`
            dispatch(setMessage({ type: "error", message: err?.response?.data?.message }));
        } else if (err instanceof Error) {
            // Đây là một lỗi JavaScript thông thường
            dispatch(setMessage({ type: "error", message: err.message }));
        } else {
            // Lỗi khác không xác định
            dispatch(setMessage({ type: "error", message: "An unknown error occurred" }));
        }

        // Dispatch các action khác
        dispatch(setIsAuthenticated(false));
        dispatch(setToken(null));
        dispatch(setUser({}));
        dispatch(setIsAuthenticating(false));
    }
})

// Validate User By Token
export const validateUser = createAsyncThunk('auth/validateUser', async (token: any, { dispatch }) => {

    // Set Is Authenticating `true`
    dispatch(setIsAuthenticating(true))

    try {

        // If Token Doesn't Exist
        if (!token) {
            throw new Error('User Not Found')
        }

        const res = await currentUser();

        // If Error or User Doesn't Exist
        if (!res?.data) {
            throw new Error('User Not Found')
        }

        const user = res.data

        // Save `user` to localStorage
        set(keys.KEY_CURRENT_USER, JSON.stringify(user));

        // Dispatch `authReducer` Values to Redux Store
        dispatch(setIsAuthenticated(true))
        dispatch(setToken(token))
        dispatch(setUser(user))

        // Set Is Authenticating `false`
        dispatch(setIsAuthenticating(false))

    } catch (err) {
        console.error(err)

        // Dispatch `authReducer` Values to Redux Store
        dispatch(setIsAuthenticated(false))
        dispatch(setToken(null))
        dispatch(setUser({}))

        // Set Is Authenticating `false`
        dispatch(setIsAuthenticating(false))
    }
})

// Logout Action
export const logout = createAsyncThunk('auth/logout', async (e, { dispatch }) => {

    // Set Is Authenticating `true`
    dispatch(setIsAuthenticating(true))

    // Clear localStorage
    clear();

    // Dispatch `authReducer` Values to Redux Store
    dispatch(setIsAuthenticated(false))
    dispatch(setToken(null))
    dispatch(setUser({}))

    // Set Is Authenticating `false`
    dispatch(setIsAuthenticating(false))
})

interface Message {
    type: string,
    message: string
}

interface authState {
    isAuthenticated: boolean,
    isAuthenticating: boolean,
    token: null | string
    user: object,
    message: Message
}

const initialState: authState = {
    isAuthenticated: false,
    isAuthenticating: true,
    token: null,
    user: {},
    message: {
        type: "",
        message: ""
    },
}

const authSlice = createSlice({
    name: 'main-auth',
    initialState,
    reducers: {
        setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload
        },
        setIsAuthenticating: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticating = action.payload
        },
        setToken: (state, action: PayloadAction<null | string>) => {
            state.token = action.payload
        },
        setUser: (state, action: PayloadAction<object>) => {
            state.user = action.payload
        },
        setMessage: (state, action: PayloadAction<Message>) => {
            state.message = action.payload;
        }
    }
})

export const { setIsAuthenticated, setIsAuthenticating, setToken, setUser, setMessage } = authSlice.actions
export default authSlice.reducer