import { FontAwesome } from '@expo/vector-icons';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

import products from '~/assets/data/products';
import { defaultPizzaImage } from '~/components/ProductListItem';
import Colors from '~/constants/Colors';

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View className="flex-1 bg-white p-5">
      <Stack.Screen
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        className="aspect-square w-full"
        resizeMode="contain"
      />

      <Text className=" text-xl font-bold">{product.name}</Text>
      <Text className=" text-xl font-bold">${product.price}</Text>
    </View>
  );
};

export default ProductDetailsScreen;
