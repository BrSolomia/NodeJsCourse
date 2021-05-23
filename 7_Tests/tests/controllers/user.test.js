import { getUsers, 
    getAutoSuggestUsers, 
    getUserById, 
    createUser, 
    updateUserById, 
    deleteUserById, 
    getUserGroups, 
    createUserGroup } from "../../controllers/user.controller";
import { UserSevice } from "../../services";
import { userMock, UsersListMock, invalidUserMock, groupsMock } from "../fixtures";

describe('7_Tests/controllers/user.controller.js', () => {
    let resMock;
    let reqMock;
    let statusMock;
    let sendMock;
    let jsonMock;
    let endMock;

    let getActualUsersMock;
    let autoSuggestUsersMock;
    let getUserByIdMock;
    let createUserMock;
    let updateUserMock;
    let deleteUserMock;
    let getUserGroupsMock;
    let addUsersToGroupMock;

    beforeAll(() => {
        jest.mock('../../services')
        reqMock = jest.fn();
        sendMock = jest.fn();
        statusMock = jest.fn();
        jsonMock = jest.fn();
        resMock = {
            status: statusMock,
            end: endMock,
            send: sendMock,
            json: jsonMock
        };

        getActualUsersMock = jest.fn();
        autoSuggestUsersMock = jest.fn();
        getUserByIdMock = jest.fn();
        createUserMock = jest.fn();
        updateUserMock = jest.fn();
        deleteUserMock = jest.fn();
        getUserGroupsMock = jest.fn();
        addUsersToGroupMock = jest.fn();

        UserSevice.getActualUsers = getActualUsersMock;
        UserSevice.autoSuggestUsers = autoSuggestUsersMock;
        UserSevice.getUserById = getUserByIdMock;
        UserSevice.createUser = createUserMock;
        UserSevice.updateUser = updateUserMock;
        UserSevice.deleteUser = deleteUserMock;
        UserSevice.getUserGroups = getUserGroupsMock;
        UserSevice.addUsersToGroup = addUsersToGroupMock;
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('# getUsers', () => {
        test('should return users', () => {
            getActualUsersMock.mockReturnValue(UsersListMock);
            getUsers(reqMock, resMock);

            expect(getActualUsersMock).toHaveBeenCalledTimes(1);
            expect(sendMock).toHaveBeenCalledTimes(1);
            expect(sendMock).toHaveBeenCalledWith(UsersListMock);
        });

        test('should return error', () => {
            getActualUsersMock.mockImplementation(() => {
                throw new Error;
            });
            getUsers(reqMock, resMock);

            expect(getActualUsersMock).toHaveBeenCalledTimes(1);
            expect(statusMock).toHaveBeenCalledWith(500);
        })
    });

    describe('# getUsers', () => {
        test('should return users', () => {
            getActualUsersMock.mockReturnValue(UsersListMock);
            getUsers(reqMock, resMock);

            expect(getActualUsersMock).toHaveBeenCalledTimes(1);
            expect(sendMock).toHaveBeenCalledTimes(1);
            expect(sendMock).toHaveBeenCalledWith(UsersListMock);
        });

        test('should return error', () => {
            getActualUsersMock.mockImplementation(() => {
                throw new Error;
            });
            getUsers(reqMock, resMock);

            expect(getActualUsersMock).toHaveBeenCalledTimes(1);
            expect(statusMock).toHaveBeenCalledWith(500);
        })
    });

    describe('# getAutoSuggestUsers', () => {
        test('should return autosuggested users', () => {
            const reqMock = {
                body: {
                    "loginSubstring": "log",
                    "limit": 4
                }
            }

            autoSuggestUsersMock.mockReturnValue(UsersListMock);
            getAutoSuggestUsers(reqMock, resMock);

            expect(autoSuggestUsersMock).toHaveBeenCalledTimes(1);
            expect(sendMock).toHaveBeenCalledTimes(1);
            expect(sendMock).toHaveBeenCalledWith(UsersListMock);
        });

        test('should return error', () => {
            const reqMock = {
                body: {
                    "loginSubstring": "log",
                    "limit": 4
                }
            }
            autoSuggestUsersMock.mockImplementation(() => {
                throw new Error;
            });
            getAutoSuggestUsers(reqMock, resMock);

            expect(autoSuggestUsersMock).toHaveBeenCalledTimes(1);
            expect(statusMock).toHaveBeenCalledWith(500);
        })
    });

    describe('# getUserById', () => {
        const reqMock = {
            params: {
                id: 'id1'
            }
        }

        test('should return user by id', () => {
            
            getUserByIdMock.mockReturnValue(userMock);
            getUserById(reqMock, resMock);

            expect(getUserByIdMock).toHaveBeenCalledTimes(1);
            expect(sendMock).toHaveBeenCalledTimes(1);
            expect(sendMock).toHaveBeenCalledWith(userMock);
        });

        test('should return error', () => {
            getUserByIdMock.mockImplementation(() => {
                throw new Error;
            });
            getUserById(reqMock, resMock);

            expect(getUserByIdMock).toHaveBeenCalledTimes(1);
            expect(statusMock).toHaveBeenCalledWith(500);
        })
    });

    describe('# createUser', () => {
        const reqMock = {
            body: {
                userMock
            }
        }

        test('should created user', () => {
            createUserMock.mockReturnValue(userMock);
            createUser(reqMock, resMock);

            expect(createUserMock).toHaveBeenCalledTimes(1);
            expect(sendMock).toHaveBeenCalledTimes(2);
            expect(sendMock).toHaveBeenCalledWith(userMock);
        });

        test('should return error', () => {
            createUserMock.mockImplementation(() => {
                throw new Error;
            });
            createUser(reqMock, resMock);

            expect(createUserMock).toHaveBeenCalledTimes(1);
            expect(statusMock).toHaveBeenCalledWith(500);
        });

        test('should return validation error', () => {
            const reqMock = {
                body: {
                    invalidUserMock
                }
            }

            createUser(reqMock, resMock);

            expect(createUserMock).toHaveBeenCalledTimes(1);
            expect(statusMock).toHaveBeenCalledWith(500);
        })
    });

    describe('# updateUserById', () => {
        const reqMock = {
            body: {
                userMock
            },
            params: {
                id: 'id1'
            }
        }

        test('should created user', () => {
            updateUserMock.mockReturnValue(userMock);
            updateUserById(reqMock, resMock);

            expect(updateUserMock).toHaveBeenCalledTimes(1);
            expect(sendMock).toHaveBeenCalledTimes(2);
            expect(sendMock).toHaveBeenCalledWith(userMock);
        });

        test('should return error', () => {
            updateUserMock.mockImplementation(() => {
                throw new Error;
            });
            updateUserById(reqMock, resMock);

            expect(updateUserMock).toHaveBeenCalledTimes(1);
            expect(statusMock).toHaveBeenCalledWith(500);
        });

        test('should return validation error', () => {
            const reqMock = {
                body: {
                    invalidUserMock
                }
            }

            updateUserById(reqMock, resMock);

            expect(updateUserMock).toHaveBeenCalledTimes(0);
            expect(statusMock).toHaveBeenCalledWith(500);
        });
    });

    describe('# deleteUserById', () => {
        const reqMock = {
            params: {
                id: 'id1'
            }
        }

        test('should created user', () => {
            deleteUserMock.mockReturnValue(userMock);
            deleteUserById(reqMock, resMock);

            expect(deleteUserMock).toHaveBeenCalledTimes(1);
            expect(jsonMock).toHaveBeenCalledTimes(1);
            expect(jsonMock).toHaveBeenCalledWith("Group deleted");
        });

        test('should return error', () => {
            deleteUserMock.mockImplementation(() => {
                throw new Error;
            });
            deleteUserById(reqMock, resMock);

            expect(deleteUserMock).toHaveBeenCalledTimes(1);
            expect(statusMock).toHaveBeenCalledWith(500);
        });
    });

    describe('# getUserGroups', () => {
        test('should created user', () => {
            getUserGroupsMock.mockReturnValue(groupsMock);
            getUserGroups(reqMock, resMock);

            expect(getUserGroupsMock).toHaveBeenCalledTimes(1);
        });

        test('should return error', () => {
            getUserGroupsMock.mockImplementation(() => {
                throw new Error;
            });
            getUserGroups(reqMock, resMock);

            expect(getUserGroupsMock).toHaveBeenCalledTimes(1);
            expect(statusMock).toHaveBeenCalledWith(500);
        });
    });

    describe('# createUserGroup', () => {
        const reqMock = {
            body: {
                "groupId":"group4", 
                "userIds":["id2"]
            }
        }

        test('should created user', () => {
            addUsersToGroupMock.mockReturnValue(groupsMock);
            createUserGroup(reqMock, resMock);

            expect(addUsersToGroupMock).toHaveBeenCalledTimes(1);
        });

        test('should return error', () => {
            addUsersToGroupMock.mockImplementation(() => {
                throw new Error;
            });
            createUserGroup(reqMock, resMock);

            expect(addUsersToGroupMock).toHaveBeenCalledTimes(1);
            expect(statusMock).toHaveBeenCalledWith(500);
        });

        test('should return validation error', () => {
            const reqMock = {
                body: {}
            }

            updateUserById(reqMock, resMock);

            expect(updateUserMock).toHaveBeenCalledTimes(0);
            expect(statusMock).toHaveBeenCalledWith(500);
        })
    });
})