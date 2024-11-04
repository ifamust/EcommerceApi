import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useQuery } from '@tanstack/react-query';

import { fetchProductsById } from '@/api/products';
import { useCart } from '@/store/cartStore';

const details = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const addProduct = useCart((state) => state.addProduct);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductsById(Number(id)),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text> Product not found</Text>;
  }

  const addToCart = () => {
    addProduct(product);
  };

  return (
    <Card className='flex-1 p-5 rounded-lg '>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{
          uri: product.image,
        }}
        alt={`${product.name} image`}
        resizeMode='contain'
        className='mb-6 h-[240px] w-full rounded-md'
      />
      <Text className='text-sm font-normal mb-2 text-typography-700'>
        {product.name}
      </Text>
      <VStack className='mb-6'>
        <Heading size='md' className='mb-4'>
          {product.price}
        </Heading>
        <Text size='sm'>{product.description}</Text>
      </VStack>
      <Box className='flex-col sm:flex-row'>
        <Button
          onPress={addToCart}
          className='px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1'
        >
          <ButtonText size='sm'>Add to cart</ButtonText>
        </Button>
      </Box>
    </Card>
  );
};

export default details;
