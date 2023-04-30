import { createApp } from 'vue'
//import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import VueScrollTo  from "vue-scrollto";

const app = createApp(App)
app.use(createPinia())
app.use(VueScrollTo, {
    container: ".left_container",
    duration: 500,
    easing: "linear",
    offset: 0,
    force: true,
    cancelable: false,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
})


app.mount('#app')
