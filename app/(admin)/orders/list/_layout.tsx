import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Tabs, withLayoutContext } from 'expo-router';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function OrderlistNavigator() {
  return (
    <TopTabs>
      <TopTabs.Screen name="index" options={{ title: 'Active' }} />
    </TopTabs>
  );
}
