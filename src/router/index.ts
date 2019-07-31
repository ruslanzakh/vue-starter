import Vue from 'vue';
import Router from 'vue-router';
import Home from '@views/Home/Home.vue';

Vue.use(Router);
/**
 * WPA doesn't work correctly on local with history mode
 * But without history mode router will generate hash in url
 * Maybe WPA and history mode will be work correctly with https protocol
 */
export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			components:{
				content: Home,
			},
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			components:{
				content: () => import(/* webpackChunkName: "about" */ '@views/About/About.vue'),
			},
		},
	],
});
