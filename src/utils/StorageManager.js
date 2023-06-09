import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageManager {

    // Prüft ob entries im Storage vorliegen
    // Falls nein, erstelle entries für jedes Datum von heute bis einem Jahr in der Zukunft
    // Falls ja, ergänze bestehende Entries um neue Entries die ein Jahr in der Zukunft liegen
    static async checkAndCreateEntries() {
        try {

            // Aktuelles Datum und Datum in 365 Tagen erstellen
            const currentDate = new Date();
            const futureDate = new Date();
            futureDate.setDate(currentDate.getDate() + 365);

            const entriesExist = await AsyncStorage.getItem('entries');

            if(!entriesExist) {
                // Prüfen ob entries schon im Storage existieren, falls nicht erstell diese
                const dateEntries = [];

                for(let date = currentDate; date <= futureDate; date.setDate(date.getDate() + 1)) {
                    dateEntries.push({ date: date.toLocaleDateString('de-DE'), fluidAmount: 0 });
                }

                if(dateEntries.length > 0) {
                    await AsyncStorage.setItem('entries', JSON.stringify(dateEntries));
                }
            } else {
                // Falls entries existieren, erweitern um neue Dates falls noch nicht vorhanden
                const entries = JSON.parse(entriesExist);
                const existingDates = entries.map(entry => new Date(entry.date));
                const missingDates = [];

                for(let date = currentDate; date <= futureDate; date.setDate(date.getDate() + 1)) {
                    if (!existingDates.some(existingDate => existingDate.toDateString() === date.toDateString())) {
                        missingDates.push({ date: date.toLocaleDateString('de-DE'), fluidAmount: 0 });
                    }
                }

                if(missingDates.length > 0) {
                    const updatedEntries = [...entries, ...missingDates];
                    await AsyncStorage.setItem('entries', JSON.stringify(updatedEntries));
                }
            }
        } catch (error) {
            console.log('Fehler beim Prüfen und Erstellen der Einträge:', error);
        }
    }

    // Returned den FluidAmount aus den Entries für ein Date als Übergabeparameter
    static async getFluidAmount(date) {
        try {
            const entriesExist = await AsyncStorage.getItem('entries');
            if (entriesExist) {
                const entries = JSON.parse(entriesExist);
                const entry = entries.find(e => e.date === date);
                if (entry) {
                    return entry.fluidAmount;
                }
            }

        } catch (error) {
            // Falls kein Eintrag gefunden wird, wird 0 zurückgegeben
            console.log('Fehler beim Abrufen des FluidAmounts:', error);
            return 0;
        }
    }

    // Updated den Wert in Entries für ein bestimmtes Date zu einem bestimmten fluidAmount
    static async setFluidAmount(date, fluidAmount) {
        try {
            const entriesExist = await AsyncStorage.getItem('entries');
            if (entriesExist) {
                const entries = JSON.parse(entriesExist);
                const updatedEntries = entries.map(entry => {
                    if (entry.date === date) {
                        return { ...entry, fluidAmount };
                    }
                    return entry;
                });
                await AsyncStorage.setItem('entries', JSON.stringify(updatedEntries));
            }
        } catch (error) {
            console.log('Fehler beim Aktualisieren des FluidAmounts:', error);
        }
    }

    // // Method for showing all entries, maybe later usable again
    // static async sampleMethodGetStorage() {
    //     try{
    //         const entriesExist = await AsyncStorage.getItem('entries');
    //         console.log(entriesExist);
    //     } catch (error) {
    //         console.log('Fehler:', error);
    //     }
    // }

}

export default StorageManager;