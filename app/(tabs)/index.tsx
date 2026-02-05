import { useState } from "react";
import { Image, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Appbar, Button, Card, Dialog, Portal, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function BooksPage() {
  const [visible, setVisible] = useState(false);

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

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    category: "",
    year: "",
    description: "",
    author: "",
  });

  const [errors, setErrors] = useState({
    title: false,
    author: false,
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Appbar.Header style={{ backgroundColor: '#15518a', elevation: 4 }}>
        <Appbar.Content 
          title="Koleksi Buku" 
          titleStyle={{ color: '#ffffff', fontWeight: 'bold', fontSize: 20 }} 
        />
        <Appbar.Action 
          icon="plus" 
          color="#ffffff" 
          onPress={() => setVisible(true)} 
        />
      </Appbar.Header>

      <ScrollView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
        <View style={{ backgroundColor: '#15518a', paddingVertical: 32, paddingHorizontal: 24 }}>
          <View style={{ alignItems: 'center' }}>
            <Ionicons name="library" size={48} color="#93c5fd" />
            <Text style={{ 
              fontSize: 28, 
              fontWeight: 'bold', 
              color: '#ffffff', 
              marginTop: 16, 
              textAlign: 'center' 
            }}>
              Perpustakaan Digital
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: '#93c5fd', 
              marginTop: 8, 
              textAlign: 'center' 
            }}>
              Kelola koleksi buku favorit Anda
            </Text>
            
            <View style={{ flexDirection: 'row', marginTop: 24, gap: 16 }}>
              <View style={{ 
                alignItems: 'center', 
                backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                paddingHorizontal: 24, 
                paddingVertical: 12, 
                borderRadius: 12 
              }}>
                <Ionicons name="book" size={20} color="#93c5fd" />
                <Text style={{ 
                  fontSize: 24, 
                  fontWeight: 'bold', 
                  color: '#ffffff', 
                  marginTop: 4 
                }}>
                  {books.length}
                </Text>
                <Text style={{ fontSize: 11, color: '#93c5fd', marginTop: 2 }}>
                  Total Buku
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ padding: 16 }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: 'bold', 
            color: '#1f2937', 
            marginBottom: 16 
          }}>
            Koleksi Buku ({books.length})
          </Text>
          
          <View style={{ 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            gap: 12 
          }}>
            {books.map((book) => (
              <Card 
                key={book.id} 
                style={{ 
                  width: '48%', 
                  backgroundColor: '#ffffff', 
                  borderRadius: 12, 
                  overflow: 'hidden', 
                  borderWidth: 1, 
                  borderColor: '#e5e7eb' 
                }} 
                elevation={3}
              >
                <Card.Cover 
                  source={{ uri: book.image }} 
                  style={{ height: 200, backgroundColor: '#f3f4f6' }}
                />
                <View style={{ padding: 12 }}>
                  <Text 
                    style={{ 
                      fontSize: 14, 
                      fontWeight: 'bold', 
                      color: '#15518a', 
                      marginBottom: 4, 
                      lineHeight: 18 
                    }}
                    numberOfLines={2}
                  >
                    {book.title}
                  </Text>
                  <Text 
                    style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}
                    numberOfLines={1}
                  >
                    {book.author}
                  </Text>
                  <View style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'space-between' 
                  }}>
                    <View style={{ 
                      backgroundColor: 'rgba(21, 81, 138, 0.1)', 
                      paddingHorizontal: 8, 
                      paddingVertical: 4, 
                      borderRadius: 6 
                    }}>
                      <Text style={{ 
                        fontSize: 10, 
                        color: '#15518a', 
                        fontWeight: '600' 
                      }}>
                        {book.category}
                      </Text>
                    </View>
                    {book.year && (
                      <Text style={{ fontSize: 11, color: '#9ca3af' }}>
                        {book.year}
                      </Text>
                    )}
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>

      <Portal>
        <Dialog 
          visible={visible} 
          onDismiss={() => setVisible(false)} 
          style={{ 
            borderRadius: 16, 
            backgroundColor: '#ffffff', 
            maxHeight: '90%' 
          }}
        >
          <Dialog.Title style={{ 
            fontSize: 20, 
            fontWeight: 'bold', 
            color: '#15518a' 
          }}>
            Tambah Buku Baru
          </Dialog.Title>
          
          <Dialog.Content>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <TouchableOpacity 
                  onPress={() => {}}
                  style={{ 
                    width: 160, 
                    height: 220, 
                    borderRadius: 12, 
                    overflow: 'hidden', 
                    borderWidth: 2, 
                    borderColor: '#e5e7eb', 
                    borderStyle: 'dashed' 
                  }}
                >
                  {formData.image ? (
                    <Image
                      source={{ uri: formData.image }}
                      style={{ width: '100%', height: '100%' }}
                    />
                  ) : (
                    <View style={{ 
                      width: '100%', 
                      height: '100%', 
                      backgroundColor: '#f9fafb', 
                      justifyContent: 'center', 
                      alignItems: 'center' 
                    }}>
                      <Ionicons name="image-outline" size={40} color="#93c5fd" />
                      <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 8 }}>
                        Pilih Sampul Buku
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              <TextInput
                label="Judul Buku *"
                mode="outlined"
                activeOutlineColor="#15518a"
                outlineColor="#e5e7eb"
                error={errors.title}
                value={formData.title}
                style={{ marginBottom: 12, backgroundColor: '#ffffff' }}
                onChangeText={(text) => {
                  setFormData({ ...formData, title: text });
                  if (errors.title) setErrors({ ...errors, title: false });
                }}
              />
              {errors.title && (
                <Text style={{ 
                  color: '#ef4444', 
                  fontSize: 12, 
                  marginTop: -8, 
                  marginBottom: 12, 
                  marginLeft: 4 
                }}>
                  Judul wajib diisi
                </Text>
              )}

              <TextInput
                label="Penulis *"
                mode="outlined"
                activeOutlineColor="#15518a"
                outlineColor="#e5e7eb"
                error={errors.author}
                value={formData.author}
                style={{ marginBottom: 12, backgroundColor: '#ffffff' }}
                onChangeText={(text) => {
                  setFormData({ ...formData, author: text });
                  if (errors.author) setErrors({ ...errors, author: false });
                }}
              />
              {errors.author && (
                <Text style={{ 
                  color: '#ef4444', 
                  fontSize: 12, 
                  marginTop: -8, 
                  marginBottom: 12, 
                  marginLeft: 4 
                }}>
                  Penulis wajib diisi
                </Text>
              )}

              <TextInput
                label="Kategori"
                mode="outlined"
                activeOutlineColor="#15518a"
                outlineColor="#e5e7eb"
                value={formData.category}
                style={{ marginBottom: 12, backgroundColor: '#ffffff' }}
                onChangeText={(text) =>
                  setFormData({ ...formData, category: text })
                }
              />

              <TextInput
                label="Tahun Terbit"
                mode="outlined"
                activeOutlineColor="#15518a"
                outlineColor="#e5e7eb"
                keyboardType="numeric"
                value={formData.year}
                style={{ marginBottom: 12, backgroundColor: '#ffffff' }}
                onChangeText={(text) =>
                  setFormData({ ...formData, year: text })
                }
              />

              <TextInput
                label="Deskripsi"
                mode="outlined"
                multiline
                numberOfLines={4}
                activeOutlineColor="#15518a"
                outlineColor="#e5e7eb"
                value={formData.description}
                style={{ marginBottom: 12, backgroundColor: '#ffffff' }}
                onChangeText={(text) =>
                  setFormData({ ...formData, description: text })
                }
              />

              <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
                <Button
                  mode="outlined"
                  textColor="#6b7280"
                  style={{ flex: 1, borderColor: '#e5e7eb' }}
                  onPress={() => setVisible(false)}
                >
                  Batal
                </Button>
                <Button
                  mode="contained"
                  buttonColor="#15518a"
                  style={{ flex: 1 }}
                  onPress={() => {
                    setVisible(false);
                    setFormData({
                      image: "",
                      title: "",
                      category: "",
                      year: "",
                      description: "",
                      author: "",
                    });
                  }}
                >
                  Simpan Buku
                </Button>
              </View>
            </ScrollView>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
}