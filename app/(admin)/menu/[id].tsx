import { FontAwesome } from '@expo/vector-icons';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';

import { defaultPizzaImage } from '~/components/ProductListItem';
import Colors from '~/constants/Colors';
import { useProduct } from '~/src/api/products';

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
  const { data: product, error, isLoading } = useProduct(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
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
