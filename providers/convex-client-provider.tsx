'use client';

import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { AuthLoading, Authenticated, ConvexReactClient } from 'convex/react';
import React from 'react';
import { Loading } from '@/app/_components/auth/loading';

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL as string;
const clerkPublishableKey = process.env
  .NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string;
const convex = new ConvexReactClient(convexUrl);
export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <ConvexProviderWithClerk
        useAuth={useAuth}
        client={convex}
      >
        <Authenticated>{children}</Authenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
