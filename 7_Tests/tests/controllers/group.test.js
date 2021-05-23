import { getGroups, 
    getGroupById, 
    createGroup, 
    updateGroupById, 
    deleteGroupById } from "../../controllers/group.controller";
import { GroupService } from "../../services";
import { groupMock, groupsMock, invalidGroupMock } from "../fixtures";

describe('7_Tests/controllers/group.controller.js', () => {
    let resMock;
    let reqMock;
    let statusMock;
    let sendMock;
    let jsonMock;
    let endMock;

    let getGroupsMock;
    let getGroupByIdMock;
    let createGroupMock;
    let updateGroupByIdMock;
    let deleteGroupMock;

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

        getGroupsMock = jest.fn();
        getGroupByIdMock = jest.fn();
        createGroupMock = jest.fn();
        updateGroupByIdMock = jest.fn();
        deleteGroupMock = jest.fn();

        GroupService.getGroups = getGroupsMock;
        GroupService.getGroupById = getGroupByIdMock;
        GroupService.createGroup = createGroupMock;
        GroupService.updateGroupById = updateGroupByIdMock;
        GroupService.deleteGroup = deleteGroupMock;
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('# getGroups', () => {
        test('should return users', () => {
            getGroupsMock.mockReturnValue(groupsMock);
            getGroups(reqMock, resMock);

            expect(getGroupsMock).toHaveBeenCalledTimes(1);
            expect(sendMock).toHaveBeenCalledTimes(1);
            expect(sendMock).toHaveBeenCalledWith(groupsMock);
        });

        test('should return error', () => {
            getGroupsMock.mockImplementation(() => {
                throw new Error;
            });
            getGroups(reqMock, resMock);

            expect(getGroupsMock).toHaveBeenCalledTimes(1);
            expect(statusMock).toHaveBeenCalledWith(500);
        })
    });

    describe('# getGroupById', () => {
        const reqMock = {
            params: {
                id: 'group1'
            }
        }

        test('should return user by id', () => {
            
            getGroupByIdMock.mockReturnValue(groupMock);
            getGroupById(reqMock, resMock);

            expect(getGroupByIdMock).toHaveBeenCalledTimes(1);
            expect(sendMock).toHaveBeenCalledTimes(1);
            expect(sendMock).toHaveBeenCalledWith(groupMock);
        });

        test('should return error', () => {
            getGroupByIdMock.mockImplementation(() => {
                throw new Error;
            });
            getGroupById(reqMock, resMock);

            expect(getGroupByIdMock).toHaveBeenCalledTimes(1);
            expect(statusMock).toHaveBeenCalledWith(500);
        })
    });

    describe('# createGroup', () => {
        const reqMock = {
            body: {
                groupMock
            }
        }

        test('should created user', () => {
            createGroupMock.mockReturnValue(groupMock);
            createGroup(reqMock, resMock);

            expect(createGroupMock).toHaveBeenCalledTimes(1);
            expect(sendMock).toHaveBeenCalledTimes(1);
            expect(sendMock).toHaveBeenCalledWith(groupMock);
        });

        test('should return error', () => {
            createGroupMock.mockImplementation(() => {
                throw new Error;
            });
            createGroup(reqMock, resMock);

            expect(createGroupMock).toHaveBeenCalledTimes(1);
            expect(statusMock).toHaveBeenCalledWith(500);
        });

        test('should return validation error', () => {
            const reqMock = {
                body: {
                    invalidGroupMock
                }
            }

            createGroup(reqMock, resMock);

            expect(createGroupMock).toHaveBeenCalledTimes(1);
            expect(statusMock).toHaveBeenCalledWith(500);
        })
    });

    describe('# updateGroupById', () => {
        const reqMock = {
            body: {
                groupMock
            },
            params: {
                id: 'group1'
            }
        }

        test('should created user', () => {
            updateGroupByIdMock.mockReturnValue(groupMock);
            updateGroupById(reqMock, resMock);

            expect(updateGroupByIdMock).toHaveBeenCalledTimes(1);
            expect(sendMock).toHaveBeenCalledTimes(2);
            expect(sendMock).toHaveBeenCalledWith(groupMock);
        });

        test('should return error', () => {
            updateGroupByIdMock.mockImplementation(() => {
                throw new Error;
            });
            updateGroupById(reqMock, resMock);

            expect(updateGroupByIdMock).toHaveBeenCalledTimes(1);
            expect(statusMock).toHaveBeenCalledWith(500);
        });

        test('should return validation error', () => {
            const reqMock = {
                body: {
                    invalidGroupMock
                }
            }

            updateGroupById(reqMock, resMock);

            expect(updateGroupByIdMock).toHaveBeenCalledTimes(0);
            expect(statusMock).toHaveBeenCalledWith(500);
        });
    });

    describe('# deleteGroupById', () => {
        const reqMock = {
            params: {
                id: 'group1'
            }
        }

        test('should created user', () => {
            deleteGroupMock.mockReturnValue(groupMock);
            deleteGroupById(reqMock, resMock);

            expect(deleteGroupMock).toHaveBeenCalledTimes(1);
            expect(jsonMock).toHaveBeenCalledTimes(1);
            expect(jsonMock).toHaveBeenCalledWith("Group deleted");
        });

        test('should return error', () => {
            deleteGroupMock.mockImplementation(() => {
                throw new Error;
            });
            deleteGroupById(reqMock, resMock);

            expect(deleteGroupMock).toHaveBeenCalledTimes(1);
            expect(statusMock).toHaveBeenCalledWith(500);
        });
    });

})