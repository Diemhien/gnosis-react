import {
    PROFILE_CREATE_REQUEST,
    PROFILE_CREATE_SUCCESS,
    PROFILE_CREATE_FAILURE,
    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_FAILURE,
    PROFILE_DELETE_REQUEST,
    PROFILE_DELETE_SUCCESS,
    PROFILE_DELETE_FAILURE
} from '../types/profileActionTypes';

const initialState = {
    profile: null,
    loading: false,
    error: null,
    isCheckingDuplicate: false,
    isDuplicate: false,

};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_CREATE_REQUEST:
        case PROFILE_UPDATE_REQUEST:
        case PROFILE_DELETE_REQUEST:
            return { ...state, loading: true, error: null };
        case PROFILE_CREATE_SUCCESS:
        case PROFILE_UPDATE_SUCCESS:
            return { ...state, loading: false, profile: action.payload, error: null };
        case PROFILE_DELETE_SUCCESS:
            return { ...state, loading: false, profile: null, error: null };
        case PROFILE_CREATE_FAILURE:
        case PROFILE_UPDATE_FAILURE:
        case PROFILE_DELETE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case 'CHECK_DUPLICATE_PROFILE_REQUEST':
            return {
                ...state,
                isCheckingDuplicate: true
            };
        case 'CHECK_DUPLICATE_PROFILE_SUCCESS':
            return {
                ...state,
                isCheckingDuplicate: false,
                isDuplicate: action.payload,
                error: ''
            };
        case 'CHECK_DUPLICATE_PROFILE_FAILURE':
            return {
                ...state,
                isCheckingDuplicate: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default profileReducer;