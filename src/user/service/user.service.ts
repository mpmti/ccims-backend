import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '../domain/user';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * Service for the user's domain
 */
@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: MongoRepository<User>,
    ) { }

    /**
     * Creates a new user entry in the database if the user does not already exists.
     * @param user The user which should be added to the database.
     * @returns The user object created in the database.
     * @throws BadRequestException if user already exists.
     */
    async addToUsers(user: User): Promise<User> {
        const number = await this.userRepository.count({ username: user.username });
        if (number > 0) {
            throw new BadRequestException();
        }
        return await this.userRepository.save(user);
    }

    /**
     * Finds the first entity with the given username in the db.
     * @param username The user's name.
     * @returns The user with the given username if exists otherwise undefined.
     */
    async findOne(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({ username: username });
    }

}
