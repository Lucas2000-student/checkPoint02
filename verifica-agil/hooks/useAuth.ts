import { auth, db } from "@/services/firebase";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState } from "react";

export function useAuth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'student' | 'professor'>('student');
    const navegar = useRouter();

    const validarCampos = () => {
        if (!email || !password) {
            alert("Preencha todos os campos!");
            return false;
        }
        return true;
    };

    const login = async () => {
        if (!validarCampos()) return;
        try {
            const credential = await signInWithEmailAndPassword(auth, email, password);
            const uid = credential.user.uid;

            // Busca o role do usuário para saber para onde redirecionar
            const snapshot = await getDoc(doc(db, "users", uid));
            const userRole = snapshot.data()?.role;

            if (userRole === 'professor') {
                navegar.push({ pathname: "/pages/home", params: { token: uid } });
            } else {
                alert("Este app é apenas para professores.");
            }
        } catch (error) {
            alert('Usuário ou senha incorretos.');
        }
    };

    const signUp = async () => {
    if (!validarCampos()) return;
    try {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = credential.user.uid;

        await setDoc(doc(db, "users", uid), {
            name: email,
            role: role,
            scores: { cp1: 0, cp2: 0, cp3: 0 },
        });

        alert(`Conta criada com sucesso! (${role})`);
    } catch (error: any) {
        // Tratamento de erros específicos do Firebase Auth
        switch (error.code) {
            case 'auth/email-already-in-use':
                alert('Este e-mail já está cadastrado.');
                break;
            case 'auth/invalid-email':
                alert('E-mail inválido.');
                break;
            case 'auth/weak-password':
                alert('Senha fraca! Use no mínimo 6 caracteres.');
                break;
            default:
                alert('Não foi possível cadastrar. Tente novamente.');
                console.log(error);
        }
    }
};

    return { email, setEmail, password, setPassword, role, setRole, login, signUp };
}