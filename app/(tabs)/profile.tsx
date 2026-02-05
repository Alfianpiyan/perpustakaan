import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function ProfilePage() {
  const menuItems = [
    { icon: 'person-outline', title: 'Edit Profil', color: '#15518a' },
    { icon: 'bookmark-outline', title: 'Buku Favorit', color: '#15518a', badge: '12' },
    { icon: 'time-outline', title: 'Riwayat Peminjaman', color: '#15518a' },
    { icon: 'notifications-outline', title: 'Notifikasi', color: '#15518a' },
    { icon: 'settings-outline', title: 'Pengaturan', color: '#15518a' },
    { icon: 'help-circle-outline', title: 'Bantuan & Dukungan', color: '#15518a' },
    { icon: 'information-circle-outline', title: 'Tentang Aplikasi', color: '#6b7280' },
    { icon: 'log-out-outline', title: 'Keluar', color: '#ef4444' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <Appbar.Header style={{ backgroundColor: '#15518a', elevation: 4 }}>
        <Appbar.Content 
          title="Profil Saya" 
          titleStyle={{ color: '#ffffff', fontWeight: 'bold', fontSize: 20 }} 
        />
      </Appbar.Header>

      <ScrollView>
        <View style={{ 
          backgroundColor: '#15518a', 
          paddingVertical: 32, 
          paddingHorizontal: 24,
          alignItems: 'center'
        }}>
          <View style={{ 
            width: 100, 
            height: 100, 
            borderRadius: 50, 
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
            borderWidth: 3,
            borderColor: '#93c5fd'
          }}>
            <Ionicons name="person" size={50} color="#ffffff" />
          </View>
          
          <Text style={{ 
            fontSize: 24, 
            fontWeight: 'bold', 
            color: '#ffffff',
            marginBottom: 4
          }}>
            Alfian
          </Text>
          
          <Text style={{ 
            fontSize: 14, 
            color: '#93c5fd',
            marginBottom: 20
          }}>
            pian@email.com
          </Text>

          <View style={{ 
            flexDirection: 'row', 
            gap: 24,
            width: '100%',
            justifyContent: 'center'
          }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ 
                fontSize: 24, 
                fontWeight: 'bold', 
                color: '#ffffff' 
              }}>
                24
              </Text>
              <Text style={{ fontSize: 12, color: '#93c5fd' }}>
                Buku Dibaca
              </Text>
            </View>
            <View style={{ 
              width: 1, 
              backgroundColor: 'rgba(255, 255, 255, 0.3)' 
            }} />
            <View style={{ alignItems: 'center' }}>
              <Text style={{ 
                fontSize: 24, 
                fontWeight: 'bold', 
                color: '#ffffff' 
              }}>
                5
              </Text>
              <Text style={{ fontSize: 12, color: '#93c5fd' }}>
                Dipinjam
              </Text>
            </View>
            <View style={{ 
              width: 1, 
              backgroundColor: 'rgba(255, 255, 255, 0.3)' 
            }} />
            <View style={{ alignItems: 'center' }}>
              <Text style={{ 
                fontSize: 24, 
                fontWeight: 'bold', 
                color: '#ffffff' 
              }}>
                12
              </Text>
              <Text style={{ fontSize: 12, color: '#93c5fd' }}>
                Favorit
              </Text>
            </View>
          </View>
        </View>

        <View style={{ 
          padding: 16,
          marginTop: -20,
          backgroundColor: '#ffffff',
          marginHorizontal: 16,
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{ 
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 16,
                borderBottomWidth: index !== menuItems.length - 1 ? 1 : 0,
                borderBottomColor: '#f3f4f6'
              }}
            >
              <View style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 20,
                backgroundColor: `${item.color}15`,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Ionicons name={item.icon as any} size={20} color={item.color} />
              </View>
              
              <Text style={{ 
                flex: 1,
                fontSize: 15,
                color: '#1f2937',
                marginLeft: 16,
                fontWeight: '500'
              }}>
                {item.title}
              </Text>

              {item.badge && (
                <View style={{ 
                  backgroundColor: '#ef4444',
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 10,
                  marginRight: 8
                }}>
                  <Text style={{ 
                    fontSize: 11,
                    color: '#ffffff',
                    fontWeight: 'bold'
                  }}>
                    {item.badge}
                  </Text>
                </View>
              )}

              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}