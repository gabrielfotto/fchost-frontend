import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vMaska } from 'maska/vue'

import App from './App.vue'
import { router } from './router'

import { registerGlobalComponents } from './plugins/components'
import vuetify from './plugins/vuetify'
import '@/scss/style.scss'

import PerfectScrollbar from 'vue3-perfect-scrollbar'
import { fakeBackend } from '@/utils/helpers/fake-backend'

//Mock Api data
import './_mockApis'
// import VueDragscroll from "vue-dragscroll";

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
app.directive('maska', vMaska)

app.use(router)

app.use(PerfectScrollbar)
// app.use(VueDragscroll);
app.use(createPinia())

app.use(i18n)
app.use(vuetify).mount('#app')

registerGlobalComponents(app)

//ScrollTop Use
// app.use(VueScrollTo);
app.use(VueScrollTo, {
	duration: 1000,
	easing: 'ease',
})
