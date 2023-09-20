"use client"

import { store } from "@/store/store";
import React, { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const ProviderComp = ({children}:{children:ReactNode}) => {

  const [queryClient] = useState(() => new QueryClient())  
  return( 
    <QueryClientProvider client={queryClient}> <Provider store={store}>{children}</Provider></QueryClientProvider>
  )
};

export default ProviderComp;