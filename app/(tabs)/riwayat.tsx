import React from 'react';
import { View, Text, ScrollView, FlatList, ListRenderItem, Image } from 'react-native';
import { Appbar, Chip, Card, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

type StatusType = 'Dipinjam' | 'Terlambat' | 'Selesai';

interface PeminjamanItem {
  id: number;
  title: string;
  author: string;
  status: StatusType;
  due: string;
  daysLeft: number | null;
  icon: string;
  coverImage: string;
}

const peminjamanData: PeminjamanItem[] = [
  { 
    id: 1, 
    title: 'Laskar Pelangi', 
    author: 'Andrea Hirata', 
    status: 'Dipinjam', 
    due: '12 Feb 2026', 
    daysLeft: 7, 
    icon: 'book',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop'
  },
  { 
    id: 2, 
    title: 'Bumi', 
    author: 'Tere Liye', 
    status: 'Terlambat', 
    due: '5 Feb 2026', 
    daysLeft: -1, 
    icon: 'book',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop'
  },
  { 
    id: 3, 
    title: 'Atomic Habits', 
    author: 'James Clear', 
    status: 'Dipinjam', 
    due: '20 Feb 2026', 
    daysLeft: 15, 
    icon: 'book',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop'
  },
  { 
    id: 4, 
    title: 'Sapiens', 
    author: 'Yuval Noah Harari', 
    status: 'Selesai', 
    due: '28 Jan 2026', 
    daysLeft: null, 
    icon: 'book',
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop'
  },
  { 
    id: 5, 
    title: 'Deep Work', 
    author: 'Cal Newport', 
    status: 'Dipinjam', 
    due: '18 Feb 2026', 
    daysLeft: 13, 
    icon: 'book',
    coverImage: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=400&fit=crop'
  },
  { 
    id: 6, 
    title: 'The Psychology of Money', 
    author: 'Morgan Housel', 
    status: 'Dipinjam', 
    due: '25 Feb 2026', 
    daysLeft: 20, 
    icon: 'book',
    coverImage: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=400&fit=crop'
  },
];

const RiwayatPeminjaman: React.FC = () => {
  const getStatusColor = (status: StatusType): string => {
    switch (status) {
      case 'Terlambat':
        return '#ef4444';
      case 'Dipinjam':
        return '#15518a';
      case 'Selesai':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getStatusBgColor = (status: StatusType): string => {
    switch (status) {
      case 'Terlambat':
        return '#fee2e2';
      case 'Dipinjam':
        return '#dbeafe';
      case 'Selesai':
        return '#d1fae5';
      default:
        return '#f3f4f6';
    }
  };

  const renderPeminjaman: ListRenderItem<PeminjamanItem> = ({ item }) => (
    <Card style={{
      marginBottom: 12,
      backgroundColor: '#ffffff',
      elevation: 2,
      borderRadius: 12,
      overflow: 'hidden'
    }}>
      <Card.Content style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16
      }}>
        <Image 
          source={{ uri: item.coverImage }}
          style={{
            width: 56,
            height: 80,
            borderRadius: 8,
            backgroundColor: '#e5e7eb'
          }}
          resizeMode="cover"
        />

        <View style={{
          flex: 1,
          marginLeft: 16
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: 4
          }}>
            {item.title}
          </Text>
          <Text style={{
            fontSize: 13,
            color: '#6b7280',
            marginBottom: 6
          }}>
            {item.author}
          </Text>
          <View style={{
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 6,
            backgroundColor: getStatusBgColor(item.status),
            alignSelf: 'flex-start'
          }}>
            <Text style={{
              fontSize: 12,
              color: getStatusColor(item.status),
              fontWeight: '600'
            }}>
              {item.status}
            </Text>
          </View>
        </View>

        <View style={{
          alignItems: 'flex-end'
        }}>
          <Text style={{
            fontSize: 11,
            color: '#9ca3af',
            marginBottom: 2
          }}>
            Jatuh tempo
          </Text>
          <Text style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: 4
          }}>
            {item.due}
          </Text>
          {item.daysLeft !== null && (
            <Text style={{
              fontSize: 11,
              color: item.daysLeft < 0 ? '#ef4444' : '#15518a',
              fontWeight: '500'
            }}>
              {item.daysLeft < 0 
                ? `${Math.abs(item.daysLeft)} hari terlambat` 
                : `${item.daysLeft} hari lagi`}
            </Text>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#ffffff'
    }}>
      <Appbar.Header style={{
        backgroundColor: '#15518a',
        elevation: 4
      }}>
        <Appbar.BackAction color="#ffffff" onPress={() => {}} />
        <Appbar.Content
          title="Riwayat Peminjaman"
          titleStyle={{
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: 18
          }}
        />
        <Appbar.Action icon="filter-variant" color="#ffffff" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView style={{ flex: 1 }}>
        <View style={{
          backgroundColor: '#15518a',
          padding: 28,
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 48,
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: 8
          }}>
            5
          </Text>
          <Text style={{
            fontSize: 16,
            color: '#e0e7ff',
            fontWeight: '600'
          }}>
            Total Peminjaman Aktif
          </Text>
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 24,
          backgroundColor: '#f9fafb',
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb'
        }}>
          <View style={{ alignItems: 'center' }}>
            <View style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: 'rgba(21, 81, 138, 0.1)',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10
            }}>
              <Ionicons name="book" size={30} color="#15518a" />
            </View>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: 2
            }}>
              4
            </Text>
            <Text style={{
              fontSize: 13,
              color: '#6b7280'
            }}>
              Dipinjam
            </Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <View style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: '#fef3c7',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10
            }}>
              <Ionicons name="alert-circle" size={30} color="#f59e0b" />
            </View>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: 2
            }}>
              1
            </Text>
            <Text style={{
              fontSize: 13,
              color: '#6b7280'
            }}>
              Terlambat
            </Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <View style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: '#d1fae5',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10
            }}>
              <Ionicons name="checkmark-circle" size={30} color="#10b981" />
            </View>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: 2
            }}>
              1
            </Text>
            <Text style={{
              fontSize: 13,
              color: '#6b7280'
            }}>
              Selesai
            </Text>
          </View>
        </View>

        <View style={{
          paddingHorizontal: 20,
          paddingVertical: 16,
          backgroundColor: '#ffffff'
        }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
          >
            <Chip
              selected
              style={{ backgroundColor: '#15518a' }}
              textStyle={{ color: '#ffffff', fontSize: 13, fontWeight: '600' }}
            >
              Semua
            </Chip>
            <Chip
              style={{ backgroundColor: '#f3f4f6' }}
              textStyle={{ color: '#6b7280', fontSize: 13 }}
            >
              Dipinjam
            </Chip>
            <Chip
              style={{ backgroundColor: '#f3f4f6' }}
              textStyle={{ color: '#6b7280', fontSize: 13 }}
            >
              Terlambat
            </Chip>
            <Chip
              style={{ backgroundColor: '#f3f4f6' }}
              textStyle={{ color: '#6b7280', fontSize: 13 }}
            >
              Selesai
            </Chip>
          </ScrollView>
        </View>

        <View style={{
          paddingHorizontal: 20,
          paddingBottom: 100
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: 16
          }}>
            Daftar Peminjaman
          </Text>

          <FlatList
            data={peminjamanData}
            renderItem={renderPeminjaman}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />

          <View style={{ marginTop: 32 }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: 12
            }}>
              Kategori Favorit Anda
            </Text>
            <View style={{
              flexDirection: 'row',
              gap: 8,
              flexWrap: 'wrap'
            }}>
              <Chip
                style={{ backgroundColor: 'rgba(21, 81, 138, 0.1)' }}
                textStyle={{ color: '#15518a', fontSize: 13, fontWeight: '500' }}
              >
                Fiksi
              </Chip>
              <Chip
                style={{ backgroundColor: 'rgba(21, 81, 138, 0.1)' }}
                textStyle={{ color: '#15518a', fontSize: 13, fontWeight: '500' }}
              >
                Pendidikan
              </Chip>
              <Chip
                style={{ backgroundColor: 'rgba(21, 81, 138, 0.1)' }}
                textStyle={{ color: '#15518a', fontSize: 13, fontWeight: '500' }}
              >
                Sains
              </Chip>
              <Chip
                style={{ backgroundColor: 'rgba(21, 81, 138, 0.1)' }}
                textStyle={{ color: '#15518a', fontSize: 13, fontWeight: '500' }}
              >
                Biografi
              </Chip>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb'
      }}>
        <Button
          mode="contained"
          buttonColor="#15518a"
          style={{
            height: 52,
            justifyContent: 'center',
            borderRadius: 12,
            elevation: 2
          }}
          labelStyle={{
            fontSize: 16,
            fontWeight: 'bold'
          }}
          icon="plus"
          onPress={() => {}}
        >
          Pinjam Buku Baru
        </Button>
      </View>
    </View>
  );
};

export default RiwayatPeminjaman;