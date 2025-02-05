const ApiRoutes = {
    USER_LOGIN:{
        path:'/users/login',
        authenticate:false
    },
    TA_CREATE:{
        path:'/tasks',
        authenticate:false
    },
    TA:{
        path:'/tasks',
        authenticate:true
    },
    DASHBOARD_COUNT:{
        path:'/dashboardCount',
        authenticate:true
    },
    LIST:{
        path:'/tasks/progress',
        authenticate: true
    },
    CHANGE_STATUS:{
        path: '/tasks',
        authenticate:true
    },
    GET_USERS:{
        path: '/users',
        authenticate: true
    },
    GET_USER:{
        path: '/users',
        authenticate: true
    }
}

export default ApiRoutes