import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { Alert, FlatList, KeyboardAvoidingView, View } from "react-native";
import {
    Appbar,
    Button,
    Card,
    Dialog,
    Portal,
    Text,
    TextInput,
} from "react-native-paper";

const db = SQLite.openDatabaseSync("books.db", {
    useNewConnection: true,
})

export default function BooksPage() {
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({
        image: "",
        title: "",
        category: "",
        year: "",
        description: "",
        author: "",
    });
    const [books, setBooks] = useState<any[]>([]);
    const [editBookId, setEditBookId] = useState<number | null>(null);

    async function initDatabase() {
        try {
            await db.execAsync(`
            CREATE TABLE IF NOT EXISTS books 
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
            image NOT NULL TEXT,
            title NOT NULL TEXT,
            category NOT NULL TEXT,
            year NOT NULL TEXT,
            description NOT NULL TEXT,
            author NOT NULL TEXT)`)
        } catch (error) {

        }
    }

    useEffect(() => {
        initDatabase();
        loadBooks();
    });

    async function loadBooks () {
        try{
            const results = await db.getAllAsync(`SELECT * FROM books order by id DESC`);
            setBooks(results);
        }catch (e) {
            Alert.alert("Error", "Gagal memuat buku");
            console.error(e);
        }
    }


    async function editBook() {
        try {
            await db.runAsync(
                `UPDATE books SET title = ?, author = ?, category = ?, year = ?, description = ?, image = ? WHERE id = ?`,
                [
                    formData.title,
                    formData.author,
                    formData.category,
                    formData.year,
                    formData.description,
                    formData.image,
                    editBookId,
                ]
            )
            const updatedBooks = books.map((book: any) => {
                if (book.id === editBookId) {
                    return {
                        ...book,
                        title: formData.title,
                        author: formData.author,
                        category: formData.category,
                        year: formData.year,
                        description: formData.description,
                        image: formData.image,
                    }
                }
                return book;
            });
            setBooks(updatedBooks);
            setVisible(false);
            setEditBookId(null);
        } catch (e) {
            Alert.alert("Error", "Gagal mengedit buku");
            console.log(e);
        }
    }

    async function addBook() {
        try {
            await db.runAsync(
                `INSERT INTO books (title, author, category, year, description, image) VALUES
        (?, ?, ?, ?, ?, ?)`,

                [
                    formData.title,
                    formData.author,
                    formData.category,
                    formData.year,
                    formData.description,
                    formData.image,
                ],
            );

            const newBooks = {
                id: Date.now(),
                title: formData.title,
                author: formData.author,
                category: formData.category,
                year: formData.year,
                description: formData.description,
                image: formData.image,
            };
            setBooks([...books, newBooks]);
            setVisible(false);
            setFormData({
                image: "",
                title: "",
                author: "",
                category: "",
                year: "",
                description: "",
            });

        } catch (e) {
            Alert.alert("Error", "Gagal menambahkan buku");
            console.log(e);
        }
    }

    async function deleteBooks(id: number) {
        try {
            await db.runAsync(`DELETE FROM books WHERE id = ?`, [id]);
            const updatedBooks = books.filter(book => book.id !== id);
            setBooks(updatedBooks);
        } catch (error) {
            Alert.alert("Error", "Gagal menghapus buku");
            console.log(error);
        }
    }


    async function pickImage() {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [3, 4],
                quality: 0.8,
            });
            if (!result.canceled) {
                setFormData({ ...formData, image: result.assets[0].uri });
            }
        } catch (error) {
            console.log("Error picking image:", error);
        }
    }
    return (
        <KeyboardAvoidingView>
            <View style={{ marginBottom: 12 }}>
                <Appbar.Header>
                    <Appbar.Content title="books page" />
                    <Appbar.Action
                        icon="plus"
                        onPress={() => {
                            setVisible(true);
                        }}
                    />
                </Appbar.Header>
                <View
                    style={{
                        marginBottom:300,
                        padding: 16,
                        justifyContent: "space-between",
                        flexDirection: "row",
                    }}
                >

                    <FlatList
                        data={books}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <Card style={{ width: "45%", padding: 8, marginBottom: 12, gap: 8, marginHorizontal: 8, borderRadius: 12 }}>
                                <Card.Cover
                                    source={{
                                        uri: item.image,
                                    }}
                                />
                                <View style={{ marginTop: 8, marginBottom: 4 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                                        {item.title}
                                    </Text>
                                    <Text style={{ fontSize: 16, color: "gray" }}>
                                        {item.author} - {item.category} - {item.year}
                                    </Text>
                                    <Text style={{ fontSize: 11, marginTop: 4, color: "gray" }}>
                                        {item.description}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Button mode="contained" onPress={() => {
                                        setEditBookId(item.id);
                                        setVisible(true);
                                        setFormData({
                                            image: item.image,
                                            title: item.title,
                                            author: item.author,
                                            category: item.category,
                                            year: item.year,
                                            description: item.description,
                                        })
                                    }}>Edit</Button>
                                    <Button mode="contained" onPress={() => { deleteBooks(item.id) }} buttonColor="red">Delete</Button>
                                </View>
                            </Card>
                        )}
                    />
                </View>

                {visible && (
                    <Portal>
                        <Dialog
                            visible={visible}
                            onDismiss={() => {
                                setVisible(false);
                            }}
                        >
                            <Dialog.Title>
                                {editBookId ? "Edit Buku" : "Tambah Buku"}
                            </Dialog.Title>
                            <Dialog.Content>
                                <View style={{ marginBottom: 16 }}>
                                    <View style={{ alignItems: "center" }}>
                                        {formData.image ? (
                                            <View style={{ marginBottom: 16, borderRadius: 8, backgroundColor: "gray" }}>
                                                <Image source={{ uri: formData.image }} style={{ width: 120, height: 160, borderRadius: 8 }} resizeMode="cover" />
                                            </View>
                                        ) : <View style={{ height: 160, width: 120, marginBottom: 16, borderRadius: 8, backgroundColor: "lightgray", justifyContent: "center", alignItems: "center" }}>
                                            <Text>No image selected</Text>
                                        </View>
                                        }
                                    </View>
                                </View>

                                <View style={{ marginBottom: 16 }}>
                                    <Button mode="outlined" onPress={() => { pickImage() }}>
                                        Pilih Gambar
                                    </Button>
                                    <TextInput
                                        label="judul buku"
                                        mode="outlined"
                                        style={{ marginBottom: 8 }}
                                        value={formData.title}
                                        onChangeText={(text) => { setFormData({ ...formData, title: text }) }}
                                    />
                                    <TextInput
                                        label="Penulis"
                                        mode="outlined"
                                        style={{ marginBottom: 8 }}
                                        value={formData.author}
                                        onChangeText={(text) => { setFormData({ ...formData, author: text }) }}
                                    />
                                    <TextInput
                                        label="Kategori"
                                        mode="outlined"
                                        style={{ marginBottom: 8 }}
                                        value={formData.category}
                                        onChangeText={(text) => { setFormData({ ...formData, category: text }) }}
                                    />
                                    <TextInput
                                        label="Terbit Tahun"
                                        mode="outlined"
                                        style={{ marginBottom: 8 }}
                                        value={formData.year}
                                        onChangeText={(text) => { setFormData({ ...formData, year: text }) }}
                                    />
                                    <TextInput
                                        label="Deskripsi"
                                        mode="outlined"
                                        multiline
                                        numberOfLines={4}
                                        style={{ marginBottom: 8 }}
                                        value={formData.description}
                                        onChangeText={(text) => { setFormData({ ...formData, description: text }) }}
                                    />
                                </View>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button mode="outlined" onPress={() => { setVisible(false) }}>batal</Button>
                                <Button mode="contained" onPress={ () => {
                                    
                                    if (editBookId) {
                                        editBook();
                                    } else {
                                        addBook();
                                    }
                                }}
                                >
                                    {editBookId ? "update" : "simpan"}
                                </Button>
                            </Dialog.Actions>

                        </Dialog>
                    </Portal>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}