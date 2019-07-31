import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth';
import { USER_REQUEST } from '../actions/user';
import apiCall from '@utils/mock-api';
import { IProfile } from './user';
import { IActionArg } from '../interfaces';

interface IState {
	token: string;
	status: string;
	hasLoadedOnce: boolean;
}

interface ISuccesResp {
	token: string;
}

const state = {
	token: localStorage.getItem('user-token') || '',
	status: '',
	hasLoadedOnce: false,
}

const getters = {
	isAuthenticated: (state: IState) => !!state.token,
	authStatus: (state: IState) => state.status,
}

const mutations = {
	[AUTH_REQUEST]: (state: IState) => {
		state.status = 'loading';
	},
	[AUTH_SUCCESS]: (state: IState, resp: ISuccesResp) => {
		state.status = 'success';
		state.token = resp.token;
		state.hasLoadedOnce = true;
	},
	[AUTH_ERROR]: (state: IState) => {
		state.status = 'error';
		state.hasLoadedOnce = true;
	},
	[AUTH_LOGOUT]: (state: IState) => {
		state.token = '';
	}
}

const actions = {
	[AUTH_REQUEST]: ({commit, dispatch}: IActionArg, user: IProfile) => {
		return new Promise((resolve, reject) => {
			commit(AUTH_REQUEST);
			apiCall({url: 'auth', data: user, method: 'POST'})
				.then((resp: ISuccesResp) => {
					localStorage.setItem('user-token', resp.token);
					// Here set the header of your ajax library to the token value.
					// example with axios
					// axios.defaults.headers.common['Authorization'] = resp.token
					commit(AUTH_SUCCESS, resp);
					dispatch(USER_REQUEST);
					resolve(resp);
				})
				.catch((err: Error) => {
					commit(AUTH_ERROR, err);
					localStorage.removeItem('user-token');
					reject(err);
				})
		})
	},
	[AUTH_LOGOUT]: ({commit, dispatch}: IActionArg) => {
		return new Promise((resolve, reject) => {
			commit(AUTH_LOGOUT);
			localStorage.removeItem('user-token');
			resolve();
		})
	}
}
export default {
	state,
	getters,
	mutations,
	actions
}
