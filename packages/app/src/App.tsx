import React from 'react';
import { Providers } from '~/systems/Core';

import { IS_DEVELOPMENT, IS_TEST } from './config';
import { getRoutes } from './routes';
import { store } from './store';

const ThrowError = React.lazy(
  () => import('./systems/Error/components/ThrowError')
);

// Test comment for release testing

export function App() {
  return (
    <Providers>
      {getRoutes()}
      {(IS_TEST || IS_DEVELOPMENT) && <ThrowError />}
    </Providers>
  );
}
