import * as L from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as IntentLauncher from 'expo-intent-launcher'
import * as geolib from 'geolib';
import Constants from 'expo-constants'

export default class Location {
    static getAsync = async () => {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            throw new Exception('Geolocation only in devices not emulators.')
        }

        try {
            let location = null
            const { status: granted } = await Permissions.getAsync(Permissions.LOCATION);
            if (granted === 'granted') {
                location = await L.getCurrentPositionAsync({ accuracy: L.Accuracy.Balanced })
                return { status: granted, location: location, granted: (granted === 'granted') }
            }
            const { status } = await Permissions.askAsync(Permissions.LOCATION)
            if (status === 'granted') {
                location = await L.getCurrentPositionAsync({ accuracy: L.Accuracy.Balanced })
                return { status: status, location: location, granted: (status === 'granted') }
            }
            return { status: status, location: location, granted: (status === 'granted') }
        } catch (e) {
            //alert(e)
            return { status: 'fail' }
        }
        return null
    }
}