import * as ImagePicker from "expo-image-picker";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { Image, Text, View, ScrollView } from "react-native";
import { Appbar, Button, Card, Dialog, Portal, TextInput } from "react-native-paper";

const db = SQLite.openDatabaseSync("books.db", {
  useNewConnection: true,
});

export default function BooksPage() {
  const [visible, setVisible] = useState(false);
  const [books, setBooks] = useState<any[]>([]);

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

  async function initDataBase() {
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS books(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          author TEXT NOT NULL,
          category TEXT NOT NULL,
          year TEXT NOT NULL,
          description TEXT,
          image TEXT
        )
      `);
    } catch (error) {
      console.log(error);
    }
  }


  async function getBooks() {
    const results = await db.getAllAsync(`SELECT * FROM books`);
    setBooks(results);
  }

  useEffect(() => {
    initDataBase();
    getBooks();
  }, []);

  async function addBook() {
    const newErrors = {
      title: !formData.title.trim(),
      author: !formData.author.trim(),
    };

    setErrors(newErrors);

    if (newErrors.title || newErrors.author) return;

    try {
      await db.runAsync(
        `INSERT INTO books (title, author, category, year, description, image)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          formData.title,
          formData.author,
          formData.category,
          formData.year,
          formData.description,
          formData.image,
        ]
      );

      await getBooks();

      setVisible(false);
      setFormData({
        image: "",
        title: "",
        category: "",
        year: "",
        description: "",
        author: "",
      });

      setErrors({ title: false, author: false });
    } catch (error) {
      console.log(error);
    }
  }

  async function pickImage() {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled) {
        setFormData({ ...formData, image: result.assets[0].uri });
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ScrollView  style={{ backgroundColor: "#F8FAFC" }}>
      <View>
        <Appbar.Header style={{ backgroundColor: "#2563EB" }}>
          <Appbar.Content title="BooksPage"  titleStyle={{ color: "white" }} />
          <Appbar.Action icon="plus"color="#ffff" onPress={() => setVisible(true)} />
        </Appbar.Header>
        {books.length === 0 && (
          <Text
            style={{
              textAlign: "center",
              color: "#64748B",
              marginTop: 40,
            }}
          >
            Belum ada buku 📘
          </Text>
        )}


        <View
          style={{
            padding: 16,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {books.map((book) => (
            <Card
              key={book.id}
              style={{
                width: "48%",
                marginBottom: 16,
                borderRadius: 12,
                backgroundColor: "white",
              }}
              elevation={3}

            >
              <Card.Cover source={{ uri: book.image }} />
              <View style={{ marginTop: 8, paddingHorizontal: 12, paddingBottom: 12 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, color: "#1E3A8A" }}>
                  {book.title}
                </Text>
                <Text style={{  fontSize: 12, color: "#64748B" }}>
                  {book.category}
                </Text>
              </View>
            </Card>
          ))}
        </View>

        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}  style={{ borderRadius: 16, backgroundColor: "white" }}>
            <Dialog.Title>Tambah Buku</Dialog.Title>
            <Dialog.Content>
              <View style={{ marginBottom: 12 }}>
                <View style={{ alignItems: "center" }}>
                  {formData.image ? (
                    <Image
                      source={{ uri: formData.image }}
                      style={{ width: 120, height: 160, marginBottom: 8 }}
                    />
                  ) : (
                    <View
                      style={{
                        width: 120,
                        height: 160,
                        backgroundColor: "gray",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <Text>Belum Ada Gambar</Text>
                    </View>
                  )}
                </View>

                <Button mode="outlined"
                        textColor="#2563EB"
                        style={{ borderColor: "#2563EB", marginBottom: 12 }}
                        onPress={pickImage}>
                  Pilih Sampul
                </Button>

                <TextInput
                  label="Judul Buku"
                  mode="outlined"
                  activeOutlineColor="#2563EB"
                  error={errors.title}
                  value={formData.title}
                  onChangeText={(text) => {
                    setFormData({ ...formData, title: text });
                    if (errors.title) setErrors({ ...errors, title: false });
                  }}
                />
                {errors.title && (
                  <Text style={{ color: "red", fontSize: 12 }}>
                    Judul wajib diisi
                  </Text>
                )}

                <TextInput
                  label="Penulis"
                  mode="outlined"
                  activeOutlineColor="#2563EB"
                  error={errors.author}
                  value={formData.author}
                  onChangeText={(text) => {
                    setFormData({ ...formData, author: text });
                    if (errors.author)
                      setErrors({ ...errors, author: false });
                  }}
                />
                {errors.author && (
                  <Text style={{ color: "red", fontSize: 12 }}>
                    Penulis wajib diisi
                  </Text>
                )}

                <TextInput
                  label="Kategori"
                  mode="outlined"
                  activeOutlineColor="#2563EB"
                  value={formData.category}
                  onChangeText={(text) =>
                    setFormData({ ...formData, category: text })
                  }
                />

                <TextInput
                  label="Tahun"
                  mode="outlined"
                  activeOutlineColor="#2563EB"
                  value={formData.year}
                  onChangeText={(text) =>
                    setFormData({ ...formData, year: text })
                  }
                />

                <TextInput
                  label="Deskripsi"
                  multiline
                  numberOfLines={3}
                  mode="outlined"
                  activeOutlineColor="#2563EB"
                  value={formData.description}
                  onChangeText={(text) =>
                    setFormData({ ...formData, description: text })
                  }
                  style={{ marginBottom: 12 }}
                />

                <Button mode="contained"
                        buttonColor="#2563EB"
                        onPress={addBook}>
                  Simpan
                </Button>
              </View>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
    </ScrollView>
  );
}