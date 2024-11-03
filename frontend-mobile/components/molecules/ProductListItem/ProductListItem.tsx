import React from 'react';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';

import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

interface IProductListItem {
  item: any;
}
const ProductListItem = ({ item }: IProductListItem) => {
  return (
    <Link asChild href={`/product/${item.id}`}>
      <Pressable className='flex-1'>
        <Card className='p-5 rounded-lg max-w-[360px]'>
          <Image
            source={{
              uri: item.image,
            }}
            alt={`${item.name} image`}
            resizeMode='contain'
            className='mb-6 h-[240px] w-full rounded-md'
          />
          <Text className='text-sm font-normal mb-2 text-typography-700'>
            {item.name}
          </Text>

          <Heading size='md' className='mb-4'>
            {item.price}
          </Heading>

          <Box className='flex-col sm:flex-row'>
            <Button className='px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1'>
              <ButtonText size='sm'>Add to cart</ButtonText>
            </Button>
          </Box>
        </Card>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;
