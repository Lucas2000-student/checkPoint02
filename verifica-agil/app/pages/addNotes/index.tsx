import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { db } from "@/services/firebase";
import { useLocalSearchParams } from "expo-router";
import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";

export default function AddNotes(){
    const [cp1, setCp1] = useState<number>()
    const [cp2, setCp2] = useState<number>()
    const [cp3, setCp3] = useState<number>()
    const { token } = useLocalSearchParams()

    collection

    const docCp1Ref = doc(db, 'users', String(token), 'scores', 'cp01')
    const docCp2Ref = doc(db, 'users', String(token), 'scores', 'cp02')
    const docCp3Ref = doc(db, 'users', String(token), 'scores', 'cp03')

    const addScore = async () => {
        if(!cp1 || !cp2 || !cp3) { return }
        setDoc(docCp1Ref, {value: cp1 })
        setDoc(docCp2Ref, {value: cp2 })
        setDoc(docCp3Ref, {value: cp3 })
    }

    return(
        <View style={{ flex: 1 }}>
            <Header/>
            <TextInput style={{}} placeholder='Digite nota CP01: ' value={String(cp1 ?? '')} onChangeText={(text) => setCp1(parseFloat(text))}/>
            <TextInput style={{}} placeholder='Digite nota CP02: ' value={String(cp2 ?? '')} onChangeText={(text) => setCp2(parseFloat(text))}/>
            <TextInput style={{}} placeholder='Digite nota CP03: ' value={String(cp3 ?? '')} onChangeText={(text) => setCp3(parseFloat(text))}/>
            <Button title="Salvar" onPress={addScore}/>
            <Footer/>
        </View>
    )
}