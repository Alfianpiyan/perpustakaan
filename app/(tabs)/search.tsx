import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Appbar, Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Kesehatan",
    year: "2018",
    description: "Buku tentang membangun kebiasaan baik",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "Sejarah",
    year: "2011",
    description: "Sejarah singkat umat manusia",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop"
  },
  {
    id: 3,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Bisnis & Ekonomi",
    year: "2020",
    description: "Pelajaran abadi tentang kekayaan",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop"
  },
  {
    id: 4,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    category: "Fiksi",
    year: "2005",
    description: "Novel tentang perjuangan anak Belitung",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop"
  },
  {
    id: 5,
    title: "Deep Work",
    author: "Cal Newport",
    category: "Kesehatan",
    year: "2016",
    description: "Aturan untuk sukses yang fokus",
    image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=400&fit=crop"
  },
  {
    id: 6,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Kesehatan",
    year: "2011",
    description: "Cara kerja pikiran manusia",
    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=300&h=400&fit=crop"
  },
  {
    id: 7,
    title: "Bumi Manusia",
    author: "Pramoedya Ananta Toer",
    category: "Fiksi",
    year: "1980",
    description: "Novel sejarah Indonesia",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop"
  },
  {
    id: 8,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "Bisnis & Ekonomi",
    year: "1997",
    description: "Pelajaran tentang keuangan",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=400&fit=crop"
  },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const recentSearches = ['Harry Potter', 'Laskar Pelangi', 'Bumi Manusia', 'Sapiens'];

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <Appbar.Header style={{ backgroundColor: '#15518a', elevation: 4 }}>
        <Appbar.Content 
          title="Pencarian" 
          titleStyle={{ color: '#ffffff', fontWeight: 'bold', fontSize: 20 }} 
        />
      </Appbar.Header>

      <ScrollView>
        <View style={{ 
          backgroundColor: '#ffffff',
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb'
        }}>
          <View style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f9fafb',
            borderRadius: 12,
            paddingHorizontal: 16,
            height: 48,
            borderWidth: 1,
            borderColor: '#e5e7eb'
          }}>
            <Ionicons name="search" size={20} color="#6b7280" />
            <TextInput
              placeholder="Cari judul, penulis, atau kategori..."
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{ 
                flex: 1,
                marginLeft: 12,
                fontSize: 15,
                color: '#1f2937'
              }}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#9ca3af" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {!searchQuery && (
          <>
            <View style={{ padding: 16 }}>
              <View style={{ 
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12
              }}>
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: 'bold', 
                  color: '#1f2937'
                }}>
                  Pencarian Terkini
                </Text>
                <TouchableOpacity>
                  <Text style={{ fontSize: 13, color: '#15518a', fontWeight: '600' }}>
                    Hapus Semua
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {recentSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSearchQuery(search)}
                    style={{ 
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#ffffff',
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: '#e5e7eb'
                    }}
                  >
                    <Ionicons name="time-outline" size={16} color="#6b7280" />
                    <Text style={{ 
                      fontSize: 13,
                      color: '#374151',
                      marginLeft: 8
                    }}>
                      {search}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={{ padding: 16 }}>
              <Text style={{ 
                fontSize: 16, 
                fontWeight: 'bold', 
                color: '#1f2937',
                marginBottom: 16
              }}>
                Buku Populer
              </Text>

              {books.slice(0, 4).map((book, index) => (
                <TouchableOpacity
                  key={book.id}
                  style={{ 
                    flexDirection: 'row',
                    backgroundColor: '#ffffff',
                    padding: 16,
                    borderRadius: 12,
                    marginBottom: 12,
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                    elevation: 2
                  }}
                >
                  <Image
                    source={{ uri: book.image }}
                    style={{ 
                      width: 60, 
                      height: 80, 
                      borderRadius: 8 
                    }}
                  />
                  <View style={{ flex: 1, marginLeft: 16, justifyContent: 'center' }}>
                    <Text style={{ 
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#1f2937',
                      marginBottom: 4
                    }}>
                      {book.title}
                    </Text>
                    <Text style={{ 
                      fontSize: 13,
                      color: '#6b7280',
                      marginBottom: 6
                    }}>
                      {book.author}
                    </Text>
                    <View style={{ 
                      backgroundColor: 'rgba(21, 81, 138, 0.1)',
                      alignSelf: 'flex-start',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 6
                    }}>
                      <Text style={{ 
                        fontSize: 11,
                        color: '#15518a',
                        fontWeight: '600'
                      }}>
                        {book.category}
                      </Text>
                    </View>
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
        {searchQuery && (
          <View style={{ padding: 16 }}>
            <Text style={{ 
              fontSize: 16, 
              fontWeight: 'bold', 
              color: '#1f2937',
              marginBottom: 16
            }}>
              Hasil Pencarian ({filteredBooks.length})
            </Text>

            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <TouchableOpacity
                  key={book.id}
                  style={{ 
                    flexDirection: 'row',
                    backgroundColor: '#ffffff',
                    padding: 16,
                    borderRadius: 12,
                    marginBottom: 12,
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                    elevation: 2
                  }}
                >
                  <Image
                    source={{ uri: book.image }}
                    style={{ 
                      width: 60, 
                      height: 80, 
                      borderRadius: 8 
                    }}
                  />
                  <View style={{ flex: 1, marginLeft: 16, justifyContent: 'center' }}>
                    <Text style={{ 
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#1f2937',
                      marginBottom: 4
                    }}>
                      {book.title}
                    </Text>
                    <Text style={{ 
                      fontSize: 13,
                      color: '#6b7280',
                      marginBottom: 6
                    }}>
                      {book.author}
                    </Text>
                    <View style={{ 
                      backgroundColor: 'rgba(21, 81, 138, 0.1)',
                      alignSelf: 'flex-start',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 6
                    }}>
                      <Text style={{ 
                        fontSize: 11,
                        color: '#15518a',
                        fontWeight: '600'
                      }}>
                        {book.category}
                      </Text>
                    </View>
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={{ 
                alignItems: 'center', 
                paddingVertical: 40 
              }}>
                <Ionicons name="book-outline" size={64} color="#9ca3af" />
                <Text style={{ 
                  fontSize: 16, 
                  color: '#6b7280', 
                  marginTop: 16,
                  textAlign: 'center'
                }}>
                  Buku tidak ditemukan
                </Text>
                <Text style={{ 
                  fontSize: 14, 
                  color: '#9ca3af', 
                  marginTop: 8,
                  textAlign: 'center'
                }}>
                  Coba kata kunci lain
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
