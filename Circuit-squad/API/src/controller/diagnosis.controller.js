const Appointment = require('../models/Appointment.model');
const Diagnosis = require('../models/Diagnosis.model');
const Doctor = require('../models/Doctor.model');
const Patient = require('../models/Patient.model');

module.exports.createDiagnosis = (req, res)=>{
    
    const { 
        diagnosisType, 
        result, 
        glucoseLevel, 
        healthCondition, 
        bloodPressure, 
        bloodCount, 
        urineAnalysis, 
        bloodGroup
     } = req.body;
     const patientId = req.params.patientId;
     const doctorId = req.params.doctorId;
     const appointmentId = req.params.appointmentId;

     if(!diagnosisType && !result && !glucoseLevel && !healthCondition && !bloodPressure && !bloodCount && !urineAnalysis && !bloodGroup)
     {
        res.status(400).json({message: 'Please provide all the diagnosis fields needed to create the resource'})
     }
     else
     {
        Diagnosis.create({ 
            diagnosisType, 
            result, 
            glucoseLevel, 
            healthCondition, 
            bloodPressure, 
            bloodCount, 
            urineAnalysis, 
            bloodGroup,
            patientId,
            doctorId,
            appointmentId
         })
         .then((diagnosis)=>{
            res.status(201).json({message: 'Diagnosis created successfully', diagnosis});
         })
         .catch((e)=>{
            throw e;
         })
     }
}

module.exports.getAllDiagnosis = (req, res)=>{
    Diagnosis.findAll({
        include: [
            {
                model: Doctor,
                required: true,
                attributes: ['firstName', 'lastName', 'email', 'phoneNumber', 'address', 'licenseNumber', 'specialization']
            },
            {
                model: Patient,
                required: true,
                attributes: ['firstName', 'lastName', 'email', 'phoneNumber', 'address', 'dateOfBirth', 'gender', 'insuranceMembershipNumber', 'healthCondtion']
            },
            {
                model: Appointment,
                required: true,
                attributes: ['date', 'notes', 'status']
            }
        ],
        attributes: ['diagnosisType', 'glucoseLevel', 'healthCondition', 'bloodPressure', 'bloodCount', 'urineAnalysis', 'bloodGroup']
    })
    .then((diagnosis)=>{
        res.status(200).json({message: 'Fetch successful', diagnosis});
    })
    .catch((e)=>{
        throw e;
    })
}

module.exports.getADiagnosis = (req, res)=>{
    const id = req.params.id;
    Diagnosis.findOne({
        where: {id},
        include: [
            {
                model: Doctor,
                required: true,
                attributes: ['firstName', 'lastName', 'email', 'phoneNumber', 'address', 'licenseNumber', 'specialization']
            },
            {
                model: Patient,
                required: true,
                attributes: ['firstName', 'lastName', 'email', 'phoneNumber', 'address', 'dateOfBirth', 'gender', 'insuranceMembershipNumber', 'healthCondtion']
            },
            {
                model: Appointment,
                required: true,
                attributes: ['date', 'notes', 'status']
            }
        ],
        attributes: ['diagnosisType', 'glucoseLevel', 'healthCondition', 'bloodPressure', 'bloodCount', 'urineAnalysis', 'bloodGroup']
    })
    .then((diagnosis)=>{
        res.status(200).json({message: 'Fetch successful', diagnosis});
    })
    .catch((e)=>{
        throw e;
    })
}

module.exports.getPatientDiagnosis = (req, res)=>{
    const patientId = req.params.patientId;
    Diagnosis.findOne({
        where: {patientId},
        include: [
            {
                model: Doctor,
                required: true,
                attributes: ['firstName', 'lastName', 'email', 'phoneNumber', 'address', 'licenseNumber', 'specialization']
            },
            {
                model: Appointment,
                required: true,
                attributes: ['date', 'notes', 'status']
            }
        ],
        attributes: ['diagnosisType', 'glucoseLevel', 'healthCondition', 'bloodPressure', 'bloodCount', 'urineAnalysis', 'bloodGroup']
    })
    .then((diagnosis)=>{
        res.status(200).json({message: 'Fetch successful', diagnosis});
    })
    .catch((e)=>{
        throw e;
    })
}

module.exports.updateDiagnosis = (req, res)=>{
    const id = req.params.id;
    Diagnosis.findByPk(id)
    .then((diagnosis)=>[
        diagnosis.update(req.body)
        .then(()=>[
            res.status(200).json({message: 'Diagnosis updated successfully'})
        ])
        .catch((e)=>{
            throw e;
        })
    ])
    .catch((e)=>{
        throw e;
    });
}

module.exports.deleteDiagnosis = (req, res)=>{
    const id = req.params.id;
    Diagnosis.destroy({where: {id}})
    .then(()=>{
        res.status(200).json({message: 'Diagnosis deleted successfully'});
    })
    .catch((e)=>{
        throw e;
    })
}