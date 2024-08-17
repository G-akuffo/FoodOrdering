import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, Text, View, StyleSheet, Pressable } from 'react-native';

import products from '~/assets/data/products';
import Button from '~/components/Button';
import { defaultPizzaImage } from '~/components/ProductListItem';

const sizes = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const [selectedSize, setSelectedSize] = useState('M');

  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    console.warn('Added to cart: ', selectedSize);
  };

  if (!product) {
    return <Text>Product Not Found</Text>;
  }

  return (
    <View className="flex-1 bg-white p-2">
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        className="aspect-square w-full"
      />
      <Text>Select Size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            key={size}
            style={[
              styles.size,
              {
                backgroundColor: size === selectedSize ? 'gainsboro' : 'white',
              },
            ]}>
            <Text style={[styles.sizeText, { color: size === selectedSize ? 'black' : 'gray' }]}>
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text className="mt-auto text-xl font-bold">${product.price}</Text>
      <Button onPress={addToCart} text="Add to Cart" />
    </View>
  );
};

const styles = StyleSheet.create({
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
});

export default ProductDetailsScreen;
