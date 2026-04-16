import * as Notifications from "expo-notifications";
import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import { Button, SafeAreaView, View } from "react-native";

// Configura como as notificações se comportam quando o app está em foreground
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export default function Layout() {
    const router = useRouter();

    useEffect(() => {
        // Solicita permissão de notificação ao abrir o app
        (async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Necessário aceitar a permissão de notificação.');
            }
        })();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Slot />
            </View>
        </SafeAreaView>
    );
}
