// email validation

const checkEmailValidation = (email) =>{
    let stp = email.split('@')[0] ;

    if(stp.trim()==="" || !email.includes("@gmail.com")){
        // console.log('email is invalid')
        return false
    }else{
        // console.log('email is valid');
        return true
    }
}









export {checkEmailValidation}