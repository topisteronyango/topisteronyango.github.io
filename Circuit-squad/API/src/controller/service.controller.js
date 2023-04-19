const Appointment = require('../models/Appointment.model');
const Doctor = require('../models/Doctor.model');
const Patient = require('../models/Patient.model');
const Service = require('../models/Service.model');

module.exports.createService = (req, res)=>{
    const { name, amount } = req.body;
    const appointmentId = req.params.appointmentId;
    if(!name && !amount)
    {
        res.status(400).json({message: 'Please provide all service details in order to create service resource'})
    }
    else
    {
        Service.create({ name, amount, appointmentId })
        .then((service)=>{
            res.status(201).json({message: 'Service created successfully', service});
        })
        .catch((e)=>{
            throw e;
        })
    }
}

module.exports.getServices = (req, res)=>{
    Service.findAll({
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
        }],
        attributes: ['name', 'amount']
    })
    .then((services)=>{
        res.status(200).json({message: 'Fetch successful', services});
    })
    .catch((e)=>{
        throw e;
    })
}

module.exports.getService = (req, res)=>{
    const id = req.params.id;
    Service.findOne({
        where: {id},
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
        }],
        attributes: ['name', 'amount']
    })
    .then((service)=>{
        res.status(200).json({message: 'Fetch successful', service});
    })
    .catch((e)=>{
        throw e;
    })
}

module.exports.updateService = (req, res)=>{
    const id = req.params.id;
    Service.findByPk(id)
    .then((service)=>{
        service.update(req.body);
        then(()=>{
            res.status(200).json({message: 'Service updated successfully'})
        })
        .catch((e)=>{
            throw e;
        })
    })
    .catch((e)=>{
        throw e;
    })
}

module.exports.deleteService = (req, res)=>{
    const id = req.params.id;
    Service.destroy({where: {id}})
    .then(()=>{
        res.status(200).json({message: 'Service deleted successfully'});
    })
    .catch((e)=>{
        throw e;
    })
}