import { Button, TextInput, View, StyleSheet } from "react-native";

type Props = {
    email: string;
    password: string;
    onChangeEmail: (text: string) => void;
    onChangePassword: (text: string) => void;
    onLogin: () => void;
    onSignUp: () => void;
}

export function AuthForm({ email, password, onChangeEmail, onChangePassword, onLogin, onSignUp }: Props) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Digite seu E-mail"
                onChangeText={onChangeEmail}
                value={email}
            />

            <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                secureTextEntry
                onChangeText={onChangePassword}
                value={password}
            />

            <View style={styles.button}>
                <Button title="Login" onPress={onLogin} />
            </View>

            <View style={styles.button}>
                <Button title="Cadastrar" onPress={onSignUp} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 20,
        gap: 12,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: "#fff",
    },
    button: {
        height: 50,
        justifyContent: "center",
    },
});