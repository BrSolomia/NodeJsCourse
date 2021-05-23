export const groupsMock = [
    {
        "id": "group1",
        "name": "READ/SHARE group",
        "permissions": [
            "READ",
            "SHARE"
        ]
    },
    {
        "id": "group2",
        "name": "READ/WRITE/SHARE/UPLOAD_FILES group",
        "permissions": [
            "READ",
            "WRITE",
            "SHARE",
            "UPLOAD_FILES"
        ]
    },
    {
        "id": "group3",
        "name": "READ/WRITE/DELETE/SHARE/UPLOAD_FILES group",
        "permissions": [
            "READ",
            "WRITE",
            "DELETE",
            "SHARE",
            "UPLOAD_FILES"
        ]
    }
]

export const groupMock = {
    "id": "group1",
        "name": "READ/SHARE group",
        "permissions": [
            "READ",
            "SHARE"
        ]
}

export const invalidGroupMock = {
    "id": "group1",
        "name": 123423,
        "permissions": [
            "READ",
            "SHARE"
        ]
}