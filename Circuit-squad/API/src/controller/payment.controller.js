const Appointment = require('../models/Appointment.model');
const Doctor = require('../models/Doctor.model');
const Medication = require('../models/Medication.model');
const Patient = require('../models/Patient.model');
const Payment = require('../models/Payment.model');
const Service = require('../models/Service.model');

module.exports.createServicePayment = (req, res)=>{
    const { paymentMethod, date,  status } = req.body;
    const serviceId = req.params.serviceId;
    if(!paymentMethod && !date && !amount)
    {
        res.status(400).json({message: 'Please provide all payment details in order to create the payment resource'})
    }
    else
    {
        Payment.create({ paymentMethod, date, serviceId, status })
        .then((medication)=>{
            res.status(201).json({message: 'Payment created successfully', medication})
        })
        .catch((e)=>{
            throw e;
        });
    }
}

module.exports.createMedicationPayment = (req, res)=>{
    const { paymentMethod, date,  status } = req.body;
    const medicationId = req.params.medicationId;
    if(!paymentMethod && !date && !amount)
    {
        res.status(400).json({message: 'Please provide all payment details in order to create the payment resource'})
    }
    else
    {
        Payment.create({ paymentMethod, date, medicationId, status })
        .then((medication)=>{
            res.status(201).json({message: 'Payment created successfully', medication})
        })
        .catch((e)=>{
            throw e;
        });
    }
}

module.exports.getAllPayments = (req, res)=>{
    Payment.findAll({
        include: [
            {
                model: Service,
                required: true,
                attributes: ['name', 'amount'],
                include: [{
                    model: Appointment,
                    required: true,
                    attributes: ['date', 'notes', 'status'],
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
                }]
            },
            {
                model: Medication,
                required: true,
                attributes: ['name', 'quantity', 'price', 'prescription'],
                include: [{
                    model: Diagnosis,
                    required: true,
                    attributes: ['diagnosisType', 'glucoseLevel', 'healthCondition', 'bloodPressure', 'bloodCount', 'urineAnalysis', 'bloodGroup']
                }]
            }
        ],
        attributes: ['paymentMethod', 'date', 'amount', 'status']
    })
    .then((payments)=>{
        res.status(200).json({message: 'Fetch successful', payments});
    })
    .catch((e)=>{
        throw e;
    })
}

module.exports.getPayment = (req, res)=>{
    const id = req.params.id;
    Payment.findOne({
        where: {id},
        include: [
            {
                model: Service,
                required: true,
                attributes: ['name', 'amount'],
                include: [{
                    model: Appointment,
                    required: true,
                    attributes: ['date', 'notes', 'status'],
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
                }]
            },
            {
                model: Medication,
                required: true,
                attributes: ['name', 'quantity', 'price', 'prescription'],
                include: [{
                    model: Diagnosis,
                    required: true,
                    attributes: ['diagnosisType', 'glucoseLevel', 'healthCondition', 'bloodPressure', 'bloodCount', 'urineAnalysis', 'bloodGroup']
                }]
            }
        ],
        attributes: ['paymentMethod', 'date', 'amount', 'status']
    })
    .then((payment)=>{
        res.status(200).json({message: 'Fetch successful', payment});
    })
    .catch((e)=>{
        throw e;
    })
}

module.exports.updatePayment = (req, res)=>{
    const id = req.params.id;
    Payment.findByPk(id)
    .then((payment)=>{
        payment.update(req.body)
        .then(()=>{
            res.status(200).json({message: 'Payment updated successfully'})
        })
        .catch((e)=>{
            throw e;
        })
    })
    .catch((e)=>{
        throw e;
    })
}

module.exports.deletePayment = (req, res)=>{
    const id = req.params.id;
    Payment.destroy({where: {id}})
    .then(()=>{
        res.status(200).json({message: 'Payment deleted successfully'});
    })
    .catch((e)=>{
        throw e;
    })
}