import React from 'react';
import { View } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';

interface ICartListItem {
  item: any;
}

const CartListItem = ({ item }: ICartListItem) => {
  return (
    <HStack className='bg-white p-3'>
      <VStack space='sm'>
        <Text bold>{item?.product?.name}</Text>
        <Text>{item?.product?.price}</Text>
      </VStack>

      <Text className='ml-auto'>{item.quantity}</Text>
    </HStack>
  );
};

export default CartListItem;
