// utils.ts
"use client";

import {
    UserMinusIcon,
    UserPlusIcon,
    PauseCircleIcon
  } from '@heroicons/react/24/solid';

export const add = (a: number, b: number): number => {
    return a + b;
};

export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const statusIconMap: {[key: string]: React.ElementType} = {
    "pending": PauseCircleIcon,
    "remove": UserMinusIcon,
    "retain": UserPlusIcon,
};

export const statusColorMap: {[key: string]: string} = {
    "pending": "gray",
    "remove": "red",
    "retain": "blue",
};

export const membershipMap: { [key: number]: string } = {
    50: "Owner",
    40: "Maintainer",
    30: "Developer",
    20: "Reporter",
    10: "Guest",
    5: "Minimal Access",
}

export function generateMembershipType(level: number) {
    return membershipMap[level];
}

export function generateStatusIcon(status: string) {
    return statusIconMap[status];
}

export function generateStatusColor(status: string) {
    return statusColorMap[status];
}

// Add more utility functions as needed
export const eventsData: string = `{
    "events": [
        {
            "created": "2022-01-01T10:00:00Z",
            "event_id": "1",
            "payload": {
                "user_id": 123,
                "oe_before": "ABCD 01",
                "oe_after": "EFGH 02",
                "memberships": [
                    {
                        "source_id": "gitlab/",
                        "source_type": "group",
                        "membership_level": 40,
                        "status": "pending"
                    },
                    {
                        "source_id": "gitlab/gitlab-automator",
                        "source_type": "project",
                        "membership_level": 50,
                        "status": "retain"
                    },
                    {
                        "source_id": "coder/",
                        "source_type": "group",
                        "membership_level": 30,
                        "status": "remove"
                    },
                    {
                        "source_id": "pkiservice/",
                        "source_type": "group",
                        "membership_level": 50,
                        "status": "pending"
                    },
                    {
                        "source_id": "coder/workspace-manager",
                        "source_type": "project",
                        "membership_level": 50,
                        "status": "retain"
                    }
                ]
            }
        },
        {
            "created": "2022-01-02T12:00:00Z",
            "event_id": "2",
            "payload": {
                "user_id": 456,
                "oe_before": "OPQR 11",
                "oe_after": "STUV 12",
                "memberships": [
                    {
                        "source_id": "coder/workspace-templates",
                        "source_type": "project",
                        "membership_level": 50,
                        "status": "remove"
                    },
                    {
                        "source_id": "coder/workspace-manager",
                        "source_type": "project",
                        "membership_level": 40,
                        "status": "pending"
                    }
                ]
            }
        },
        {
            "created": "2022-01-03T14:00:00Z",
            "event_id": "3",
            "payload": {
                "user_id": 789,
                "oe_before": "WXYZ 15",
                "oe_after": "ABCD 16",
                "memberships": [
                    {
                        "source_id": 5,
                        "source_type": "group",
                        "membership_level": 50,
                        "status": "retain"
                    },
                    {
                        "source_id": 6,
                        "source_type": "project",
                        "membership_level": 40,
                        "status": "remove"
                    }
                ]
            }
        },
        {
            "created": "2022-01-04T16:00:00Z",
            "event_id": "4",
            "payload": {
                "user_id": 101112,
                "oe_before": "KLMN 19",
                "oe_after": "OPQR 20",
                "memberships": [
                    {
                        "source_id": 7,
                        "source_type": "group",
                        "membership_level": 50,
                        "status": "pending"
                    },
                    {
                        "source_id": 8,
                        "source_type": "project",
                        "membership_level": 40,
                        "status": "retain"
                    }
                ]
            }
        },
        {
            "created": "2022-01-05T18:00:00Z",
            "event_id": "5",
            "payload": {
                "user_id": 131415,
                "oe_before": "WXYZ 23",
                "oe_after": "ABCD 24",
                "memberships": [
                    {
                        "source_id": 9,
                        "source_type": "project",
                        "membership_level": 50,
                        "status": "remove"
                    },
                    {
                        "source_id": 10,
                        "source_type": "group",
                        "membership_level": 40,
                        "status": "pending"
                    }
                ]
            }
        }
    ]
}`; 