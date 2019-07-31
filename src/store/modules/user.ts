import Vue from 'vue';
import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from '../actions/user';
import { AUTH_LOGOUT } from '../actions/auth';
import apiCall from '@utils/mock-api';
import { IActionArg } from '../interfaces';

export type IProfile = {
	name: string;
}

interface IState {
	status: string;
	profile: null | IProfile;
}

const state = {
	status: '',
	profile: null,
}

const getters = {
	getProfile: (state: IState) => state.profile,
	isProfileLoaded: (state: IState) => state.profile,
}

const mutations = {
	[USER_REQUEST]: (state: IState) => {
		state.status = 'loading';
	},
	[USER_SUCCESS]: (state: IState, resp: IProfile) => {
		state.status = 'success';
		Vue.set(state, 'profile', resp);
	},
	[USER_ERROR]: (state: IState) => {
		state.status = 'error';
	},
	[AUTH_LOGOUT]: (state: IState) => {
		state.profile = null;
	},
}

const actions = {
	[USER_REQUEST]: ({commit, dispatch}: IActionArg) => {
		commit(USER_REQUEST);
		apiCall({url: 'user/me'})
			.then((resp: IProfile) => {
				commit(USER_SUCCESS, resp);
			})
			.catch((resp: Error) => {
				commit(USER_ERROR);
				// if resp is unauthorized, logout, to
				dispatch(AUTH_LOGOUT);
			})
	},
}
export default {
	state,
	getters,
	mutations,
	actions
}
