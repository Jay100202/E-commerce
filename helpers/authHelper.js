// yaha pe ham do function create karege first vala rahega hash karne ke liye second vala rahega comapre karke decrypt karne ke liye

import bcrypt from 'bcrypt';

export const hashPassword = async(password) =>{
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds) // iske andar hamko kya karna he salt or plain password dono ko pass karana he  
        return hashedPassword
    } catch (error) {
        console.log(error);
    }
};

// aab ham compare karne ke liye ek function banayge

export const comaprePassword = async(password,hashedPassword) =>{
    return bcrypt.compare(password,hashedPassword)
}