
import Alert from './Alert'
import Confirm from './Confirm'

export default {
    install: Vue => {
        Vue.component('Alert', Alert),
        Vue.component('Confirm', Confirm)
    }
}
