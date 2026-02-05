import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function CategoriesPage() {
  const categories = [
    { name: 'Fiksi', icon: 'book', count: 156, color: '#8b5cf6' },
    { name: 'Non-Fiksi', icon: 'newspaper', count: 89, color: '#06b6d4' },
    { name: 'Sains & Teknologi', icon: 'flask', count: 124, color: '#10b981' },
    { name: 'Sejarah', icon: 'time', count: 67, color: '#f59e0b' },
    { name: 'Biografi', icon: 'person', count: 45, color: '#ec4899' },
    { name: 'Bisnis & Ekonomi', icon: 'trending-up', count: 98, color: '#6366f1' },
    { name: 'Seni & Budaya', icon: 'color-palette', count: 73, color: '#f97316' },
    { name: 'Kesehatan', icon: 'fitness', count: 52, color: '#14b8a6' },
    { name: 'Agama & Spiritual', icon: 'sunny', count: 81, color: '#a855f7' },
    { name: 'Anak-anak', icon: 'happy', count: 112, color: '#22c55e' },
    { name: 'Komik & Manga', icon: 'images', count: 94, color: '#ef4444' },
    { name: 'Referensi', icon: 'library', count: 63, color: '#15518a' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <Appbar.Header style={{ backgroundColor: '#15518a', elevation: 4 }}>
        <Appbar.Content 
          title="Kategori Buku" 
          titleStyle={{ color: '#ffffff', fontWeight: 'bold', fontSize: 20 }} 
        />
        <Appbar.Action icon="magnify" color="#ffffff" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView>
        <View style={{ 
          backgroundColor: '#15518a', 
          paddingVertical: 24, 
          paddingHorizontal: 24 
        }}>
          <Text style={{ 
            fontSize: 28, 
            fontWeight: 'bold', 
            color: '#ffffff',
            marginBottom: 8
          }}>
            Jelajahi Kategori
          </Text>
          <Text style={{ 
            fontSize: 14, 
            color: '#93c5fd'
          }}>
            {categories.length} kategori tersedia dengan ribuan buku
          </Text>
        </View>

        <View style={{ padding: 16 }}>
          <View style={{ 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            gap: 12 
          }}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={{ 
                  width: '48%',
                  backgroundColor: '#ffffff',
                  borderRadius: 16,
                  padding: 20,
                  borderWidth: 1,
                  borderColor: '#e5e7eb',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3
                }}
              >
                <View style={{ 
                  width: 56, 
                  height: 56, 
                  borderRadius: 28,
                  backgroundColor: `${category.color}15`,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 12
                }}>
                  <Ionicons name={category.icon as any} size={28} color={category.color} />
                </View>

                <Text style={{ 
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: 4
                }}>
                  {category.name}
                </Text>

                <Text style={{ 
                  fontSize: 12,
                  color: '#6b7280'
                }}>
                  {category.count} buku
                </Text>

                <View style={{ 
                  position: 'absolute',
                  top: 12,
                  right: 12
                }}>
                  <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}