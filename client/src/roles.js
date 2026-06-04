export const ROLE = {
    ADMIN: "admin",
    OPTICIAN: "optician",
    USER: "user",
};

export const PERMISSIONS = {
    VIEW_PATIENTS: [ROLE.ADMIN, ROLE.OPTICIAN, ROLE.USER],
    EDIT_PATIENTS: [ROLE.ADMIN, ROLE.OPTICIAN],
    DELETE_PATIENTS: [ROLE.ADMIN],

    VIEW_RX: [ROLE.ADMIN, ROLE.OPTICIAN, ROLE.USER],
    EDIT_RX: [ROLE.ADMIN, ROLE.OPTICIAN],

    VIEW_FRAMES: [ROLE.ADMIN, ROLE.OPTICIAN, ROLE.USER],
    EDIT_FRAMES: [ROLE.ADMIN],

    VIEW_LENSES: [ROLE.ADMIN, ROLE.OPTICIAN, ROLE.USER],
    EDIT_LENSES: [ROLE.ADMIN],

    VIEW_TREATMENTS: [ROLE.ADMIN, ROLE.OPTICIAN, ROLE.USER],
    EDIT_TREATMENTS: [ROLE.ADMIN],
};

//helper function to check if a user has a specific permission
export function can(user, permission) {
    if (!user) return false;
    return PERMISSIONS[permission]?.includes(user.role);
}
