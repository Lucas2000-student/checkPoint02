import { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export function useCheckPoints(alunoId: string) {
    const [cp1, setCp1] = useState('');
    const [cp2, setCp2] = useState('');
    const [cp3, setCp3] = useState('');
    const [media, setMedia] = useState<number | null>(null);

    const calcularMedia = (v1: number, v2: number, v3: number) => {
        const menor = Math.min(v1, v2, v3);
        return (v1 + v2 + v3 - menor) / 2;
    };

    const buscarNotas = async () => {
        try {
            const snapshot = await getDoc(doc(db, "users", alunoId));
            if (!snapshot.exists()) return;

            const scores = snapshot.data()?.scores;
            if (!scores) return;

            setCp1(String(scores.cp1 ?? ''));
            setCp2(String(scores.cp2 ?? ''));
            setCp3(String(scores.cp3 ?? ''));
            setMedia(calcularMedia(scores.cp1, scores.cp2, scores.cp3));
        } catch (error) {
            console.error(error);
            alert("Erro ao buscar notas.");
        }
    };

    const salvarNotas = async () => {
        const v1 = parseFloat(cp1);
        const v2 = parseFloat(cp2);
        const v3 = parseFloat(cp3);

        if ([v1, v2, v3].some(v => isNaN(v) || v < 0 || v > 10)) {
            alert("Notas inválidas! Digite valores entre 0 e 10.");
            return;
        }

        try {
            await updateDoc(doc(db, "users", alunoId), {
                scores: { cp1: v1, cp2: v2, cp3: v3 },
            });
            setMedia(calcularMedia(v1, v2, v3));
            alert("Notas salvas com sucesso!");
        } catch (error: any) {
            alert("Erro ao salvar: " + error.message);
        }
    };

    return { cp1, setCp1, cp2, setCp2, cp3, setCp3, media, salvarNotas, buscarNotas };
}