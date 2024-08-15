import { Stack } from 'expo-router';
import { Text, View, Image } from 'react-native';

import products from '~/assets/data/products';

const product = products[0];

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <View className="bg-white p-5">
        <Image className="aspect-square w-full" source={{ uri: product.image }} />
        <Text className="text-lg">{product.name}</Text>
        <Text className="text-blue-700">{product.price}</Text>
      </View>
    </>
  );
}
