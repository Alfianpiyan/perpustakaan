import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { TextInput, Portal, Modal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

type ShopItem = {
  id: string;
  name: string;
  qty: number;
  bought: boolean;
};

const C = {
  bg: "#ffffff",
  surface: "#f5f5f5",
  surfaceHigh: "#ebebeb",
  accent: "#111111",
  danger: "#ff3b30",
  text: "#111111",
  textMuted: "#888888",
  border: "#e0e0e0",
};

export default function ShoppingList() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [input, setInput] = useState("");
  const [qty, setQty] = useState("1");
  const [filter, setFilter] = useState<"all" | "belum" | "dibeli">("all");
  const [editModal, setEditModal] = useState(false);
  const [editItem, setEditItem] = useState<ShopItem | null>(null);
  const [editText, setEditText] = useState("");
  const [editQty, setEditQty] = useState("1");

  useEffect(() => { load(); }, []);

  async function load() {
    const s = await AsyncStorage.getItem("shopList");
    if (s) setItems(JSON.parse(s));
  }

  async function save(data: ShopItem[]) {
    setItems(data);
    await AsyncStorage.setItem("shopList", JSON.stringify(data));
  }

  async function addItem() {
    if (!input.trim()) return;
    const newItem: ShopItem = {
      id: Math.random().toString(),
      name: input.trim(),
      qty: parseInt(qty) || 1,
      bought: false,
    };
    await save([newItem, ...items]);
    setInput("");
    setQty("1");
  }

  const toggleBought = (id: string) =>
    save(items.map((i) => i.id === id ? { ...i, bought: !i.bought } : i));

  const deleteItem = (id: string) =>
    save(items.filter((i) => i.id !== id));

  const openEdit = (item: ShopItem) => {
    setEditItem(item);
    setEditText(item.name);
    setEditQty(String(item.qty));
    setEditModal(true);
  };

  const saveEdit = async () => {
    if (!editItem) return;
    await save(items.map((i) =>
      i.id === editItem.id
        ? { ...i, name: editText, qty: parseInt(editQty) || 1 }
        : i
    ));
    setEditModal(false);
  };

  const filtered = items.filter((i) =>
    filter === "belum" ? !i.bought : filter === "dibeli" ? i.bought : true
  );

  const boughtCount = items.filter((i) => i.bought).length;
  const remaining = items.length - boughtCount;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: C.border,
        backgroundColor: C.bg,
      }}>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Ionicons name="cart" size={24} color={C.accent} />
            <Text style={{ fontSize: 24, fontWeight: "800", color: C.text }}>Shopping List</Text>
          </View>
          <Text style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>
            {remaining > 0 ? `${remaining} item belum dibeli` : items.length > 0 ? "Semua sudah dibeli 🎉" : "Belum ada barang"}
          </Text>
        </View>
        <View style={{
          backgroundColor: C.accent,
          borderRadius: 14,
          paddingHorizontal: 14,
          paddingVertical: 6,
          alignItems: "center",
        }}>
          <Text style={{ fontSize: 20, fontWeight: "800", color: "#ffffff" }}>{remaining}</Text>
          <Text style={{ fontSize: 10, color: "#cccccc" }}>sisa</Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", gap: 10, marginTop: 16 }}>
          {[
            { label: "Total", num: items.length, color: C.text, icon: "list-outline" as keyof typeof Ionicons.glyphMap },
            { label: "Sisa", num: remaining, color: C.accent, icon: "cart-outline" as keyof typeof Ionicons.glyphMap },
            { label: "Dibeli", num: boughtCount, color: C.textMuted, icon: "bag-check-outline" as keyof typeof Ionicons.glyphMap },
          ].map((s) => (
            <View key={s.label} style={{
              flex: 1,
              backgroundColor: C.surface,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: C.border,
              paddingVertical: 12,
              alignItems: "center",
            }}>
              <Ionicons name={s.icon} size={16} color={s.color} style={{ marginBottom: 4 }} />
              <Text style={{ fontSize: 20, fontWeight: "800", color: s.color }}>{s.num}</Text>
              <Text style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={{
          backgroundColor: C.surface,
          borderRadius: 20,
          padding: 16,
          marginTop: 14,
          borderWidth: 1,
          borderColor: C.border,
        }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <Ionicons name="add-circle" size={16} color={C.accent} />
            <Text style={{ fontSize: 12, color: C.accent, fontWeight: "700", letterSpacing: 0.8 }}>
              Tambah Barang
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 10, marginBottom: 12 }}>
            <TextInput
              label="Nama barang..."
              value={input}
              onChangeText={setInput}
              mode="outlined"
              style={{ flex: 2, backgroundColor: C.bg }}
              outlineColor={C.border}
              activeOutlineColor={C.accent}
              textColor={C.text}
              theme={{ colors: { onSurfaceVariant: C.textMuted } }}
            />
            <TextInput
              label="Qty"
              value={qty}
              onChangeText={setQty}
              keyboardType="numeric"
              mode="outlined"
              style={{ flex: 1, backgroundColor: C.bg }}
              outlineColor={C.border}
              activeOutlineColor={C.accent}
              textColor={C.text}
              theme={{ colors: { onSurfaceVariant: C.textMuted } }}
            />
          </View>

          <TouchableOpacity
            onPress={addItem}
            style={{
              backgroundColor: C.accent,
              borderRadius: 14,
              paddingVertical: 13,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              elevation: 3,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
            }}
          >
            <Ionicons name="cart-outline" size={18} color="#ffffff" />
            <Text style={{ color: "#ffffff", fontWeight: "800", fontSize: 15 }}>Tambah</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
          {(["all", "belum", "dibeli"] as const).map((f) => {
            const meta = {
              all: { icon: "layers-outline", label: "Semua" },
              belum: { icon: "cart-outline", label: "Belum" },
              dibeli: { icon: "checkmark-circle-outline", label: "Dibeli" },
            } as const;
            return (
              <TouchableOpacity
                key={f}
                onPress={() => setFilter(f)}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                  paddingVertical: 10,
                  borderRadius: 12,
                  backgroundColor: filter === f ? C.accent : C.surface,
                  borderWidth: 1,
                  borderColor: filter === f ? C.accent : C.border,
                }}
              >
                <Ionicons name={meta[f].icon} size={13} color={filter === f ? "#ffffff" : C.textMuted} />
                <Text style={{ fontSize: 12, fontWeight: "600", color: filter === f ? "#ffffff" : C.textMuted }}>
                  {meta[f].label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ marginTop: 10, paddingBottom: 32 }}>
          {filtered.length === 0 && (
            <View style={{ alignItems: "center", paddingVertical: 50 }}>
              <Ionicons name="cart-outline" size={52} color={C.border} style={{ marginBottom: 12 }} />
              <Text style={{ fontSize: 17, color: C.textMuted, fontWeight: "600" }}>Daftar belanja kosong</Text>
              <Text style={{ fontSize: 13, color: C.border, marginTop: 6 }}>Tambah barang pertamamu!</Text>
            </View>
          )}

          {filtered.map((item) => (
            <View key={item.id} style={{
              backgroundColor: C.bg,
              borderRadius: 16,
              marginTop: 8,
              borderWidth: 1,
              borderColor: C.border,
              overflow: "hidden",
              opacity: item.bought ? 0.5 : 1,
              elevation: 1,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.06,
              shadowRadius: 4,
            }}>
              <View style={{ flexDirection: "row", alignItems: "center", padding: 14 }}>
                <TouchableOpacity
                  onPress={() => toggleBought(item.id)}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    borderWidth: 2,
                    borderColor: item.bought ? C.accent : C.border,
                    backgroundColor: item.bought ? C.accent : "transparent",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {item.bought && <Ionicons name="checkmark" size={15} color="#ffffff" />}
                </TouchableOpacity>

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{
                    fontSize: 15,
                    color: item.bought ? C.textMuted : C.text,
                    fontWeight: "600",
                    textDecorationLine: item.bought ? "line-through" : "none",
                  }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>
                    {item.qty}x
                  </Text>
                </View>

                <TouchableOpacity onPress={() => openEdit(item)} style={{ padding: 8 }}>
                  <Ionicons name="pencil-outline" size={17} color={C.textMuted} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteItem(item.id)} style={{ padding: 8 }}>
                  <Ionicons name="trash-outline" size={17} color={C.danger} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <Portal>
        <Modal
          visible={editModal}
          onDismiss={() => setEditModal(false)}
          contentContainerStyle={{ margin: 0, justifyContent: "flex-end" }}
        >
          <View style={{
            backgroundColor: C.bg,
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            padding: 24,
            paddingBottom: 40,
            borderWidth: 1,
            borderColor: C.border,
          }}>
            <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: C.border, alignSelf: "center", marginBottom: 20 }} />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Ionicons name="pencil" size={20} color={C.accent} />
              <Text style={{ fontSize: 20, fontWeight: "800", color: C.text }}>Edit Barang</Text>
            </View>

            <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
              <TextInput
                label="Nama barang"
                value={editText}
                onChangeText={setEditText}
                mode="outlined"
                style={{ flex: 2, backgroundColor: C.bg }}
                outlineColor={C.border}
                activeOutlineColor={C.accent}
                textColor={C.text}
                theme={{ colors: { onSurfaceVariant: C.textMuted } }}
              />
              <TextInput
                label="Qty"
                value={editQty}
                onChangeText={setEditQty}
                keyboardType="numeric"
                mode="outlined"
                style={{ flex: 1, backgroundColor: C.bg }}
                outlineColor={C.border}
                activeOutlineColor={C.accent}
                textColor={C.text}
                theme={{ colors: { onSurfaceVariant: C.textMuted } }}
              />
            </View>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                onPress={() => setEditModal(false)}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: C.border,
                  borderRadius: 14,
                  paddingVertical: 14,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <Ionicons name="close-outline" size={18} color={C.textMuted} />
                <Text style={{ color: C.textMuted, fontWeight: "700" }}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={saveEdit}
                style={{
                  flex: 1,
                  backgroundColor: C.accent,
                  borderRadius: 14,
                  paddingVertical: 14,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  elevation: 3,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 6,
                }}
              >
                <Ionicons name="checkmark-outline" size={18} color="#fff" />
                <Text style={{ color: "#fff", fontWeight: "800", fontSize: 15 }}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}