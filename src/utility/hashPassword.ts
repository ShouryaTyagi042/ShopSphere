const bcrypt = require("bcrypt")
const saltRounds = 10;
export const hashPassword = async (password: string) => {
    return await bcrypt
        .hash(password, saltRounds)
}
export const checkPass = async (enteredPass: string, actualPass: string) => {
    return await bcrypt.compare(enteredPass, actualPass)
}

