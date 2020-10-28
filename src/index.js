import DatatableComponent from './VueNiceDatatable.vue';
import NiceTd from "./NiceTd"
import NiceTr from "./NiceTr"
import NiceTh from "./NiceTh"

const Datatable = {
    install(Vue, options) {
        if(!options) options = {}
        Vue.component('VueNiceDatatable', DatatableComponent);
        Vue.component('NiceTr', NiceTr);
        Vue.component('NiceTd', NiceTd);
        Vue.component('NiceTh', NiceTh);
    }
}
export default Datatable;