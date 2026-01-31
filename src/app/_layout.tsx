import '../global.css';

import { Stack } from 'expo-router';
import { AppProvider } from '@/providers/app-provider';

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
   return (
      <AppProvider>
         <Stack initialRouteName='index' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' />
         </Stack>
      </AppProvider>
   );
}
