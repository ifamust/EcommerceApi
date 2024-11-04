import '@/global.css';
import { Link, Stack } from 'expo-router';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Pressable, StyleSheet, View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Icon } from '@/components/ui/icon';
import { ShoppingCart } from 'lucide-react-native';
import { useCart } from '@/store/cartStore';
import { Text } from '@/components/ui/text';

const queryClient = new QueryClient();

export default function RootLayout() {
  const cartItemsNumber = useCart((state) => state.items.length);
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode='light'>
        <Stack
          screenOptions={{
            headerRight: () => (
              <Link href={'/bag'} asChild>
                <Pressable className='flex-row items-center gap-1'>
                  <Icon as={ShoppingCart} />
                  <Text>{cartItemsNumber}</Text>
                </Pressable>
              </Link>
            ),
          }}
        >
          <Stack.Screen
            name='index'
            options={{
              title: 'Shop',
            }}
          />
          <Stack.Screen
            name='product/[id]'
            options={{
              title: 'Product',
            }}
          />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
