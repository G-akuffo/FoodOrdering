import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, Alert } from 'react-native';

import Button from '~/components/Button';
import { defaultPizzaImage } from '~/components/ProductListItem';
import Colors from '~/constants/Colors';
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from '~/src/api/products';

const CreateProductScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0]);
  const isUpdating = !!idString;

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: updatingProduct } = useProduct(id);
  const { mutate: deleteProduct } = useDeleteProduct();

  const router = useRouter();

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [updatingProduct]);

  const resetFields = () => {
    setName('');
    setPrice('');
  };

  const validateInput = () => {
    setErrors('');
    if (!name) {
      setErrors('Name is required');
      return false;
    }
    if (!price) {
      setErrors('Price is required');
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors('Price must be a number');
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }

    console.warn('Creating Product: ', name);

    insertProduct(
      { name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const onUpdate = () => {
    if (!validateInput()) {
      return;
    }
    updateProduct(
      {
        id,
        name,
        price: parseFloat(price),
        image,
      },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onDelete = () => {
    deleteProduct(id, {
      onSuccess: () => {
        resetFields();
        router.replace('/(admin)');
      },
    });
  };

  const confirmDelete = () => {
    Alert.alert('Confirm', 'Are you sure you want to delete this product?', [
      { text: 'Cancel' },
      { text: 'Delete', style: 'destructive', onPress: onDelete },
    ]);
  };

  return (
    <View className="flex-1 justify-center p-5">
      <Stack.Screen options={{ title: isUpdating ? 'Update Product' : 'Create Product' }} />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        className="aspect-square w-1/2 self-center"
      />
      <Text
        onPress={pickImage}
        style={{ color: Colors.light.tint }}
        className="Colors.light.tint my-5 self-center font-bold">
        Select Image
      </Text>
      <Text className="text-lg text-gray-500">Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        className="mb-10 mt-2 rounded-md bg-white p-4"
        placeholder="name"
      />

      <Text className="text-lg text-gray-500">Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        className="mb-10 mt-2 rounded-md bg-white p-4"
        placeholder="9.99"
        keyboardType="numeric"
      />

      <Text className="text-red-600">{errors}</Text>
      <Button onPress={onSubmit} text={isUpdating ? 'Update' : 'Create'} />
      {isUpdating && (
        <Text onPress={confirmDelete} className="self-center text-red-600">
          Delete
        </Text>
      )}
    </View>
  );
};

export default CreateProductScreen;
