export const fields = {
    country: 'address.country',
    state: 'address.state',
    city: 'address.city',
    memberLanguage: 'motherTongue',
    onBehalf: 'registeredBy',
    caste: 'caste',
    subCaste: 'subCaste',
    maritalStatus: 'maritalStatus',
    complexion: 'complexion',
    rashi: 'horoscope.rashi',
    nakshatra: 'horoscope.nakshatra',
    pada: 'horoscope.pada',
    dosham: 'horoscope.dosham',
    higherEducation: 'higherEducation',
    familyValue: 'familyValue',
    familyStatus: 'familyStatus',
    residenceType: 'residenceType',
    professionType: 'profession.professionType',
    designation: 'profession.designation'
}


export const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
};
