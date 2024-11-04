import React, { Component, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import products from '@/assets/products.json';
import ProductListItem from '@/components/molecules/ProductListItem/ProductListItem';
import { Button, ButtonText } from '@/components/ui/button';
import { useBreakpointValue } from '@/components/ui/utils/use-break-point-value';
import { listProducts } from '@/api/products';
import { useQuery } from '@tanstack/react-query';

const HomeScreen = () => {
  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    lg: 4,
  });

  //state

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: listProducts,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fetching products </Text>;
  }
  return (
    <View className='flex-1'>
      <StatusBar style='auto' />

      <FlatList
        data={products}
        numColumns={numColumns}
        contentContainerClassName='gap-2'
        columnWrapperClassName='gap-2'
        renderItem={({ item }) => <ProductListItem item={item} />}
      />
    </View>
  );
};

export default HomeScreen;
