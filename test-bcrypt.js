import bcrypt from 'bcryptjs';

const senha = '123.Abc';
const hash = bcrypt.hashSync(senha, 10);
console.log(hash);
