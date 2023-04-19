const bcrypt = require('bcrypt');
const {Op} = require('sequelize')

const InsuaranceCompany = require('../models/InsuranceCompany.model');
const { createToken } = require('../utils/token');
const { add } = require('winston');

module.exports.registerInsuaranceCompany = (req, res)=>{
    const { name, email, phoneNumber, address, password } = req.body;
    
    if(!name && !email && !phoneNumber && !address && !password)
    {
        res.status(400).json({message: 'Please provide all the insuarance company details in order to create the insuarance company account'});
    }
    else
    {
        InsuaranceCompany.findOne({
            where: {
                [Op.or]: [{email}, {phoneNumber}]
            }
        })
        .then((registeredInsuranceCompany)=>{
            if(!registeredInsuranceCompany)
            {
                InsuaranceCompany.create({ name, email, phoneNumber, address, password })
                .then((insuaranceCompany)=>{
                    const jwt = createToken({id: insuaranceCompany.id, isInsuaranceCompany: insuaranceCompany.isInsuaranceCompany});
                    res.status(201).json({message: 'Insuarance company account created successfully', jwt, insuaranceCompany})
                })
                .catch((e)=>{
                    throw e;
                })
            }else
            {
                res.status(400).json({message: 'This email is already registered'})
            }
        })
        .catch((e)=>{
            throw e;
        });
    }
}

module.exports.loginInsuaranceCompany = async(req, res)=>{
    const { email, password } = req.body;

    if(!email)
    {
        res.status(400).json({message: 'Login credentials required'});
    }
    else
    {
        try
        {
            const insuaranceCompany = await InsuaranceCompany.findOne({where: {email}})
            if(!insuaranceCompany)
            {
                res.status(400).json({message: 'Invalid login credentials'})
            }else
            {
                const valid = await bcrypt.compare(password, insuaranceCompany.password);
                if(!valid)
                {
                    res.status(400).json({message: 'Invalid login credentials'})
                }else
                {
                    const jwt = createToken({id: insuaranceCompany.id, isInsuaranceCompany: insuaranceCompany.isInsuaranceCompany})
                    res.status(200).json({message: 'Lgin successful', jwt, insuaranceCompany})
                }
            }
        }
        catch(e){
            throw e;
        }
    }
}

module.exports.getInsuaranceCompanies = (req, res)=>{
    InsuaranceCompany.findAll()
    .then((insuaranceCompanies)=>{
        res.status(200).json({message: 'Fetch successful', insuaranceCompanies});
    })
    .catch((e)=>{
        throw e;
    })
}

module.exports.getInsuaranceCompany = (req, res)=>{
    const id = req.params.id;
    InsuaranceCompany.findByPk(id)
    .then((insuaranceCompany)=>{
        res.status(200).json({message: 'Fetch successful', insuaranceCompany})
    })
    .catch((e)=>{
        throw e;
    })
}

module.exports.updateInsuaranceCompany = (req, res)=>{
    const id = req.params.id;
    InsuaranceCompany.findByPk(id)
    .then((insuaranceCompany)=>{
        insuaranceCompany.update(req.body)
        .then(()=>{
            res.status(200).json({message: 'Insuarance company updated successfully'});
        })
        .catch((e)=>{
            throw e;
        })
    })
    .catch((e)=>{
        throw e;
    })
}

module.exports.deleteInsuaranceCompany = (req, res)=>{
    const id = req.params.id;
    InsuaranceCompany.findByPk(id)
    .then(()=>{
        res.status(200).json({message: 'Insuarance company deleted successfully'});
    })
    .catch((e)=>{
        throw e;
    })
}