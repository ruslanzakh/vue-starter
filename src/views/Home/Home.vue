<template lang="pug">
	div
		img(
			alt="Vue logo"
			src="@assets/logo.png")
		HelloWorld(
			:msg="`Welcome to Your Vue.js + TypeScript App  ${userName}`")
		div
			router-link(:to="{name:'about'}") About
		div
			button(
				v-if="!profile"
				@click="auth") Авторизоваться
			button(
				v-else
				@click="logout") Выйти
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@components/HelloWorld.vue';
import { USER_REQUEST } from '@store/actions/user';
import { AUTH_REQUEST, AUTH_LOGOUT } from '@store/actions/auth';

@Component({
	components: {
		HelloWorld,
	},
})
export default class Home extends Vue {
	get profile() {
		return this.$store.state.user.profile;
	}
	get userName() {
		return this.profile ? this.profile.name : '';
	}
	auth() {
		this.$store.dispatch(AUTH_REQUEST, {name: 'bob'});
	}
	logout() {
		this.$store.dispatch(AUTH_LOGOUT);
	}
	created() {
		if (this.$store.getters.isAuthenticated) {
			this.$store.dispatch(USER_REQUEST)
		}
	}
}
</script>
