import React from "react";

const PatientCard = ({patient, setEditPatient, setModalEditPatient}) => {

    const editPatient = () => {
        setEditPatient({id: patient.id, name: patient.name, surname: patient.surname, status: patient.status, dateStart: patient.dateStart, icon: patient.icon});
        setModalEditPatient(true);
    }

    return(
    <li className="wrapper__item" onClick={editPatient}>
        <div className="wrapper__item__photo">
            <img src={patient.icon ? patient.icon : 'https://www.teplogid.ru/uploads/prod/deb718417fca568fef28e9f147c137c7.jpeg'} alt="patient logo" loading="lazy"/>
        </div>
        <ul className="wrapper__item__list">
            <li className="wrapper__item__item">
                ID пациента: {patient.id}
            </li>
            <li className="wrapper__item__item">
                Имя: {patient.name}
            </li>
            <li className="wrapper__item__item">
                Фамилия: {patient.surname}
            </li>
            <li className="wrapper__item__item">
                Статус: {patient.status 
                ? <span>Болеет</span>
                : "Здоровый"}
            </li>
            {patient.status
            ?   <li className="wrapper__item__item">
                Больничный с: {new Date(patient.dateStart).toLocaleDateString()}
            </li>
            : ""}
            
        </ul>
    </li>)
}

export default PatientCard;