import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';

import Button from '~/components/Button';
import { defaultPizzaImage } from '~/components/ProductListItem';
import Colors from '~/constants/Colors';

const CreateProductScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState('');
  const [image, setImage] = useState<string | null>(null);

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

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }

    console.warn('Creating Product: ', name);

    resetFields();
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

  return (
    <View className="flex-1 justify-center p-5">
      <Stack.Screen options={{ title: 'Create Product' }} />
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
      <Button onPress={onCreate} text="Create" />
    </View>
  );
};

export default CreateProductScreen;
