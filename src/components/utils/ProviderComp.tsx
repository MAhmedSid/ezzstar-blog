"use client"

import { store } from "@/store/store";
import React, { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { GoogleAnalytics } from "nextjs-google-analytics";


const ProviderComp = ({children}:{children:ReactNode}) => {

  const [queryClient] = useState(() => new QueryClient())  
  return( 
    <QueryClientProvider client={queryClient}> <Provider store={store}>
            <GoogleAnalytics trackPageViews={{ ignoreHashChange: true }} />

      {children}
      
      </Provider></QueryClientProvider>
  )
};

export default ProviderComp;