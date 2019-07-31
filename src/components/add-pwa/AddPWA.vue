<template lang="pug">
	.add-pwa(v-if="showInstall")
		.add-pwa__inner(@click="install") Install!
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class addPWA extends Vue {
	showInstall = false;
	installPrompt:BeforeInstallPromptEvent | null = null; 
	created() {
		window.addEventListener("beforeinstallprompt", (e: Event) => {
			e.preventDefault();
			this.installPrompt = (e as BeforeInstallPromptEvent);
			this.showInstall = true;
		});
	}

	install() {
		this.showInstall = false;
		if(!this.installPrompt) {
			return;
		}
		this.installPrompt.prompt();
		this.installPrompt.userChoice.then((result:any) => {
			if (result.outcome === "accepted") {
				console.log("Install accepted!")
			} else {
				console.log("Install denied!")
			}
		});
	}
}

/**
 * The BeforeInstallPromptEvent is fired at the Window.onbeforeinstallprompt handler
 * before a user is prompted to "install" a web site to a home screen on mobile.
 *
 * @deprecated Only supported on Chrome and Android Webview.
 */
interface BeforeInstallPromptEvent extends Event {

  /**
   * Returns an array of DOMString items containing the platforms on which the event was dispatched.
   * This is provided for user agents that want to present a choice of versions to the user such as,
   * for example, "web" or "play" which would allow the user to chose between a web version or
   * an Android version.
   */
  readonly platforms: Array<string>;

  /**
   * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
   */
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string
  }>;

  /**
   * Allows a developer to show the install prompt at a time of their own choosing.
   * This method returns a Promise.
   */
  prompt(): Promise<void>;

}

</script>

<style lang="stylus">
	.add-pwa
		cursor pointer
		&__inner
			font-size 24px
</style>
