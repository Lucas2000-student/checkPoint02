import { StyleSheet, Text, View } from "react-native";

export default function Header() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verifica Ágil</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a73e8',
        paddingVertical: 16,
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
