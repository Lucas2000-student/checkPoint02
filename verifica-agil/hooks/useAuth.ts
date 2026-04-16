import { auth } from "@/services/firebase";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export function useAuth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navegar = useRouter();

    const validarCampos = () => {
        if (!email || !password) {
            alert("Preencha todos os campos!");
            return false;
        }
        return true;
    }

    const login = async () => {
        if (!validarCampos()) return;
        try {
            const credential = await signInWithEmailAndPassword(auth, email, password);
            const token = await credential.user.uid;
            alert(`Usuário logado: ${email}`);
            navegar.push({ pathname: "/pages/login", params: { token } });
        } catch (error) {
            alert('Usuário não logado');
            console.log(error);
        }
    }

    const signUp = async () => {
        if (!validarCampos()) return;
        try {
            const credential = await createUserWithEmailAndPassword(auth, email, password);
            const token = await credential.user.getIdToken();
            alert(`Usuário Cadastrado: ${email}`);
            console.log(token);
        } catch (error) {
            alert('Usuário não Cadastrado');
            console.log(error);
        }
    }

    return { email, setEmail, password, setPassword, login, signUp };
}