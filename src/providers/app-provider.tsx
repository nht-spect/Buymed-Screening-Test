import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaListener } from 'react-native-safe-area-context';
import { Uniwind } from 'uniwind';
import { BaseChildrenProps } from '@/types';

export const AppProvider = ({ children }: BaseChildrenProps) => {
   return (
      <GestureHandlerRootView style={{ flex: 1 }}>
         <SafeAreaListener
            onChange={({ insets }) => Uniwind.updateInsets(insets)}
         >
            {children}
         </SafeAreaListener>
      </GestureHandlerRootView>
   );
};
