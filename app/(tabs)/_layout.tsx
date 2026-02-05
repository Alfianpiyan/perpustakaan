import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

function RoundedTabIcon({
  focused,
  activeBg = '#15518a',
  inactiveBg = '#f3f4f6',
  activeShadow = '#15518a',
  iconName,
  size = 24,
  color,
}: {
  focused: boolean;
  activeBg?: string;
  inactiveBg?: string;
  activeShadow?: string;
  iconName: keyof typeof Ionicons.glyphMap;
  size?: number;
  color: string;
}) {
  return (
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 14,
        backgroundColor: focused ? activeBg : inactiveBg,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: focused ? activeShadow : 'transparent',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: focused ? 0.35 : 0,
        shadowRadius: 6,
        elevation: focused ? 8 : 0,
      }}
    >
      <Ionicons
        name={iconName}
        size={size}
        color={focused ? '#ffffff' : color}
      />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#15518a',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          height: 75,
          paddingBottom: 12,
          paddingTop: 8,
          paddingHorizontal: 15,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 10,
        },
        tabBarItemStyle: { paddingVertical: 5 },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen
        name="kategori"
        options={{
          title: 'Kategori',
          tabBarIcon: ({ color, focused }) => (
            <RoundedTabIcon
              focused={focused}
              color={color}
              iconName={focused ? 'grid' : 'grid-outline'}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Cari',
          tabBarIcon: ({ color, focused }) => (
            <RoundedTabIcon
              focused={focused}
              color={color}
              iconName={focused ? 'search' : 'search-outline'}
            />
          ),
        }}
      />
       <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 65,
                height: 65,
                borderRadius: 33,
                backgroundColor: focused ? '#0f3a5f' : '#15518a',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -30,
                borderWidth: 5,
                borderColor: '#ffffff',
                shadowColor: '#15518a',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.4,
                shadowRadius: 10,
                elevation: 12,
                transform: focused ? [{ scale: 1.05 }] : [{ scale: 1 }],
              }}
            >
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={30}
                color="#ffffff"
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="riwayat"
        options={{
          title: 'Riwayat',
          tabBarIcon: ({ color, focused }) => (
            <RoundedTabIcon
              focused={focused}
              color={color}
              iconName={focused ? 'book' : 'book-outline'}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, focused }) => (
            <RoundedTabIcon
              focused={focused}
              color={color}
              iconName={focused ? 'person' : 'person-outline'}
            />
          ),
        }}
      />

     
    </Tabs>
  );
}
