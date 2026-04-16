import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { db } from "@/services/firebase";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";


export default function VerifyNotes(){

    const [average, setAverage] = useState<number>()

    const [cp1, setCp1] = useState<number>()
    const [cp2, setCp2] = useState<number>()
    const [cp3, setCp3] = useState<number>()

    const {token} = useLocalSearchParams()

    const docCp1Ref = doc(db, 'users', String(token), 'scores', 'cp01')
    const docCp2Ref = doc(db, 'users', String(token), 'scores', 'cp02')
    const docCp3Ref = doc(db, 'users', String(token), 'scores', 'cp03')

    const fetchScores = async () => {
        const[doc1, doc2, doc3] = await Promise.all([

        getDoc(docCp1Ref),
        getDoc(docCp2Ref),
        getDoc(docCp3Ref)
        ])

        const value1 = doc1.exists() ? doc1.data().value : undefined
        const value2 = doc2.exists() ? doc2.data().value : undefined
        const value3 = doc3.exists() ? doc3.data().value : undefined

        setCp1(value1)
        setCp2(value2)
        setCp3(value3)

        const scores = [value1, value2, value3]
        const minScore = Math.min(... scores)
        const sum = value1 + value2 + value3 - minScore
        const avg = sum /2

        setAverage(avg)
    }

    useEffect(() => {
        fetchScores()
    }, [])

    return(
        <View style={{ flex: 1 }}>
            <Header/>
             <Text>Cp1: {cp1}</Text>
             <Text>Cp2: {cp2}</Text>
             <Text>Cp3: {cp3}</Text>
             <Text>média: {average}</Text>
            <Footer/>
        </View>
    )
}
