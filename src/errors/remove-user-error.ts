export class RemoveUserError extends Error {
    public readonly name = 'RemoveUserError'

    constructor() {
        super('User can not remove.')
    }
}