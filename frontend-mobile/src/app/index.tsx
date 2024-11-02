import { FlatList, Text, View } from 'react-native';
import React, { Component } from 'react';
import products from '../../assets/products.json';
import ProductListItem from '../components/molecules/ProductListItem/ProductListItem';

export class index extends Component {
  render() {
    return (
      <View>
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductListItem item={item} />}
        />
      </View>
    );
  }
}

export default index;
