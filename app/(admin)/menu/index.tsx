import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, Link } from 'expo-router';
import { FlatList, Pressable } from 'react-native';

import products from '~/assets/data/products';
import ProductListItem from '~/components/ProductListItem';
import Colors from '~/constants/Colors';

export default function MenuScreen() {
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
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}
