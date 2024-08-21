import '../global.css';

import { Stack } from 'expo-router';

import CartProvider from '~/src/providers/CartProvider';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="cart" options={{ presentation: 'modal' }} />
      </Stack>
    </CartProvider>
  );
}
