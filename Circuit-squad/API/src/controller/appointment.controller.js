const Appointment = require('../models/Appointment.model');
const Doctor = require('../models/Doctor.model');
const Patient = require('../models/Patient.model');


module.exports.createAppointment = (req, res)=>{
    
    const doctorId = req.params.doctorId;
    const patientId = req.params.patientId;
    const { date, notes, status } = req.body;

    if(!date && !notes && !status)
    {
        res.status(400).json({message: 'Please provide the appointment fields needed to create the resource.'})
    }else
    {
        Appointment.create({ date, notes, status, doctorId, patientId })
        .then((appointment)=>{
            res.status(201).json({message: 'Appointment created successfully', appointment});
        })
        .catch((e)=>{
            throw e;
        })
    }
}

module.exports.getAppointments = (req, res)=>{
    Appointment.findAll({
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
        ],
        attributes: ['date', 'notes', 'status']
    })
    .then((appointments)=>{
        res.status(200).json({message: 'Fetch successful', appointments});
    })
    .catch((e)=>{
        throw e;
    })
}


module.exports.getAppointmentsByDate = (req, res)=>{
    const date = req.params.date;
    Appointment.findAll({where: {date}})
    .then((appointments)=>{
        res.status(200).json({message: 'Fetch successful', appointments});
    })
    .catch((e)=>{
        throw e;
    })
}

module.exports.getDoctorAppointments = (req, res)=>{
    const doctorId = req.params.doctorId;
    Appointment.findAll({
        where: {doctorId},
        include: [
            {
                model: Patient,
                required: true,
                attributes: ['firstName', 'lastName', 'email', 'phoneNumber', 'address', 'dateOfBirth', 'gender', 'insuranceMembershipNumber', 'healthCondtion']
            }
        ],
        attributes: ['date', 'notes', 'status']
    })
    .then((appointments)=>{
        res.status(200).json({message: 'Fetch successful', appointments});
    })
    .catch((e)=>{
        throw e;
    });
}

module.exports.getPatientAppointments = (req, res)=>{
    const patientId = req.params.patientId;
    Appointment.findAll({
        where: {patientId},
        include: [ 
            {
                model: Doctor,
                required: true,
                attributes: ['firstName', 'lastName', 'email', 'phoneNumber', 'address', 'licenseNumber', 'specialization']
            }
        ],
        attributes: ['date', 'notes', 'status']
    })
    .then((appointments)=>{
        res.status(200).json({message: 'Fetch successful', appointments});
    })
    .catch((e)=>{
        throw e;
    });
}

module.exports.updateAppointment = (req, res)=>{
    const id = req.params.id;
    Appointment.findByPk(id)
    .then((appointment)=>{
        appointment.update(req.body)
        .then(()=>{
            res.status(200).json({message: 'Appointment updated successfully'});
        })
        .catch((e)=>{
            throw e;
        })
    })
    .catch((e)=>{
        throw e;
    })
}

module.exports.deleteAppointment = (req, res)=>{
    const id = req.params.id;
    Appointment.destroy({where: {id}})
    .then(()=>{
        res.status(200).json({message: 'Appoint deleted successfully'});
    })
    .catch((e)=>{
        throw e;
    })
}