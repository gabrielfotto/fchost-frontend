import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import vuetify from './plugins/vuetify'
import '@/scss/style.scss'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import { fakeBackend } from '@/utils/helpers/fake-backend'

import VueTablerIcons from 'vue-tabler-icons'

//Mock Api data
import './_mockApis'
// import VueDragscroll from "vue-dragscroll";

import Maska from 'maska'

import 'vue3-easy-data-table/dist/style.css'
//i18
import { createI18n } from 'vue-i18n'
import messages from '@/utils/locales/messages'

//ScrollTop
import VueScrollTo from 'vue-scrollto'

//LightBox

const i18n = createI18n({
	locale: 'en',
	messages: messages,
	silentTranslationWarn: true,
	silentFallbackWarn: true,
})

const app = createApp(App)
fakeBackend()
app.use(router)

app.use(PerfectScrollbar)
// app.use(VueDragscroll);
app.use(createPinia())

app.use(VueTablerIcons)

app.use(i18n)
app.use(Maska)
app.use(vuetify).mount('#app')

//ScrollTop Use
// app.use(VueScrollTo);
app.use(VueScrollTo, {
	duration: 1000,
	easing: 'ease',
})
