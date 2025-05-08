import { defineStore } from 'pinia'
import config from '@/config'

import { useCookie } from '@/composables/useCookie'

const THEME_KEY = '_fchost_theme'

const cookie = useCookie()
const actTheme = cookie.get(THEME_KEY)

export const useCustomizerStore = defineStore({
	id: 'customizer',
	state: () => ({
		Sidebar_drawer: config.Sidebar_drawer,
		Customizer_drawer: config.Customizer_drawer,
		mini_sidebar: config.mini_sidebar,
		setHorizontalLayout: config.setHorizontalLayout, // Horizontal layout
		actTheme: actTheme || config.actTheme,
		boxed: config.boxed,
		setBorderCard: config.setBorderCard,
	}),

	getters: {},
	actions: {
		SET_SIDEBAR_DRAWER() {
			this.Sidebar_drawer = !this.Sidebar_drawer
		},
		SET_MINI_SIDEBAR(payload: any) {
			this.mini_sidebar = payload
		},
		SET_CUSTOMIZER_DRAWER(payload: any) {
			this.Customizer_drawer = payload
		},

		SET_LAYOUT(payload: any) {
			this.setHorizontalLayout = payload
		},
		SET_THEME(payload: any) {
			this.actTheme = payload
			cookie.set(THEME_KEY, payload)
		},
		SET_CARD_BORDER(payload: any) {
			this.setBorderCard = payload
		},
	},
})
