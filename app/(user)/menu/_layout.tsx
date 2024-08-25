/* eslint-disable prettier/prettier */
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '~/constants/Colors';

export default function MenuStack() {
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href="/cart" asChild>
            <Pressable>
              <FontAwesome
                name="shopping-cart"
                size={25}
                color={Colors.light.tint}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          </Link>
        ),
      }}
    />
  );
}
