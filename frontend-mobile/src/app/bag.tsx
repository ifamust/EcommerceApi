import { View, FlatList } from 'react-native';
import React from 'react';
import { useCart } from '@/store/cartStore';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import CartListItem from '@/components/molecules/CartListItem/CartListItem';
import { Button, ButtonText } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { ShoppingBag, ShoppingBasket, ShoppingCart } from 'lucide-react-native';
import { Stack, useRouter } from 'expo-router';

const cart = () => {
  const items = useCart((state) => state.items);
  const resetCart = useCart((state) => state.resetCart);

  const route = useRouter();

  const handleCheckout = () => {
    //set to server
    resetCart();
  };

  const renderCheckoutButton = () => {
    return (
      <Button onPress={handleCheckout}>
        <ButtonText>Checkout</ButtonText>
      </Button>
    );
  };

  const renderListEmpty = () => {
    return (
      <View className='h-[80vh] items-center justify-center  gap-8'>
        {/* //screen options  */}
        <Stack.Screen options={{ title: 'My Bag' }} />

        <Icon as={ShoppingBag} size='xl' />
        <VStack className='items-center gap-1'>
          <Text bold>Your bag is empty.</Text>
          <Text size='sm'>When you add products, they'll appear here.</Text>
        </VStack>
        <Button onPress={() => route.back()}>
          <ButtonText>Shop Now</ButtonText>
        </Button>
      </View>
    );
  };

  return (
    <View className='flex-1'>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem item={item} />}
        contentContainerClassName='gap-2 max-w-[960px] w-full mx-auto p-2'
        ListFooterComponent={items.length !== 0 ? renderCheckoutButton : null}
        ListEmptyComponent={renderListEmpty}
      />
    </View>
  );
};

export default cart;
