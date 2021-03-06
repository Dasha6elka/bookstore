import api from "services/api";
import {
    BOOK_PROFILE_CHANGE,
    BOOK_PROFILE_CREATE,
    BOOK_PROFILE_CREATE_FAIL,
    BOOK_PROFILE_CREATE_SUCCESS,
    BOOK_PROFILE_EDIT,
    BOOK_PROFILE_FETCH,
    BOOK_PROFILE_FETCH_FAIL,
    BOOK_PROFILE_FETCH_SUCCESS,
    BOOK_PROFILE_SAVE,
    BOOK_PROFILE_SAVE_FAIL,
    BOOK_PROFILE_SAVE_SUCCESS,
} from "./constants";
import { fetchBooks } from "containers/book/list/actions";

export const fetchBook = id => async (dispatch, getState) => {
    try {
        dispatch(fetchBookStart());
        const headers = { authorization: getState().auth.token };
        const book = await api.get(`book/${id}`, { headers }).json();
        dispatch(fetchBookSuccess(book));
    } catch (error) {
        console.error(error);
        dispatch(fetchBookFail(error));
    }
};

const fetchBookStart = () => ({
    type: BOOK_PROFILE_FETCH,
    payload: {
        loading: true,
    },
});

const fetchBookSuccess = book => ({
    type: BOOK_PROFILE_FETCH_SUCCESS,
    payload: {
        loading: false,
        book,
    },
});

const fetchBookFail = error => ({
    type: BOOK_PROFILE_FETCH_FAIL,
    payload: {
        loading: false,
        error,
    },
});

export const editBook = () => ({
    type: BOOK_PROFILE_EDIT,
    payload: {
        editing: true,
    },
});

export const saveBook = (id, change) => async (dispatch, getState) => {
    try {
        dispatch(saveBookStart());
        const headers = { authorization: getState().auth.token };
        await api.put(`book/${id}`, { json: change, headers });
        dispatch(saveBookSuccess());
        dispatch(fetchBooks());
    } catch (error) {
        console.error(error);
        dispatch(saveBookFail(error));
    }
};

export const saveBookSuccess = () => ({
    type: BOOK_PROFILE_SAVE_SUCCESS,
    payload: {
        editing: false,
        loading: false,
        book: null,
    },
});

const saveBookStart = () => ({
    type: BOOK_PROFILE_SAVE,
    payload: {
        editing: false,
        loading: true,
    },
});

const saveBookFail = error => ({
    type: BOOK_PROFILE_SAVE_FAIL,
    payload: {
        editing: false,
        error,
        loading: false,
    },
});

export const changeBook = change => ({
    type: BOOK_PROFILE_CHANGE,
    payload: {
        change,
    },
});

export const createBook = book => async (dispatch, getState) => {
    try {
        dispatch(createBookStart());
        const headers = { authorization: getState().auth.token };
        await api.post("book", { json: book, headers });
        dispatch(createBookSuccess());
        dispatch(fetchBooks());
    } catch (error) {
        console.error(error);
        dispatch(createBookFail(error));
    }
};

const createBookSuccess = () => ({
    type: BOOK_PROFILE_CREATE_SUCCESS,
    payload: {
        editing: false,
        loading: false,
        book: null,
    },
});

const createBookStart = () => ({
    type: BOOK_PROFILE_CREATE,
    payload: {
        editing: false,
        loading: true,
    },
});

const createBookFail = error => ({
    type: BOOK_PROFILE_CREATE_FAIL,
    payload: {
        editing: false,
        error,
        loading: false,
    },
});
