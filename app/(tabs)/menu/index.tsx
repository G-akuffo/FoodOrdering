import { Stack } from 'expo-router';
import { FlatList } from 'react-native';

import products from '~/assets/data/products';
import ProductListItem from '~/components/ProductListItem';

export default function MenuScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Menu' }} />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </>
  );
}
