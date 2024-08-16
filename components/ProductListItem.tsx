import { Link } from 'expo-router';
import React from 'react';
import { Pressable, Text, Image } from 'react-native';

import { Product } from '~/src/types';

export const defaultPizzaImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <Link href={`/menu/${product.id}`} asChild>
      <Pressable className="max-w-[50%] flex-1 rounded-xl bg-white p-5">
        <Image
          className="aspect-square w-full"
          source={{ uri: product.image || defaultPizzaImage }}
          resizeMode="contain"
        />
        <Text className="text-xl font-bold">{product.name}</Text>
        <Text className="text-blue-700">${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;
