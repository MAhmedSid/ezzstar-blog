import { createClient } from '@supabase/supabase-js'

export const supabase = createClient("https://ydnjcrmmrqnylligfbpk.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlkbmpjcm1tcnFueWxsaWdmYnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMzMTU4NjQsImV4cCI6MjAwODg5MTg2NH0.KxVhlE-UaIF2wJvzhk6KHnbeqQ-R6Tu2AGWK7ldfOmc", {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
})