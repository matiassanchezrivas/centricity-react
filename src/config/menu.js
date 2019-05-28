export default {
    // ------------------------------------------------------------------------
    // Menu Items
    // ------------------------------------------------------------------------
    'app.dashboard': {
        url: '/dashboard',
        title: 'Dashboard',
        data: {
            permissions: {
                only: ['CLOUDPOXEE', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    //MEDIA LIVE
    'app.mediabox_stream_manager': {
        url: '/streammanager',
        title: 'Stream Manager',
        data: {
            permissions: {
                only: ['MEDIABOX', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    'app.mediabox_past_events': {
        url: '/pastevents',
        title: 'Past Events',
        data: {
            permissions: {
                only: ['MEDIABOX', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    'app.mediabox_media_library': {
        url: '/medialibrary',
        title: 'Media Library',
        data: {
            permissions: {
                only: ['MEDIABOX', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    //CONNECT
    'app.connect': {
        url: '/connect',
        title: 'Connect',
        data: {
            permissions: {
                only: ['CONNECT', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    //CONNECT
    'app.connectDashboard': {
        url: '/connectdashboard/:instanceId',
        title: 'Dashboard',
        params: {
            instanceId: null
        },
        data: {
            permissions: {
                only: ['CONNECT', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    //CONNECT MENU
    'app.connectDashboardMenu': {
        url: '/connectdashboardmenu/:instanceId',
        title: 'Connect',
        params: {
            instanceId: null
        },
        data: {
            permissions: {
                only: ['CONNECT', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    //CONNECT WALLBOARD CONFIG
    'app.configWallboard': {
        url: '/configWallboard/:idconfig/:instanceId',
        title: 'Connect Walboard Config',
        params: {
            idconfig: null
        },
        data: {
            permissions: {
                only: ['CONNECT', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }

    },
    //CONNECT HTML WALLBOARD 
    'app.htmlWallboard': {
        url: '/htmlWallboard/:idconfig/:instanceId',
        title: 'Connect Html Walboard',
        params: {
            idconfig: null
        },
        data: {
            permissions: {
                only: ['CONNECT', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }

    },
    //CONNECT THRESHOLDS
    'app.thresholds': {
        url: '/thresholds/:idconfig/:instanceId',
        title: 'Thresholds',
        params: {
            instanceId: null
        },
        data: {
            permissions: {
                only: ['CONNECT', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    //CONNECT WALLBOARD
    'app.connectWallboard': {
        url: '/connectwallboard/:instanceId',
        title: 'Wallboard',
        params: {
            instanceId: null
        },
        data: {
            permissions: {
                only: ['CONNECT', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    //ADD QUEUES
    'app.addqueue': {
        url: '/addqueue/:instanceId',
        title: 'Add Queue',
        params: {
            instanceId: null
        },
        data: {
            permissions: {
                only: ['CONNECT', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    'app.welcome': {
        url: '/welcome',
        title: 'Welcome to Centricity',
    },
    'app.profile': {
        url: '/profile',
        title: 'Profile',
        // data:{
        //   permissions: {
        //     only: ['ROLE_CH_SYSTEM_ADMIN']
        //   }
        // }
    },
    'app.groups': {
        url: '/groups',
        title: 'Groups',
        data: {
            permissions: {
                only: ['CLOUDPOXEE', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    'app.groupDetails': {
        url: '/groups/:name',
        title: 'Group Details',
        data: {
            permissions: {
                only: ['CLOUDPOXEE', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    'app.groupConfig': {
        url: '/groups/:name/configuration',
        title: 'Group configuration',
        data: {
            permissions: {
                only: ['CLOUDPOXEE', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    'app.servers': {
        url: '/servers',
        title: 'Servers',
        data: {
            permissions: {
                only: ['CLOUDPOXEE', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    'app.load-balancers': {
        url: '/load-balancers',
        title: 'Load Balancers',
        data: {
            permissions: {
                only: ['CLOUDPOXEE', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    'app.volumes': {
        url: '/storage/volumes',
        title: 'Volumes',
        data: {
            permissions: {
                only: ['CLOUDPOXEE', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    'app.snapshots': {
        url: '/storage/snapshots',
        title: 'Snapshots',
        data: {
            permissions: {
                only: ['CLOUDPOXEE', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    'app.map-distribution': {
        url: '/map-distribution',
        title: 'Map distribution',
        data: {
            permissions: {
                only: ['CLOUDPOXEE', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    'app.appstream': {
        url: '/appstream',
        title: 'AppStream',
        data: {
            permissions: {
                only: ['APPSTREAM', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    'app.workspaces': {
        url: '/workspaces',
        title: 'Workspaces',
        data: {
            permissions: {
                only: ['WORKSPACES', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    'app.workspace': {
        url: '/workspace/:workspaceId',
        title: 'Workspace',
        data: {
            permissions: {
                only: ['WORKSPACES', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    'app.scheduling': {
        url: '/scheduling',
        title: 'Scheduling',
        data: {
            permissions: {
                only: ['SCHEDULER', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    'app.customers': {
        url: '/customers',
        title: 'Customers',
        data: {
            permissions: {
                only: ['ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    'app.customers-add': {
        url: '/customers-add',
        title: 'Add Customer',
        data: {
            permissions: {
                only: ['ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    'app.customers-management': {
        url: '/customers-management',
        title: 'Customer Management',
        data: {
            permissions: {
                only: ['ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    'app.customer-settings': {
        url: '/customer-settings',
        title: 'Customer Settings',
    },
    'app.logs-report': {
        url: '/audit-report',
        title: 'Audit Report',
    },
    'app.admin-dashboard': {
        url: '/admin-dashboard',
        title: 'Admin Dashboard',
        data: {
            permissions: {
                only: ['ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    'app.credentials': {
        url: '/credentials',
        title: 'Credentials',
    },
    'app.credentials-new-by-iam-role': {
        url: '/new_by_iam_role',
        title: 'Credentials - New By IAM Role',
    },
    'app.credentials-new-by-accesskey': {
        url: '/new_by_accesskey',
        title: 'Credentials - New By Access Key',
    },
    'app.credentials-new-softlayer': {
        url: '/new_softlayer_credential',
        title: 'Credentials - New SoftLayer Credential',
    },
    // --------------------------------------------------------------------------
    // Security Groups
    // --------------------------------------------------------------------------
    'app.security-groups': {
        url: '/security_groups',
        title: 'Security Groups',
        data: {
            permissions: {
                only: ['CLOUDPOXEE', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    'app.security-groups-new': {
        url: '/new_security_group',
        title: 'Security Groups - New Group',
        data: {
            permissions: {
                only: ['CLOUDPOXEE', 'ROLE_CH_SYSTEM_ADMIN']
            }
        }
    },
    // --------------------------------------------------------------------------
    // Manage admins and regions
    // --------------------------------------------------------------------------
    'app.manage-roles': {
        url: '/manage-roles',
        title: 'Manage roles',
    },
    'app.manage-admins': {
        url: '/manage-admins',
        title: 'Manage admins',
    },
    'app.manage-regions': {
        url: '/manage-regions',
        title: 'Manage regions',
    },
    'login': {
        url: '/login',
        title: 'Login',
        data: {
            secured: false
        }
    },
    'forgotPassword': {
        url: '/forgotPassword',
        title: 'Forgot Password',
        data: {
            secured: false
        }
    },
    'changePassword': {
        url: '/changePassword/:token',
        title: 'Change Password',
        data: {
            secured: false
        }
    },
    'passwordChanged': {
        url: '/passwordChanged',
        title: 'Password Changed',
        data: {
            secured: false
        }
    },
    'account': {
        url: '/account',
        title: 'New Account',
        data: {
            secured: false
        }
    },
    'accountCreated': {
        url: '/accountCreated',
        title: 'Account Created',
        data: {
            secured: false
        }
    }




















}