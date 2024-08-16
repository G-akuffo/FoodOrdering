import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen options={{ title: 'Details: ' + id }} />
      <Text>Product details screen for id: {id}</Text>
    </View>
  );
};

export default ProductDetailsScreen;
