import { View, Text } from 'react-native';
import React from 'react';

interface IProductListItem {
  item: any;
}
const ProductListItem = ({ item }: IProductListItem) => {
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
};

export default ProductListItem;
