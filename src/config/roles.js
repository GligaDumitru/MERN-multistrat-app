const ALL_ROLES = {
    user: [],
    admin: ['getUsers', 'manageUsers']
}

const roles = Object.keys(ALL_ROLES);
const roleRights = new Map(Object.entries(ALL_ROLES))

module.exports = {
    roles,
    roleRights,
}