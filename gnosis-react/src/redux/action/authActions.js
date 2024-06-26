import axios from 'axios';

export const loginRequest = () => {
    return { type: 'LOGIN_REQUEST' };
}

export const loginSuccess = (user, role) => {
    // Giả định rằng profile bằng 'null' hoặc null thực sự là không hoàn thành
    const profileComplete = user._doc && user._doc.profile && user._doc.profile !== 'null' && user._doc.profile.trim() !== '';
    return {
        type: 'LOGIN_SUCCESS',
        payload: { user, role, profileComplete: !!profileComplete } // Chuyển đổi thành boolean
    };
};

export const loginWithGoogleSuccess = (user, role) => {
    // Kiểm tra trạng thái hoàn thiện profile của người dùng từ thông tin trả về
    const profileCompleteGoogle = user && user.profile && user.profile !== 'null' && user.profile.trim() !== '';
    return {
        type: 'LOGIN_GOOGLE_SUCCESS',
        payload: { user, role, profileCompleteGoogle: !!profileCompleteGoogle }  // Sử dụng !! để chuyển đổi rõ ràng sang giá trị boolean
    };
};



export const setProfileComplete = (isComplete) => {
    return { type: 'PROFILE_COMPLETE', payload: isComplete };
};
export const loginFailure = (error) => {
    return { type: 'LOGIN_FAILURE', payload: error };
}

export const registerRequest = () => {
    return { type: 'REGISTER_REQUEST' };
}

export const registerSuccess = (user) => {
    return { type: 'REGISTER_SUCCESS', payload: user };
}

export const registerFailure = (error) => {
    return { type: 'REGISTER_FAILURE', payload: error };
}


export const login = (email, password) => {
    return async dispatch => {
        dispatch(loginRequest());
        try {
            const response = await axios.post('http://localhost:3000/auth/login', { email, password });
            const profileComplete = response.data.user._doc && response.data.user._doc.profile && response.data.user._doc.profile.trim() !== '';
            dispatch(loginSuccess(response.data.user, response.data.user._doc.role, profileComplete));
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            dispatch(loginFailure(error.response.data.message || 'Something went wrong'));
            console.log('Login error:', error); // Thêm log ở đây
        }
    };
};

export const loginWithGoogleAction = (access_token) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const res = await axios.post('http://localhost:3000/auth/google-login', { access_token }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const profileCompleteGoogle = res.data.user && res.data.user.profile && res.data.user.profile.trim() !== '';


        dispatch(loginWithGoogleSuccess(res.data.user, res.data.user.role, profileCompleteGoogle));

        localStorage.setItem('token', res.data.token); // Lưu token vào localStorage
    } catch (error) {
        console.log('Google login error:', error); // Thêm log ở đây
    }
};
export const register = (email, password) => {
    return async dispatch => {
        dispatch(registerRequest());
        try {
            const response = await axios.post('http://localhost:3000/auth/register', { email, password });
            dispatch(registerSuccess(response.data));
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            dispatch(registerFailure(error.response.data.message || 'Đã xảy ra lỗi'));
        }
    };
}
export const logout = () => {
    return dispatch => {
        localStorage.removeItem('access_token'); // Xóa token từ localStorage
        dispatch({ type: 'LOGOUT' }); // Dispatch action LOGOUT
    };
};