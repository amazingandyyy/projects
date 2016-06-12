'use strict';

angular
    .module('pinchApp', [
        'ui.router',
        'satellizer',
        'ui.bootstrap',
        'ngFileUpload',
        'ngImgCrop'
    ])
    .config(function($stateProvider, $urlRouterProvider, $authProvider) {

    $authProvider
        .facebook({
            clientId: '298165113849366'
        });

    $stateProvider
        .state(home)
        .state(ppage)
        .state(project)
        .state(projectDetails)
        .state(projectSetting)
        .state(projectSetting_general)
        .state(projectSetting_request)
        .state(projectSetting_privacy)
        .state(projectSetting_danger)
        .state(profileSetting)
        .state(profileSetting_general)
        .state(profileSetting_request)
        .state(profileSetting_privacy)
        .state(profileSetting_danger)

    $urlRouterProvider.otherwise('/');
});


let home = {
    name: 'home',
    url: '/',
    views: {
        main: {
            templateUrl: '/html/home.html',
            controller: 'homeCtrl'
        }
    },
}
let ppage = {
    name: 'ppage',
    url: '/:userId',
    views: {
        main: {
            templateUrl: '/html/ppage.html',
            controller: 'ppageCtrl'
        }
    },
}
let project = {
    name: 'project',
    url: '/project',
    views: {
        main: {
            templateUrl: '/html/project.html',
            controller: 'projectCtrl'
        }
    },
}
let projectDetails = {
    name: 'projectDetails',
    url: '/project/:projectId',
    views: {
        main: {
            templateUrl: '/html/projectDetails.html',
            controller: 'projectDetailsCtrl'
        }
    },
}
let projectSetting = {
    name: 'projectSetting',
    url: '/project/:projectId/setting',
    views: {
        main: {
            templateUrl: '/html/projectSetting.html',
            controller: 'projectSettingCtrl'
        }
    },
}
let projectSetting_general = {
    name: 'projectSetting_general',
    url: '/general',
    parent: 'projectSetting',
    views: {
        right_section: {
            templateUrl: '/html/projectSetting_general.html',
            controller: 'projectSettingCtrl'
        }
    },
}
let projectSetting_request = {
    name: 'projectSetting_request',
    url: '/request',
    parent: 'projectSetting',
    views: {
        right_section: {
            templateUrl: '/html/projectSetting_request.html',
            controller: 'projectSettingCtrl'
        }
    },
}
let projectSetting_privacy = {
    name: 'projectSetting_privacy',
    url: '/privacy',
    parent: 'projectSetting',
    views: {
        right_section: {
            templateUrl: '/html/projectSetting_privacy.html',
            controller: 'projectSettingCtrl'
        }
    },
}
let projectSetting_danger = {
    name: 'projectSetting_danger',
    url: '/danger',
    parent: 'projectSetting',
    views: {
        right_section: {
            templateUrl: '/html/projectSetting_danger.html',
            controller: 'projectSettingCtrl'
        }
    },
}
let profileSetting = {
    name: 'profileSetting',
    url: '/user/:userId/setting',
    views: {
        main: {
            templateUrl: '/html/profileSetting.html',
            controller: 'profileSettingCtrl'
        }
    },
}
let profileSetting_general = {
    name: 'profileSetting_general',
    url: '/general',
    parent: 'profileSetting',
    views: {
        right_section: {
            templateUrl: '/html/profileSetting_general.html',
            controller: 'profileSettingCtrl'
        }
    },
}
let profileSetting_request = {
    name: 'profileSetting_request',
    url: '/request',
    parent: 'profileSetting',
    views: {
        right_section: {
            templateUrl: '/html/profileSetting_request.html',
            controller: 'profileSettingCtrl'
        }
    },
}
let profileSetting_privacy = {
    name: 'profileSetting_privacy',
    url: '/privacy',
    parent: 'profileSetting',
    views: {
        right_section: {
            templateUrl: '/html/profileSetting_privacy.html',
            controller: 'profileSettingCtrl'
        }
    },
}
let profileSetting_danger = {
        name: 'profileSetting_danger',
        url: '/danger',
        parent: 'profileSetting',
        views: {
            right_section: {
                templateUrl: '/html/profileSetting_danger.html',
                controller: 'profileSettingCtrl'
            }
        },
    }
