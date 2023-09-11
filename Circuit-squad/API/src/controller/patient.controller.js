const bcrypt = require('bcrypt');
const {Op} = require('sequelize')

const Patient = require('../models/Patient.model');
const { createToken } = require('../utils/token');
const Hospital = require('../models/Hospital.model');
const InsuaranceCompany = require('../models/InsuranceCompany.model');

module.exports.registerPatient = (req, res)=>{
    const { 
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        dateOfBirth,
        gender,
        password,
        healthCondtion,
        insuranceMembershipNumber,
     } = req.body;

     if(!firstName && !lastName && !email && !phoneNumber && !address && !dateOfBirth && !gender && !password && !healthCondtion && !insuranceMembershipNumber)
     {
        res.status(400).json({message: 'Please provide all the patient details in order to create patient account'})
     }
     else
     {
        Patient.findOne({
            where: {
                [Op.or]: [{email}, {phoneNumber}]
            }
        })
         .then((registerPatient)=>{
            if(!registerPatient)
            {
                Patient.create({
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    address,
                    dateOfBirth,
                    gender,
                    password,
                    healthCondtion,
                    insuranceMembershipNumber,
                })
                .then((patient)=>{
                    const jwt = createToken({id: patient.id, permissions: patient.isPatient});
                    res.status(201).json({message: 'Patient account created successfully', patient, jwt});
                })
                .catch((e)=>{
                    throw e;
                })
            }else
            {
                res.status(400).json({message: 'This email or phone number is already registered. Please login instead'});
            }
         })
     }
}

module.exports.loginPatient = async (req, res)=>{
    const { email, password } = req.body;
    try
    {
        if(!email )
        {
            res.status(400).json({message: 'Login credentials required'})
        }
        else
        {
            const patient = await Patient.findOne({where: {email}});
            if(!patient)
            {
                res.status(400).json({message: "Invalid login credentials"});
            }else
            {
                const valid = await bcrypt.compare(password, patient.password);
                if(!valid)
                {
                    res.status(400).json({message: "Invalid login credentials"});
                }else
                {
                    const jwt = createToken({id: patient.id, permissions: patient.isPatient});
                    res.status(200).json({message: 'Login successful', jwt, patient});
                }
            }   
        }
    }
    catch(e)
    {
        throw e;
    }
}


module.exports.getPatient = (req, res)=>{
    const id = req.params.id;
    Patient.findOne({
        where: {id},
        include: [
            {
                model: Hospital,
                required: true,
                attributes: ['name', 'email', 'phoneNumber', 'address']
            },
            {
                model: InsuaranceCompany,
                required: true,
                attributes: ['name', 'email', 'phoneNumber', 'address']
            }
        ],
        attributes: ['firstName', 'lastName', 'email', 'phoneNumber', 'address', 'dateOfBirth', 'gender', 'insuranceMembershipNumber', 'healthCondtion']
    })
    .then((patient)=>{
        res.status(200).json({message: 'Fetch successful', patient});
    })
    .catch((e)=>{
        throw e;
    })
}

module.exports.getPatients = (req, res)=>{
    Patient.findAll({
        include: [
            {
                model: Hospital,
                required: true,
                attributes: ['name', 'email', 'phoneNumber', 'address']
            },
            {
                model: InsuaranceCompany,
                required: true,
                attributes: ['name', 'email', 'phoneNumber', 'address']
            }
        ],
        attributes: ['firstName', 'lastName', 'email', 'phoneNumber', 'address', 'dateOfBirth', 'gender', 'insuranceMembershipNumber', 'healthCondtion']
    })
    .then((patients)=>{
        res.status(200).json({message: 'Fetch successful', patients});
    })
    .catch((e)=>{
        throw e;
    })
}

module.exports.assignHopsitalAndInsurance = (req, res)=>{
    const hospitalId = req.params.hospitalId;
    const insuranceCompanyId = req.params.insuranceCompanyId;
    const id = req.params.id;

    Patient.findByPk(id)
    .then((patient)=>{
        patient.update({hospitalId, insuranceCompanyId})
    })
    .catch((e)=>{
        throw e;
    })
}

module.exports.updatePatient = (req, res)=>{
    const id = req.params.id;
    Patient.findOne({
        where: {id},
        include: [
            {
                model: Hospital,
                required: true,
                attributes: ['name', 'email', 'phoneNumber', 'address']
            },
            {
                model: InsuaranceCompany,
                required: true,
                attributes: ['name', 'email', 'phoneNumber', 'address']
            }
        ],
        attributes: ['firstName', 'lastName', 'email', 'phoneNumber', 'address', 'dateOfBirth', 'gender', 'insuranceMembershipNumber', 'healthCondtion']
    })
    .then((patient)=>{
        patient.update(req.body)
        .then(()=>{
            res.status(200).json({message: 'Patient account updated successfully'});
        })
        .catch((e)=>{
            throw e;
        })
    })
    .catch((e)=>{
        throw e;
    })
}

module.exports.deletePatient = (req, res)=>{
    const id = req.params.id;
    Patient.destroy({where: {id}})
    .then(()=>{
        res.status(200).json({message: 'Patient account deleted successfully'});
    })
    .catch((e)=>{
        throw e;
    })
}