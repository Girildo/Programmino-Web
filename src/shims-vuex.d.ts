// vuex.d.ts
import { ComponentCustomProperties } from 'vue'
import { Store } from './store';
import { State as _state} from './store/state';

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    store?: Store;
  }
}

declare module "vue/types/vue" {


  // provide typings for `this.$store`
  interface Vue {
    $store: Store;
  }
}