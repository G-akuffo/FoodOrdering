import { StatusBar } from 'expo-status-bar';
import { View, FlatList, Platform, Text } from 'react-native';

import Button from '~/components/Button';
import CartListItem from '~/components/CartListItem';
import { useCart } from '~/src/providers/CartProvider';

const CartScreen = () => {
  const { items, total } = useCart();

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />

      <Text className="mt-5 text-xl font-semibold">Total: ${total}</Text>
      <Button text="Checkout" />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default CartScreen;
