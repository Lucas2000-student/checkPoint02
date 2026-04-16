import { db } from "@/services/firebase";
import * as Notifications from "expo-notifications";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export type Aluno = {
    id: string;
    nome: string;
};

export function useAlunos(token: string) {
    const [alunos, setAlunos] = useState<Aluno[]>([]);

    useEffect(() => {
        if (!token) return;

        const q = query(
            collection(db, "users"),
            where("role", "==", "student")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const lista: Aluno[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                nome: doc.data().name,
            }));
            setAlunos(lista);
        });

        return () => unsubscribe();
    }, [token]);

    return { alunos };
}