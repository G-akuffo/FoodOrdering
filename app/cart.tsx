import { StatusBar } from 'expo-status-bar';
import { View, FlatList, Platform } from 'react-native';

import Button from '~/components/Button';
import CartListItem from '~/components/CartListItem';
import { useCart } from '~/src/providers/CartProvider';

const CartScreen = () => {
  const { items } = useCart();

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />

      <Button text="Checkout" />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default CartScreen;
