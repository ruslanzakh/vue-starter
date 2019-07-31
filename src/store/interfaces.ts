import { Commit, Dispatch } from 'vuex';

export interface IActionArg {
	commit: Commit;
	dispatch: Dispatch;
}