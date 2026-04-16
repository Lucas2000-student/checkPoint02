import { useRouter } from "expo-router"
import { Button,Text , View, StyleSheet } from "react-native"

export default function Footer() {
    const router = useRouter()

    return (
        <View style={styles.container}>
            <Text style={styles.text}>FIAP - Mobile Application Development</Text>
            <Button title='Voltar' onPress={() => router.back()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 12,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    text: {
        color: '#888',
        fontSize: 12,
    },
});
