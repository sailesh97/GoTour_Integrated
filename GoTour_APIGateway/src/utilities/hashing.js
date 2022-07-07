import bcrypt from 'bcrypt'
import { logger } from './logger';

require('dotenv').config()

export const SALT_ROUNDS = +process.env.SALT_ROUNDS;

// bcrypt works
export async function hash(password) {
    logger.info(`Password hashing started at ${new Date()}`)
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}
