export const calculateAge =(dob)=>{
    const birthDate=new Date(dob);
    const today=new Date();
    
    let age=today.getFullYear()-birthDate.getFullYear();
    let m=today.getMonth()-birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--; // not yet had birthday this year
    }
    return age;
  }
  