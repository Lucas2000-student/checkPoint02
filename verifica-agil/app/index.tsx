import { AuthForm } from "@/components/AuthForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { View } from "react-native";

export default function Home() {
    const { email, setEmail, password, setPassword, login, signUp } = useAuth();

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <AuthForm
                email={email}
                password={password}
                onChangeEmail={setEmail}
                onChangePassword={setPassword}
                onLogin={login}
                onSignUp={signUp}
            />
            <Footer />
        </View>
    );
}