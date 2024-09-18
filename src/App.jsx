import { useEffect, useState } from "react";
import PatientCard from "./PatientCard";
import {  } from "./styles/index.scss";
import MyButton from "./UI/MyButton/MyButton"
import MyModal from "./UI/MyModal/MyModal"
import MyInput from "./UI/MyInput/MyInput"
import MySelect from "./UI/MySelect/MySelect"

const App = () => {

  const therapistDatabaseDefault = [
    { id: 0, name: 'Ulyana', surname: 'Loginova', status: 1, dateStart: "2024-09-09", icon: 'https://cdn.discordapp.com/icons/1006938977422557254/7b83f794bd267128251903498b696e08.png'},
    { id: 1, name: 'Alex', surname: 'Smith', status: 0, dateStart: 0, icon: 'https://avt-16.foto.mail.ru/mail/shymatoff/_avatar180?'},
    { id: 2, name: 'Anna', surname: 'Johnson', status: 0, dateStart: 0, icon: 'https://sommera5.ru/wp-content/uploads/2021/01/EuniceBrown-300x300.jpg'},
    { id: 3, name: 'Max', surname: 'Davis', status: 1, dateStart: "2024-09-12", icon: 'https://avt-16.foto.mail.ru/mail/shymatoff/_avatar180?'},
    { id: 4, name: 'Emily', surname: 'Brown', status: 1, dateStart: "2024-09-14", icon: 'https://avt-16.foto.mail.ru/mail/shymatoff/_avatar180?'},
    { id: 5, name: 'Daniel', surname: 'Martinez', status: 1, dateStart: "2024-09-14", icon: 'https://cdn.discordapp.com/icons/1006938977422557254/7b83f794bd267128251903498b696e08.png'},
    { id: 6, name: 'Olivia', surname: 'Garcia', status: 0, dateStart: 0, icon: 'https://cdn.discordapp.com/icons/1006938977422557254/7b83f794bd267128251903498b696e08.png'},
    { id: 7, name: 'William', surname: 'Rodriguez', status: 1, dateStart: "2024-09-20", icon: 'https://avt-16.foto.mail.ru/mail/shymatoff/_avatar180?'},
    { id: 8, name: 'Sophia', surname: 'Lopez', status: 0, dateStart: 0, icon: 'https://sommera5.ru/wp-content/uploads/2021/01/EuniceBrown-300x300.jpg'},
    { id: 9, name: 'Ethan', surname: 'Perez', status: 0, dateStart: 0, icon: 'https://sommera5.ru/wp-content/uploads/2021/01/EuniceBrown-300x300.jpg'}
  ];

  const [therapistDatabase, setTherapistDatabase] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('therapistDatabase') || localStorage.getItem('therapistDatabase').length === 0) {
      setTherapistDatabase(therapistDatabaseDefault);
      localStorage.setItem('therapistDatabase', JSON.stringify(therapistDatabaseDefault));
    }
    else {
      setTherapistDatabase(JSON.parse(localStorage.getItem('therapistDatabase')));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [newPatient, setNewPatient] = useState({name: '', surname: '', status: 0, dateStart: '', icon: ''});
  const [modalNewPatient, setModalNewPatient] = useState(false);

  const [editPatient, setEditPatient] = useState({id: -1, name: '', surname: '', status: 0, dateStart: '', icon: ''});
  const [modalEditPatient, setModalEditPatient] = useState(false);

  const openModalNewPatient = (e) => {
    e.preventDefault();
    setModalNewPatient(true);
  }

  const addNewPatient = (e) => {
    e.preventDefault();
    if (!newPatient.name) return alert('Введите имя нового пациента');
    if (!newPatient.surname) return alert('Введите фамилию нового пациента');
    if (newPatient.status === 1 && !newPatient.dateStart) return alert('Введите дату начала больничного нового пациента');
    const newAddedPatients = [...therapistDatabase, {id: therapistDatabase.length, ...newPatient}];
    setTherapistDatabase(newAddedPatients);
    localStorage.setItem('therapistDatabase', JSON.stringify(newAddedPatients));
    setNewPatient({name: '', surname: '', status: 0, dateStart: '', icon: ''});
    setModalNewPatient(false);
  }

  const editActivePatient = (e) => {
    e.preventDefault();
    if (!editPatient.name) return alert('Введите имя пациента');
    if (!editPatient.surname) return alert('Введите фамилию пациента');
    if (editPatient.status === 1 && !editPatient.dateStart) return alert('Введите дату начала больничного пациента');
    const newPatients = therapistDatabase.map(patient => {
      if (patient.id === editPatient.id) return {...patient,
                                                name: editPatient.name,
                                                surname: editPatient.surname,
                                                status: editPatient.status,
                                                dateStart: editPatient.dateStart,
                                                icon: editPatient.icon};
      else return patient;
    });
    setTherapistDatabase(newPatients);
    localStorage.setItem('therapistDatabase', JSON.stringify(newPatients));
    setEditPatient({id: -1, name: '', surname: '', status: 0, dateStart: '', icon: ''});
    setModalEditPatient(false);
  }

  return (
    <div className="wrapper">
      <MyButton onClick={e => openModalNewPatient(e)}>Добавить пациента</MyButton>

      <ul className="wrapper__list">
        {therapistDatabase.map((patient) => <PatientCard key={patient.id} patient={patient} setEditPatient={setEditPatient} setModalEditPatient={setModalEditPatient} />)}
      </ul>

      <MyModal modalActive={modalNewPatient} setModalActive={setModalNewPatient}>
        <MyInput placeholder='Имя' value={newPatient.name} onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}/>
        <MyInput placeholder='Фамилия' value={newPatient.surname} onChange={(e) => setNewPatient({...newPatient, surname: e.target.value})} />
        <MySelect defaultValue={{value: '0', name: 'Здоровый'}} value={newPatient.status} options={[{value: '1', name: 'Болеет'}]} onChange={(e) => setNewPatient({...newPatient, status: Number(e.target.value)})}></MySelect>
        {newPatient.status 
        ? <MyInput value={newPatient.dateStart} placeholder='Дата открытия больничного' type='date' onChange={(e) => setNewPatient({...newPatient, dateStart: String(e.target.value)})}/>
        : ''}
        <MyInput placeholder='URL фотографии (Не обязательно)' value={newPatient.icon} onChange={(e) => setNewPatient({...newPatient, icon: e.target.value})} />
        <MyButton onClick={(e) => addNewPatient(e)}>Добавить пациента в базу</MyButton>
      </MyModal>

      <MyModal modalActive={modalEditPatient} setModalActive={setModalEditPatient}>
        <MyInput placeholder='Имя' value={editPatient.name} onChange={(e) => setEditPatient({...editPatient, name: e.target.value})}/>
        <MyInput placeholder='Фамилия' value={editPatient.surname} onChange={(e) => setEditPatient({...editPatient, surname: e.target.value})} />
        <MySelect defaultValue={{value: '0', name: 'Здоровый'}} value={editPatient.status} options={[{value: '1', name: 'Болеет'}]} onChange={(e) => setEditPatient({...editPatient, status: Number(e.target.value)})}></MySelect>
        {editPatient.status 
        ? <MyInput value={editPatient.dateStart} placeholder='Дата открытия больничного' type='date' onChange={(e) => setEditPatient({...editPatient, dateStart: String(e.target.value)})}/>
        : ''}
        <MyInput placeholder='URL фотографии (Не обязательно)' value={editPatient.icon} onChange={(e) => setEditPatient({...editPatient, icon: e.target.value})} />
        <MyButton onClick={(e) => editActivePatient(e)}>Добавить пациента в базу</MyButton>
      </MyModal>
    </div>
  );
}

export default App;
