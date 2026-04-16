import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useCheckPoints } from "@/hooks/useCheckPoints";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function CheckPoints() {
    const { alunoId, nomeAluno } = useLocalSearchParams<{ alunoId: string; nomeAluno: string }>();
    const { cp1, setCp1, cp2, setCp2, cp3, setCp3, media, salvarNotas, buscarNotas } = useCheckPoints(alunoId);

    useEffect(() => {
        buscarNotas();
    }, []);

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.content}>
                <Text style={styles.alunoNome}>CheckPoints — {nomeAluno}</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Digite CP1"
                    keyboardType="numeric"
                    value={cp1}
                    onChangeText={setCp1}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Digite CP2"
                    keyboardType="numeric"
                    value={cp2}
                    onChangeText={setCp2}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Digite CP3"
                    keyboardType="numeric"
                    value={cp3}
                    onChangeText={setCp3}
                />

                {media !== null && (
                    <Text style={styles.media}>Média: {media.toFixed(2)}</Text>
                )}

                <Button title="Salvar" onPress={salvarNotas} />
            </View>

            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1, padding: 16, gap: 12 },
    alunoNome: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    media: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a73e8',
        textAlign: 'center',
        marginVertical: 8,
    },
});
