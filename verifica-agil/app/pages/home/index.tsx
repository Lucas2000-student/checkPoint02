import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useAlunos } from "@/hooks/useAlunos";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomePage() {
    const { token } = useLocalSearchParams<{ token: string }>();
    const { alunos } = useAlunos(token);
    const navegar = useRouter();

    const confirmarRemocao = (alunoId: string, nomeAluno: string) => {
        Alert.alert(
            'Remover Aluno',
            `Tem certeza que deseja remover ${nomeAluno}?`,
            [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', style: 'destructive', onPress: () => alert('Funcionalidade não disponível.') },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.content}>
                <FlatList
                    data={alunos}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={<Text style={styles.empty}>Nenhum aluno cadastrado.</Text>}
                    renderItem={({ item }) => (
                        <View style={styles.alunoRow}>
                            <TouchableOpacity
                                style={styles.alunoNome}
                                onPress={() =>
                                    navegar.push({
                                        pathname: '/pages/checkPoints',
                                        params: { alunoId: item.id, nomeAluno: item.nome },
                                    })
                                }
                            >
                                <Text style={styles.alunoText}>{item.nome}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => confirmarRemocao(item.id, item.nome)}>
                                <Text style={styles.btnRemover}>X</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>

            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1, padding: 16, gap: 12 },
    empty: { textAlign: 'center', color: '#aaa', marginTop: 32 },
    alunoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        backgroundColor: '#fff',
    },
    alunoNome: { flex: 1 },
    alunoText: { fontSize: 16 },
    btnRemover: {
        color: '#e53935',
        fontWeight: 'bold',
        fontSize: 16,
        paddingHorizontal: 8,
    },
});