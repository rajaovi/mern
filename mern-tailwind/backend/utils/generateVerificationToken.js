export const generateVerificationToken = () => Math.floor(100000 + Math.random() * 900000).toString();
// This function generates a random 6-digit verification code.