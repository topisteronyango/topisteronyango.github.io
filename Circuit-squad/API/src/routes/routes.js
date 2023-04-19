const express = require('express');
const router = express.Router();

const { requireDoctorAuthorization } = require('../middleware/doctor.authorization.middleware');
const { requireHospitalAuthorization } = require('../middleware/hospital.authorization.middleware');
const { requireMinistryOfHealthAuthorization } = require('../middleware/ministryOfHealth.authorization.middleware');
const { requirePatientAuthorization } = require('../middleware/patient.authorization.middleware');
const { requireHospitalMOHAuthorization } = require('../middleware/hospital.moh.authorization');
const { requireDocHosMOHAuthorization } = require('../middleware/doc.hos.moh.authorization');
const { requireInsuaranceCompanyAuthorization } = require('../middleware/insuaranceCompany.authorization');
const { requireAllAuthorization } = require('../middleware/all.authorization');
const { requireDoctorPatientAuthorization } = require('../middleware/patient.doctor.authorization.middleware')

const { 
        registerDoctor, 
        loginDoctor, 
        getDoctor, 
        getDoctors, 
        updateDoctor,
        assignHospital, 
        deleteDoctor 
    } = require('../controller/doctor.controller');

const { 
        registerHospital, 
        loginHospital, 
        getHospital, 
        getHospitals, 
        assignMinistryOfHealth,
        updateHospital, 
        deleteHospital 
    } = require('../controller/hospital.controller');

const { 
        registerPatient, 
        loginPatient, 
        getPatient, 
        getPatients,
        assignHopsitalAndInsurance, 
        updatePatient, 
        deletePatient 
    } = require('../controller/patient.controller');

const {
        registerMinistryOfHealth,
        loginMinistryOfHealth,
        updateMinistryOfHealth,
        deleteMinistryOfHealth
    } = require('../controller/ministryOfHealth.controller');

const {
        registerInsuaranceCompany,
        loginInsuaranceCompany,
        getInsuaranceCompanies,
        getInsuaranceCompany,
        updateInsuaranceCompany,
        deleteInsuaranceCompany
    } = require('../controller/insuaranceCompany.controller');

const { 
        createAppointment, 
        getAppointments, 
        getAppointmentsByDate,
        getDoctorAppointments,
        getPatientAppointments, 
        updateAppointment, 
        deleteAppointment 
    } = require('../controller/appointment.controller');

const {
        createDiagnosis,
        getADiagnosis,
        getAllDiagnosis,
        getPatientDiagnosis,
        updateDiagnosis,
        deleteDiagnosis
    } = require('../controller/diagnosis.controller');


const {
        createMedication,
        getAllMedications,
        getMedication,
        updateMedication,
        deleteMedication
    } = require('../controller/medication.controller'); 

const {
    createServicePayment,
    createMedicationPayment,
    getAllPayments,
    getPayment,
    updatePayment,
    deletePayment
} = require('../controller/payment.controller');

const {
        createService,
        getService,
        getServices,
        updateService,
        deleteService
    } = require('../controller/service.controller');

// doctor routes
router.post('/doctor/register', registerDoctor);
router.post('/doctor/:id/:hospitalId', requireDoctorAuthorization, assignHospital);
router.post('/doctor/login', loginDoctor);
router.get('/doctor/:id', requireDocHosMOHAuthorization, getDoctor);
router.get('/doctors', requireAllAuthorization, getDoctors);
router.put('/doctor/:id', requireDoctorAuthorization, updateDoctor);
router.delete('/doctor/:id', requireHospitalMOHAuthorization, deleteDoctor);

//hospital routes
router.get('/hospitals', requireAllAuthorization, getHospitals);
router.get('/hospital/:id', requireHospitalMOHAuthorization, getHospital);
router.post('/hospital/register', registerHospital);
router.post('/hospital/:id/:ministryOfHealthId', requireHospitalAuthorization, assignMinistryOfHealth);
router.post('/hospital/login', loginHospital);
router.put('/hospital/:id', requireHospitalAuthorization, updateHospital);
router.delete('/hospital/:id', requireMinistryOfHealthAuthorization, deleteHospital);

