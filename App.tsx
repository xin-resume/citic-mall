import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigatorScreen from '@/navigation';
import { useCart, useMember } from '@/store';
import { navigationRef } from '@/utils/navigation';
import { LINKING } from '@/constants';

function App(): JSX.Element {
  const init = useMember(state => state.init);
  const initCart = useCart(state => state.fetch);

  useEffect(() => {
    init();
    initCart();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={LINKING} ref={navigationRef}>
        <RootSiblingParent>
          <NavigatorScreen />
        </RootSiblingParent>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
