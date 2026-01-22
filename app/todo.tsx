import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import {
  Appbar,
  Checkbox,
  List,
  Surface,
  TextInput,
  Button,
  Portal,
  Modal,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function todoList() {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

// ini yang buat load nya 
  async function loadTodo() {
    const storedTodo = await AsyncStorage.getItem("todo");
    if (storedTodo) {
      setTodo(JSON.parse(storedTodo));
    }
    setLoading(false);
  }

  useEffect(() => {
    loadTodo();
  }, []);
  // =========================================

  async function addTodo() {
    const newTodo: Todo = {
      id: Math.random().toString(),
      title: input,
      completed: false,
    };

    const updatedTodo = [newTodo, ...todo];
    setTodo(updatedTodo);
    setInput("");

    await AsyncStorage.setItem("todo", JSON.stringify(updatedTodo));
  }

  async function deletedTodo(id: string) {
    const updatedTodo = todo.filter((todo) => todo.id !== id);
    setTodo(updatedTodo);
    await AsyncStorage.setItem("todo", JSON.stringify(updatedTodo));
  }

  async function toggleTodo(id: string) {
    const updatedTodo = todo.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    );

    setTodo(updatedTodo);
    await AsyncStorage.setItem("todo", JSON.stringify(updatedTodo));
  }

  // ini buat tugas editnya ya pa
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState("");
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const editTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setEditText(todo.title);
    setEdit(true);
  };

  const saveEdit = async () => {
    if (!selectedTodo) return;

    const updatedTodo = todo.map((item) =>
      item.id === selectedTodo.id
        ? { ...item, title: editText }
        : item
    );

    setTodo(updatedTodo);
    await AsyncStorage.setItem("todo", JSON.stringify(updatedTodo));
    setEdit(false);
    setSelectedTodo(null);
  };
  // =========================================

  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Todoo" />
      </Appbar.Header>

      <View style={{ padding: 16 }}>
        <Surface style={{ padding: 16, borderRadius: 12, elevation: 4 }}>
          <TextInput
            label="todo"
            onChangeText={setInput}
            value={input}
            mode="outlined"
            right={
              <TextInput.Icon icon="plus" onPress={addTodo} />
            }
          />
        </Surface>

        <ScrollView style={{ marginTop: 16 }}>
          {todo.map((todo) => (
            <Surface
              key={todo.id}
              style={{ marginBottom: 12, borderRadius: 8, elevation: 2 }}
            >
              <List.Item
                title={() => <Text style={{color: "#fff"}}>{todo.title}</Text>}
                right={() => (
                  <View style={{ flexDirection: "row" }}>
                    <Button onPress={() => editTodo(todo)}>Edit</Button>
                    <Button onPress={() => deletedTodo(todo.id)}>
                      Delete
                    </Button>
                  </View>
                )}
                left={() => (
                  <Checkbox
                    status={todo.completed ? "checked" : "unchecked"}
                    onPress={() => toggleTodo(todo.id)}
                  />
                )}
              />
            </Surface>
          ))}
        </ScrollView>
      </View>

      {/* ini buat tampillannya */}
      <Portal>
        <Modal visible={edit} onDismiss={() => setEdit(false)}>
          <Surface
            style={{ padding: 20, margin: 20, borderRadius: 8 }}
          >
            <Text style={{ fontSize: 18, marginBottom: 12 }}>
              Edit Todo
            </Text>

            <TextInput
              value={editText}
              onChangeText={setEditText}
              mode="outlined"
              placeholder="Edit judul todo"
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 16,
              }}
            >
              <Button onPress={() => setEdit(false)}>Batal</Button>
              <Button onPress={saveEdit}>Simpan</Button>
            </View>
          </Surface>
        </Modal>
      </Portal>
      {/* ================================= */}
    </SafeAreaView>
  );
}
