/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}


// declare module 'vue-router' {
//   interface RouteMeta {
//     requiresAuth?: boolean;
//   }
// }

// Common type defs
declare type Maybe<T> = T | undefined;
declare type $TODO = any;