import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Text, View } from 'react-native';
import products from '@/assets/products.json';
import ProductListItem from '@/components/molecules/ProductListItem/ProductListItem';
import { Button, ButtonText } from '@/components/ui/button';
import { useBreakpointValue } from '@/components/ui/utils/use-break-point-value';

const HomeScreen = () => {
  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    lg: 4,
  });

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
