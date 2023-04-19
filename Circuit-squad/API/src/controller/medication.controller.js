const Diagnosis = require('../models/Diagnosis.model');
const Doctor = require('../models/Doctor.model');
const Medication = require('../models/Medication.model');
const Patient = require('../models/Patient.model');

module.exports.createMedication = (req ,res)=>{
    const { price, quantity, name, prescription } = req.body;
    const diagnosisId = req.params.diagnosisId;
    if(!price && !quantity && !name && !prescription)
    {
        res.status(400).json({message: 'Please provide all the medication details in order to create the medication resource'})
    }
    else
    {
        Medication.create({ price, quantity, name, prescription, diagnosisId })
        .then((medication)=>{
            res.status(201).json({message: 'Medication created successfully', medication});
        })
        .catch((e)=>{
            throw e;
        });
    }
}

module.exports.getAllMedications = (req, res)=>{
    Medication.findAll({
        include: [{
            model: Diagnosis,
            required: true,
            attributes: ['diagnosisType', 'glucoseLevel', 'healthCondition', 'bloodPressure', 'bloodCount', 'urineAnalysis', 'bloodGroup'],
            include: [
                {
                    model: Patient,
                    required: true,
                    attributes: ['firstName', 'lastName', 'email', 'phoneNumber', 'address', 'dateOfBirth', 'gender', 'insuranceMembershipNumber', 'healthCondtion']
                },
                {
                    model: Doctor,
                    required: true,
                    attributes: ['firstName', 'lastName', 'email', 'phoneNumber', 'address', 'licenseNumber', 'specialization']
                }
        ]
        }],
        attributes: ['name', 'quantity', 'price', 'prescription']
    })
    .then((medications)=>{
        res.status(200).json({message: 'Fetch successful', medications})
    })
    .catch((e)=>{
        throw e;
    })
}

module.exports.getMedication = (req, res)=>{
    const id = req.params.id;
    Medication.findOne({
        where: {id},
        include: [{
            model: Diagnosis,
            required: true,
            attributes: ['diagnosisType', 'glucoseLevel', 'healthCondition', 'bloodPressure', 'bloodCount', 'urineAnalysis', 'bloodGroup'],
            include: [
                {
                    model: Patient,
                    required: true,
                    attributes: ['firstName', 'lastName', 'email', 'phoneNumber', 'address', 'dateOfBirth', 'gender', 'insuranceMembershipNumber', 'healthCondtion']
                },
                {
                    model: Doctor,
                    required: true,
                    attributes: ['firstName', 'lastName', 'email', 'phoneNumber', 'address', 'licenseNumber', 'specialization']
                }
        ]
        }],
        attributes: ['name', 'quantity', 'price', 'prescription']
    })
    .then((medication)=>{
        res.status(200).json({message: 'Fetch successful', medication})
    })
    .catch((e)=>{
        throw e;
    })
}

module.exports.updateMedication = (req, res)=>{
    const id = req.params.id;
    Medication.findByPk(id)
    .then((medication)=>{
        medication.update(req.body)
        .then(()=>{
            res.status(200).json({message: 'Medication updated successfully'})
        })
        .catch((e)=>{
            throw e;
        })
    })
    .catch((e)=>{
        throw e;
    })
}

module.exports.deleteMedication = (req, res)=>{
    const id = req.params.id;
    Medication.destroy({where: {id}})
    .then(()=>{
        res.status(200).json({message: 'Medication deleted successfully'});
    })
    .catch((e)=>{
        throw e;
    })
}