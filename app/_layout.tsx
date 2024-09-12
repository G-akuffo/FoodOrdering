import '../global.css';

import { Stack } from 'expo-router';

import AuthProvider from '~/src/providers/AuthProvider';
import CartProvider from '~/src/providers/CartProvider';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(user)',
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <Stack>
          <Stack.Screen name="(admin)" options={{ headerShown: false }} />
          <Stack.Screen name="(user)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="cart" options={{ presentation: 'modal' }} />
        </Stack>
      </CartProvider>
    </AuthProvider>
  );
}
