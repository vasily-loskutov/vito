import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

import { wrapper } from "@redux"
import { Provider } from 'react-redux';


export function App({ Component,  ...rest }) {

  const {store, props} = wrapper.useWrappedStore(rest);

  return <Provider store={store}> <Component {...props.pageProps} /></Provider>
}
export default App;
