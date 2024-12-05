// app/providers.tsx
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import React from 'react'
import { useEffect } from 'react'

export function PHProvider({
  children,
}: {
  children: React.ReactNode
}) {
    useEffect(() => {
        console.log(process.env.NEXT_PUBLIC_POSTHOG_KEY)
      const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY as string;
      console.log(posthogKey)
      const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST as string;
      posthog.init(posthogKey, {
        api_host: posthogHost,
        person_profiles: 'identified_only',
        capture_pageview: true,
        capture_pageleave: true // Disable automatic pageview capture, as we capture manually
      })
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}