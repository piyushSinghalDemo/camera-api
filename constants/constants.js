module.exports.HTTP_200 = 200
module.exports.SUCCESS = 'success'
module.exports.ERROR = 'error'
module.exports.HTTP_401 = 401
module.exports.INVALID_SESSION = 'Unauthorized, login to access this resource.'
module.exports.HTTP_403 = 403
module.exports.INVALID_USER = 'Forbidden, you do not have the required permission for this resource.'
module.exports.HTTP_404 = 404
module.exports.NOT_FOUND = 'Not found.'
//  Global Constants
module.exports.WELCOME_MSG = 'स्वागत हे'
module.exports.VERSION_1 = 'v1'
module.exports.SEPERATOR = '/'
module.exports.ID = ':id'
module.exports.VALID_TOKEN = 'Token is valid.'
module.exports.INVALID_TOKEN = 'Token is not valid.'
module.exports.MISSING_TOKEN = 'Token is not found.'
//  Resource Sepcific Constants
//  user
module.exports.USER_RESOURCE = 'user'
module.exports.USER_CREATED = 'User created.'
module.exports.USER_NOT_FOUND = 'User not found.'
//  auth
module.exports.AUTH_RESOURCE = 'auth'
module.exports.roleArray = ['doctor', 'patient', 'ambulance', 'bloodbank', 'diagnostics-lab', 'hospital', 'pharmacy', 'sales-and-services', 'admin', 'polyclinic']
module.exports.DATE_FORMAT = '%Y-%M-%D';
module.exports.TIME_FORMAT = 'hh:mm A';
module.exports.WEEK_DAYS = {
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
    Saturday: 'Saturday',
    Sunday: 'Sunday'
};
module.exports.CHECK_KEYS_FOR_REGISTRATION = [
    // Tab One : Personal (All)
    'gender',
    // Either one
    'dob', 'estimated_dob',
    // Tab Two : Address  (Patient and Doctor)
    // Tab Three : Qualification and Specialities (Doctor)
    'branch_of_medicine', 'specialities', 'doc_certification_state', 'registry_council_name', 'council_registration_number', 'highest_qulification', 'registration_proof_image_url',
    // Tab Four : Clinic Details (Doctor)
    'do_not_has_clinic'
    // Tab Five : (No Mandatory Fields)
    // Tab Six : (No Mandatory Fields)
];
module.exports.DOCTOR_QUALIFICATIONS = ["M.B.B.S (Bachelor of Medicine/Bachelor of Surgery)", "MD", "MS", "DNB", "MCH", "DM", "B.D.S (Bachelor of Dental Surgery)", "MDS", "B.H.M.S(Homeopathy Medicine)", "D.H.M.S", "B.E.M.S", "D.E.M.S", "L.C.E.H", "B.U.M.S(Unani Medicine) B.A.M.S(Ayurvedic, Siddha Medicine)", "B.S.M.S", "Other"];
module.exports.ROOT_PATH = require('path').resolve(__dirname + '/../');
module.exports.NOTIFICATION_TYPES = [
    'AMBULANCE_DEPLOYED'
];