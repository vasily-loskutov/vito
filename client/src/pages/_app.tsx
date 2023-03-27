import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

import {wrapper} from "@redux"
import { Provider } from 'react-redux';
import { makeStore,useRefreshQuery } from '@redux';
import { useEffect } from 'react';
import { useActions } from '@/hooks';
const store = makeStore()
export function App({ Component, pageProps }: AppProps) {
  
    
 
  return <Provider store={store}> <Component {...pageProps} /></Provider>  
}
export default wrapper.withRedux(App);