//patient routes
router.get('/patients', requireDocHosMOHAuthorization, getPatients);
router.get('/patient/:id', getPatient);
router.post('/patient/register', registerPatient);
router.post('/patient/:id/:hospitalId/:insuranceCompanyId', requirePatientAuthorization, assignHopsitalAndInsurance);
router.post('/patient/login', loginPatient);
router.put('/patient/:id', requirePatientAuthorization, updatePatient);
router.delete('/patient/:id', requireHospitalMOHAuthorization, deletePatient);

//ministry of health routes
router.post('/ministryOfHealth/register', registerMinistryOfHealth);
router.post('/ministryOfHealth/login', loginMinistryOfHealth);
router.put('/ministryOfHealth/:id', requireMinistryOfHealthAuthorization, updateMinistryOfHealth);
router.delete('/ministryOfHealth/:id', requireMinistryOfHealthAuthorization, deleteMinistryOfHealth);

//insuarance company routes
router.get('/insuaranceCompany/:id', requireAllAuthorization, getInsuaranceCompany);
router.get('/insuaranceCompanies', requireAllAuthorization, getInsuaranceCompanies);
router.post('/insuaranceCompany/register', registerInsuaranceCompany);
router.post('/insuaranceCompany/login', loginInsuaranceCompany);
router.put('/insuaranceCompany/:id', requireInsuaranceCompanyAuthorization, updateInsuaranceCompany);
router.delete('/insuaranceCompany/:id', requireMinistryOfHealthAuthorization, deleteInsuaranceCompany);

//appointment routes
router.get('/appointments', requireAllAuthorization, getAppointments);
router.get('/appointments/:date', requireAllAuthorization, getAppointmentsByDate);
router.get('/appointments/doctor/:doctorId', requireDoctorAuthorization, getDoctorAppointments);
router.get('/appointments/patient/:patientId', requirePatientAuthorization, getPatientAppointments);
router.post('/appointment/:doctorId/:patientId', requireDoctorPatientAuthorization, createAppointment);
router.put('/appointment/:id', requireDoctorPatientAuthorization, updateAppointment);
router.delete('/appointment/:id', requireDoctorPatientAuthorization, deleteAppointment);

//diagnosiis routes
router.get('/diagnosis', requireAllAuthorization, getAllDiagnosis);
router.get('/diagnosis/:id', requireAllAuthorization, getADiagnosis);
router.get('/diagnosis/patient/:patientId', requirePatientAuthorization, getPatientDiagnosis);
router.post('/diagnosis/:patientId/:doctorId/:appointmentId', requireDoctorAuthorization, createDiagnosis);
router.put('/diagnosis/:id', requireDocHosMOHAuthorization, updateDiagnosis);
router.delete('/diagnosis/:id', requireHospitalMOHAuthorization, deleteDiagnosis)

//medication routes
router.get('/medications', requireAllAuthorization, getAllMedications);
router.get('/medication/:id', requireAllAuthorization, getMedication);
router.post('/medication/:diagnosisId', requireDoctorAuthorization, createMedication);
router.put('/medication/:id', requireDocHosMOHAuthorization, updateMedication);
router.delete('/medication/:id', requireHospitalMOHAuthorization, deleteMedication);

//payment routes
router.get('/payments', requireAllAuthorization, getAllPayments);
router.get('/payment/:id', requireAllAuthorization, getPayment);
router.post('/payment/:serviceId', requireAllAuthorization, createServicePayment);
router.post('/payment/:medicationId', requireAllAuthorization, createMedicationPayment);
router.put('/payment/:id', requireHospitalMOHAuthorization, updatePayment);
router.delete('/payment/:id', requireHospitalMOHAuthorization, deletePayment);

//services route
router.get('/services', requireAllAuthorization, getServices);
router.get('/service/:id', requireAllAuthorization, getService);
router.post('/service/:appointmentId', requireDoctorPatientAuthorization, createService);
router.put('/service/:id', requireHospitalMOHAuthorization, updateService);
router.delete('/service/:id', requireHospitalMOHAuthorization, deleteService);

module.exports = router;