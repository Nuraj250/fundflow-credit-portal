/**
 
 * @file _app.js
 * @description Global wrapper for the Next.js app.
 *
 * Purpose:
 * - Wraps all pages with AuthProvider to handle authentication state
 * - Mounts react-hot-toast globally for notifications
 * - Loads global styles
 *
 * Applies to: Every page in the application
 
 */

import '@/styles/globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
