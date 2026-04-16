import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
    email: string;
    password: string;
    role: 'student' | 'professor';
    onChangeEmail: (text: string) => void;
    onChangePassword: (text: string) => void;
    onChangeRole: (role: 'student' | 'professor') => void;
    onLogin: () => void;
    onSignUp: () => void;
};

export function AuthForm({ email, password, role, onChangeEmail, onChangePassword, onChangeRole, onLogin, onSignUp }: Props) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Digite seu E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
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

            {/* Seletor de role — só aparece no cadastro */}
            <View style={styles.roleRow}>
                <TouchableOpacity
                    style={[styles.roleBtn, role === 'student' && styles.roleBtnActive]}
                    onPress={() => onChangeRole('student')}
                >
                    <Text style={role === 'student' ? styles.roleTxtActive : styles.roleTxt}>Aluno</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.roleBtn, role === 'professor' && styles.roleBtnActive]}
                    onPress={() => onChangeRole('professor')}
                >
                    <Text style={role === 'professor' ? styles.roleTxtActive : styles.roleTxt}>Professor</Text>
                </TouchableOpacity>
            </View>

            <Button title="Login" onPress={onLogin} />
            <Button title="Cadastrar" onPress={onSignUp} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, gap: 12 },
    input: {
        borderWidth: 1, borderColor: '#ccc',
        borderRadius: 8, padding: 12, fontSize: 16,
    },
    roleRow: { flexDirection: 'row', gap: 8 },
    roleBtn: {
        flex: 1, padding: 10, borderRadius: 8,
        borderWidth: 1, borderColor: '#ccc', alignItems: 'center',
    },
    roleBtnActive: { backgroundColor: '#1a73e8', borderColor: '#1a73e8' },
    roleTxt: { color: '#333' },
    roleTxtActive: { color: '#fff', fontWeight: 'bold' },
});