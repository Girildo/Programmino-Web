import Vue from 'vue';
import { colors } from 'vuetify/lib';
import Vuetify from 'vuetify/lib/framework';
import it from 'vuetify/src/locale/it';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { it },
    current: 'it',
  },
  theme: {
    dark: true,
    themes: {
      light: {
        primary: colors.blue.lighten1,
        accent: colors.purple,
        background: '#dddddd'
      },
      dark: {
        primary: colors.yellow.lighten2,
        accent: colors.pink.lighten2,
      }
    }
  }
});
