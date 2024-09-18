import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, Link } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, Text } from 'react-native';

import ProductListItem from '~/components/ProductListItem';
import Colors from '~/constants/Colors';
import { useProductList } from '~/src/api/products';

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href="/(admin)/menu/create" asChild>
              <Pressable>
                <FontAwesome
                  name="plus-square-o"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            </Link>
          ),
        }}
      />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}
