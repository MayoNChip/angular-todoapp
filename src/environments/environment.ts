// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyChPYUvQ9FV8sxDWxcjKvvgSCtjbMeZ7w4',
    authDomain: 'mytodoapp-ic44.firebaseapp.com',
    databaseURL:
      'https://mytodoapp-ic44-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'mytodoapp-ic44',
    storageBucket: 'mytodoapp-ic44.appspot.com',
    messagingSenderId: '659243782695',
    appId: '1:659243782695:web:15ff2f5ba15688e403f402',
  },
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
