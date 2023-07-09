import { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, TextInput, Text, Pressable, Button, Modal, TouchableHighlight, Platform } from 'react-native'
import { constants } from '../constants/Constants'
import { Modalize } from 'react-native-modalize'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { reminderArray, calendarTypes } from '../constants/CalendarArrays';
import { addEventToCalendar } from '../constants/AddEventCalendar';
import { useToast } from "react-native-toast-notifications";
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function CalendarModalize({ modalizeCalendarRef, item }) {

    const toast = useToast();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [title, setTitle] = useState(`${item.title} premier`)
    const [startTime, setStartTime] = useState('9:00')
    const [endTime, setEndTime] = useState('9:00')
    const [timeType, setTimeType] = useState('start')
    const [reminder, setReminder] = useState(reminderArray[0])
    const [reminderValue, setReminderValue] = useState(reminder.value)
    const [calendarType, setCalendarType] = useState(calendarTypes[0])
    const [calendarTypeValue, setCalendarTypeValue] = useState(calendarType.value)
    const [alarmDialogVisible, setAlarmDialogVisible] = useState(false);
    const [secondModalVisible, setSecondModalVisible] = useState(false);

    const releaseDate = new Date(item.releaseDate)
    const year = releaseDate.getFullYear()
    const month = String(releaseDate.getMonth() + 1).padStart(2, '0')
    const day = String(releaseDate.getDate()).padStart(2, '0')

    const formattedStartDate = `${year}-${month}-${day}T${startTime}:00.000Z`;
    const formattedEndDate = `${year}-${month}-${day}T${endTime}:00.000Z`;




    const showDatePicker = (timeType) => {
        setDatePickerVisibility(true);
        setTimeType(timeType)
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const hour = date.getHours()
        const minute = date.getMinutes().toString().padStart(2, '0')
        const time = `${hour}:${minute}`

        if (timeType === 'start') {
            setStartTime(time)
        } else if (timeType === 'end') {
            setEndTime(time)
        }
        hideDatePicker();


    };


    const handleAlarmOptionSelect = (option) => {

        const selectedReminder = reminderArray.find((item) => item.title === option)

        setReminder(selectedReminder)

        setReminderValue(selectedReminder.value)
        setAlarmDialogVisible(false);
    };


    const handleCalendarTypeSelect = (type) => {

        const selectedType = calendarTypes.find((item) => item.title === type)

        setCalendarType(selectedType)
        setCalendarTypeValue(selectedType.value)
        setSecondModalVisible(false)
    }

    const handleCancel = () => {
        modalizeCalendarRef.current?.close()
        setStartTime('9:00');
        setEndTime('9:00');
        setReminder(reminderArray[0]);
        setReminderValue(reminder.value);
        setCalendarType(calendarTypes[0]);
        setCalendarTypeValue(calendarTypes[0].value);
        setTitle(`${item.title} premier`)
    }


    const handleAddToCalendar = () => {


        if (title.length === 0 && new Date(formattedEndDate) < new Date(formattedStartDate)) {
            toast.show('Kérem ellenőrizze a címet és a dátumokat!', { type: 'warning' });
            return
        } else if (title.length === 0) {
            toast.show('Kérem adjon meg címet!', { type: 'warning' });
            return
        } else if (new Date(formattedEndDate) < new Date(formattedStartDate)) {
            toast.show('Kérem megfelelően adja meg a dátumokat!', { type: 'warning' });
            return
        }

        try {
            addEventToCalendar(title, formattedStartDate, formattedEndDate, reminderValue, calendarTypeValue)
            modalizeCalendarRef.current?.close()
            setStartTime('9:00');
            setEndTime('9:00');
            setReminder(reminderArray[0]);
            setReminderValue(reminder.value);
            setCalendarType(calendarTypes[0]);
            setCalendarTypeValue(calendarTypes[0].value);
            setTitle(`${item.title} premier`)

            toast.show("Sikeres felvétel a naptárba!", { type: 'success' })
        } catch (error) {
            console.error('Failed to add event to calendar:', error);
            toast.show('Hiba történt a naptárba történő felvétel során!', { type: 'danger' })
        }
    }

    return (
        <Modalize
            ref={modalizeCalendarRef}
            modalStyle={{ backgroundColor: '#C0C0C0' }}
            avoidKeyboardLikeIOS={true}
            modalHeight={constants.modalizeCalendarHeight}
            tapGestureEnabled={false}
        >
            <View style={styles.container} >

                <View style={styles.buttonContainer} >

                    {/* <View style={styles.button} >
                        <Button title='Mégsem' color={'red'} onPress={() => handleCancel()} />
                    </View> */}

                    <TouchableWithoutFeedback style={styles.button} onPress={() => handleCancel()} >
                        <Text style={{ color: 'red', fontSize: 18 }} >Mégsem</Text>
                    </TouchableWithoutFeedback>

                    <Text style={styles.title} >Új esemény</Text>

                    <TouchableWithoutFeedback style={styles.button} onPress={() => handleAddToCalendar()} >
                        <Text style={{ color: Platform.OS === 'ios' ? '#007AFF' : '#2196F3', fontSize: 18 }} >Hozzáadás</Text>
                    </TouchableWithoutFeedback>

                    {/* <View style={styles.button}>
                        <Button title='Hozzáadás' onPress={() => handleAddToCalendar()} />
                    </View> */}
                </View>

                <TextInput
                    defaultValue={title}
                    value={title}
                    placeholder={title}
                    onChangeText={setTitle}
                    fontSize={14}
                    style={styles.input}

                />

                <View style={styles.dates}>

                    <View style={styles.textContainer}>
                        <Text style={styles.text} >Kezdete</Text>
                        <View style={{ flexDirection: 'row' }} >
                            <View style={styles.dateContainer}  >
                                <Text style={styles.text} >{item.releaseDate}</Text>
                            </View>

                            <Pressable style={styles.timeContainer} onPress={() => showDatePicker("start")} >
                                <Text style={styles.text} >{startTime}</Text>
                            </Pressable>
                        </View>

                    </View>



                    <View style={styles.textContainer}>
                        <Text style={styles.text} >Vége</Text>
                        <View style={{ flexDirection: 'row' }} >
                            <View style={styles.dateContainer}  >
                                <Text style={styles.text} >{item.releaseDate}</Text>
                            </View>

                            <Pressable style={styles.timeContainer} onPress={() => showDatePicker("end")} >
                                <Text style={styles.text} >{endTime}</Text>
                            </Pressable>
                        </View>

                    </View>


                </View>


                <View style={styles.pickerContainer} >
                    <Text style={styles.pickerTitle} >Jelzés</Text>

                    <Pressable onPress={() => setAlarmDialogVisible(true)} >
                        <Text  >{reminder.title} <Entypo name="select-arrows" size={20} color="#000000" /> </Text>
                    </Pressable>

                </View>

                <View style={styles.pickerContainer} >
                    <Text style={styles.pickerTitle} >Naptár</Text>

                    <Pressable onPress={() => setSecondModalVisible(true)} >
                        <Text  >{calendarType.title} <Entypo name="select-arrows" size={20} color="#000000" /> </Text>
                    </Pressable>

                </View>



            </View>

            <Modal
                visible={alarmDialogVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setAlarmDialogVisible(false)}
            >
                <TouchableHighlight
                    style={styles.overlay}
                    activeOpacity={0.6}
                    underlayColor="transparent"
                    onPress={() => setAlarmDialogVisible(false)}
                >
                    <View style={styles.alarmDialogContainer} >
                        {reminderArray.map((option, index) => {
                            const isSelected = option.title === reminder.title;

                            return (
                                <Pressable
                                    style={[styles.alarmOptionContainer, { flexDirection: 'row' }]}
                                    onPress={() => handleAlarmOptionSelect(option.title)}
                                    key={index}
                                >
                                    <MaterialCommunityIcons
                                        name="check"
                                        size={20}
                                        color={isSelected ? '#000000' : 'transparent'}
                                    />
                                    <Text style={styles.alarmOptionText}>{option.title}</Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </TouchableHighlight>
            </Modal>

            <Modal
                visible={secondModalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setSecondModalVisible(false)}
            >
                <TouchableHighlight
                    style={styles.overlay}
                    activeOpacity={0.6}
                    underlayColor="transparent"
                    onPress={() => setSecondModalVisible(false)}
                >
                    <View style={styles.calendarTypeDialogContainer} >
                        {calendarTypes.map((type, index) => {
                            const isSelected = type.title === calendarType.title;

                            return (
                                <Pressable
                                    style={[styles.alarmOptionContainer, { flexDirection: 'row' }]}
                                    key={index}
                                    onPress={() => handleCalendarTypeSelect(type.title)}

                                >
                                    <MaterialCommunityIcons
                                        name="check"
                                        size={20}
                                        color={isSelected ? '#000000' : 'transparent'}
                                    />
                                    <Text style={styles.alarmOptionText}>{type.title}</Text>

                                </Pressable>
                            )
                        })}

                    </View>
                </TouchableHighlight>
            </Modal>


            <DateTimePickerModal
                locale="hu"
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                confirmTextIOS={'Választ'}
                cancelTextIOS={'Mégsem'}
            />


        </Modalize>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignContent: 'center',
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },

    button: {
        marginHorizontal: 5,
    },

    title: {
        fontSize: 18,
        fontWeight: 700,
    },

    input: {
        height: 40,
        marginHorizontal: 12,
        marginTop: 12,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        fontWeight: '300',
        width: constants.width * 0.8,
        alignSelf: 'center'
    },

    dates: {
        marginTop: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        width: constants.width * 0.8,
        alignSelf: 'center'
    },

    textContainer: {
        height: 40,
        marginHorizontal: 12,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.4,

    },

    text: {
        fontWeight: 500,
    },

    dateContainer: {
        backgroundColor: 'rgba(192,192,192,0.4)',
        padding: 5,
        height: 30,
        borderRadius: 10,
        justifyContent: 'center',
        marginRight: 10,
    },

    timeContainer: {
        backgroundColor: 'rgba(192,192,192,0.4)',
        padding: 5,
        height: 30,
        borderRadius: 10,
        justifyContent: 'center',
    },



    pickerContainer: {
        backgroundColor: '#FFFFFF',
        marginTop: 15,
        borderRadius: 10,
        width: constants.width * 0.8,
        alignSelf: 'center',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',


    },

    pickerTitle: {
        fontWeight: 500,
        marginHorizontal: 12,

    },

    alarmDialogContainer: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        alignSelf: 'center',
        top: '50%',
        transform: [{ translateY: -50 }],
        width: constants.width * 0.60
    },

    calendarTypeDialogContainer: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        alignSelf: 'center',
        top: '70%',
        transform: [{ translateY: -50 }],
        width: constants.width * 0.5
    },


    alarmOptionContainer: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',


    },
    alarmOptionText: {
        fontSize: 16,
        fontWeight: 500,
        marginLeft: 10,
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },

})