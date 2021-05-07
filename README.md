# vuetify-notice

Component to display quick message and dialog to a user from vuetify app.

Based on [vuetify-confirm](https://github.com/yariksav/vuetify-confirm)

## Installation

```bash
npm i @nextgis/vuetify-notice
```

```js
import { NoticeSetup, NoticeSetupOptions } from '@nextgis/vuetify-notice';
import Vue from 'vue';

import vuetify from './plugins/vuetify';

const noticeOptions = {
  vuetify,
};

Vue.use(NoticeSetup, noticeOptions);

const app = new Vue({
  vuetify,
  el: '#app',
});
```

```js
import { confirmDialog, notice } from '@nextgis/vuetify-notice';

confirmDialog('Question').then((answer) => {
  if (answer) {
    this.doSomething();
  }
});

notice(`message`, {
  color: 'error',
});
```
