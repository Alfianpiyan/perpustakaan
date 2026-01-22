import { useEffect, useState } from "react";
import { Button, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function LocalStorage() {
    const [name, setName] = useState("");
    const [kelas, setKelas] = useState("");
    const [jurusan, setJurusan] = useState("");

    async function saveData() {
        await AsyncStorage.setItem("name", name);
        await AsyncStorage.setItem("kelas", kelas);
        await AsyncStorage.setItem("jurusan",jurusan );
    }
    async function deleteData() {
        await AsyncStorage.removeItem("name");
        await AsyncStorage.removeItem("kelas");
        await AsyncStorage.removeItem("jurusan");
    }
    async function getData() {
       const storedName = await AsyncStorage.getItem("name");
       if (storedName !== null) {
        setName(storedName);
       }
       const storedKelas = await AsyncStorage.getItem("kelas");
       if (storedKelas !== null) {
        setKelas(storedKelas);
       }
       const storedJurusan = await AsyncStorage.getItem("jurusan");
       if (storedJurusan !== null) {
        setJurusan(storedJurusan);
       }
    }

    useEffect (() => {
        getData();
    }, []);

    return(
        <SafeAreaView>
            <Text>Nama :  {name} </Text>
            <TextInput placeholder="Masukan nama" onChangeText={setName}/>
            <Text>kelas :  {kelas} </Text>
            <TextInput placeholder="Masukan kelas" onChangeText={setKelas}/>
            <Text>jurusan :  {jurusan} </Text>
            <TextInput placeholder="Masukan jurusan" onChangeText={setJurusan}/>
            <Button title="Simpan Data" onPress={(saveData)} />
            <Button title="Hapus Data" onPress={(deleteData)} />
            <Button title="Ambil Data" onPress={(getData)} />
            
        </SafeAreaView>
    )
}