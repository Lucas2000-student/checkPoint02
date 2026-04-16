import Footer from "@/components/Footer";
import Header from "@/components/Header";
import * as Notifications from "expo-notifications";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Button, Linking, View } from "react-native";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true             
    })
})


export default function Login(){
    const navegar = useRouter();
    const { token } = useLocalSearchParams();

        const requestPermission = async () => {
        const { status } = await Notifications.requestPermissionsAsync()
        if (status !== 'granted') alert('Necessário aceitar a permissão de notificação.')
    }

    const scheduleNotification = () => {
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'Ola teste',
                body: 'Testando',
                data: {
                    url: 'https://google.com'
                }
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: 1
            }
        })
    }

    const handleUrl = (url: string) => {
        Linking.openURL(url)
    }
    
    useEffect(() => {
       requestPermission() 

        Notifications.addNotificationResponseReceivedListener(response => {
            const data = response.notification.request.content.data
            if (data && data.url && typeof data.url === 'string') handleUrl(data.url)
        })
    }, [])

    return(
        <View style={{ flex: 1 }}>
            <Header/>
            <Button title="Adicionar notas" onPress={() => navegar.push({pathname: "/pages/addNotes", params: { token }})}/>
            <Button title="Verificar Notas" onPress={() => navegar.push({pathname: "/pages/verifyNotes", params: { token }})}/>
            <Footer/>
        </View>
    )
}