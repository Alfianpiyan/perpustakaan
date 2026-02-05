import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/(tabs)');
    }, 3000);
  }, []);

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#15518a', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <View style={{ 
        width: 120, 
        height: 120, 
        backgroundColor: 'rgba(255, 255, 255, 0.2)', 
        borderRadius: 60, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: 24
      }}>
        <Ionicons name="library" size={64} color="#ffffff" />
      </View>

      <Text style={{ 
        fontSize: 36, 
        fontWeight: 'bold', 
        color: '#ffffff', 
        marginBottom: 8 
      }}>
        DigiPus
      </Text>
      
      <Text style={{ 
        fontSize: 16, 
        color: '#93c5fd', 
        marginBottom: 60 
      }}>
        Perpustakaan Digital Modern
      </Text>

      

      <View style={{ 
        position: 'absolute', 
        bottom: 40 
      }}>
        <Text style={{ 
          fontSize: 12, 
          color: '#93c5fd', 
          textAlign: 'center' 
        }}>
          Version 1.0.0
        </Text>
        <Text style={{ 
          fontSize: 12, 
          color: 'rgba(255, 255, 255, 0.6)', 
          marginTop: 4 
        }}>
          © 2024 DigiPus.
        </Text>
      </View>
    </View>
  );
}