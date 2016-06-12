'use strict';

angular
    .module('pinchApp')
    .controller('navCtrl', navCtrl)
    .controller('homeCtrl', homeCtrl)
    .controller('ppageCtrl', ppageCtrl)
    .controller('projectCtrl', projectCtrl)
    .controller('profileSettingCtrl', profileSettingCtrl)
    .controller('projectDetailsCtrl', projectDetailsCtrl)
    .controller('projectDetailsCtrl', projectDetailsCtrl)
    .controller('projectSettingCtrl', projectSettingCtrl)

function homeCtrl() {
    console.log('homeCtrl loaded');
}

function projectSettingCtrl($scope, $http, $stateParams, Project, $state) {
    console.log('projectSettingCtrl loaded');
    var isAuthor = false;
    var projectId = $stateParams.projectId;

    Project.getOnePorject(projectId).then(res => {
        console.log('projects: ', res.data);
        $scope.project = res.data;
        $scope.updateProjectData = $scope.project;
        $scope.project.author.forEach(author => {
            // in case, project has mutiple authors
            if (author._id == $scope.currentUser._id) {
                isAuthor = true;
            }
        })
        if (isAuthor) {
            console.log('isAuthor');
        } else {
            console.log('is not Author');
            $state.go('home');
        }
    }, err => {
        console.log('err when get this project: ', err);
    })
    $scope.request = {
        people: [],
        supply: [],
        money: []
    };

    $scope.init = () => {
        $state.go('projectSetting_general');
    };

    $scope.addChoiceToPeople = (people) => {
        if ($scope.request.people.indexOf(people) !== -1) {
            $scope.request.people.splice($scope.request.people.indexOf(people), 1);
        } else {
            $scope.request.people.push(people);
        }
        console.log($scope.request.people);
    };

    $scope.addChoiceToSupply = (supply) => {
        if ($scope.request.supply.indexOf(supply) !== -1) {
            $scope.request.supply.splice($scope.request.supply.indexOf(supply), 1);
        } else {
            $scope.request.supply.push(supply);
        }
        console.log($scope.request.supply);
    }
    $scope.addChoiceToMoney = (money) => {
        if ($scope.request.money.indexOf(money) !== -1) {
            $scope.request.money.splice($scope.request.money.indexOf(money), 1);
            $scope.request.money = [];
        } else {
            $scope.request.money = [];
            $scope.request.money.push(money);
        }
        console.log($scope.request.money);
    }
    $scope.deleteProject = (projectFullName) => {
        if ($scope.deleteProjectInput == projectFullName) {
            let projectId = $stateParams.projectId;
            Project.deleteOne(projectId).then(res => {
                console.log('project deleted');
                console.log('res: ', res.data);
                $state.go('ppage', {
                    userId: $scope.currentUser._id
                });
            }, err => {
                console.log('user is not logged in.');
            })
        } else {
            console.log('no');
        }
    }

    $scope.dangerNotified = false;
    $scope.dangerNotifty = () => {
        $scope.dangerNotified = !$scope.dangerNotified;
    }
    $scope.sameToTheProjectName = (projectFullName) => {
        return $scope.deleteProjectInput == projectFullName;
    }
    $scope.okayToDelete = (projectFullName) => {
        console.log('$scope.dangerNotified: ', $scope.dangerNotified);
        return $scope.deleteProjectInput == projectFullName && $scope.dangerNotified;
    }
}

function projectDetailsCtrl($scope, $http, $stateParams, Project) {
    console.log('projectDetailsCtrl loaded');
    var isAuthor = false;
    var projectId = $stateParams.projectId;
    Project.getOnePorject(projectId).then(res => {
        console.log('projects: ', res.data);
        $scope.project = res.data;
        console.log('$scope.currentUser._id: ', $scope.currentUser._id);
        console.log('$scope.project.author: ', $scope.project.author);
        if ($scope.project.author.indexOf($scope.currentUser._id) !== -1) {
            isAuthor = true;
        }

        if (isAuthor) {
            console.log('isAuthor');
        } else {
            console.log('is not Author');
        }
    }, err => {
        console.log('err when get this project: ', err);
    })
}



function projectCtrl($scope, $timeout, Project, $state, $rootScope) {
    console.log('projectCtrl loaded');
    $rootScope.createModal;
}

function profileSettingCtrl($scope, $http, $stateParams, Account, $state, $window, Upload) {
    console.log('profileSettingCtrl loaded');

    if ($stateParams.userId == $scope.currentUser._id) {
        // console.log('isAuthUser');
        $scope.updateUserData = angular.copy($scope.currentUser);
    } else {
        // console.log('is not AuthUser');
        $state.go('home');
    }
    $scope.init = () => {
        $state.go('profileSetting_general');
    };

    $scope.updateUserDataSubmitted = () => {
        var uriUserId = $scope.updateUserData._id;
        var updateUserData = $scope.updateUserData;
        Account.updateUserData(uriUserId, updateUserData).then(res => {
            $scope.updateUserData = res.data;
            $window.location.reload();
        }, err => {
            console.log('err when get update user data: ', err);
        })
    }
    $scope.photoUploading = false
    $scope.uploadFiles = (file) => {
        $scope.photoUploading = true;
        var file = file[0]
        var userId = $scope.currentUser._id;
        console.log('photo: ', file);
        if (file) {
            Upload.upload({
                url: `/api/upload/${userId}`,
                data: {
                    newFile: file
                }
            }).then(res => {
                console.log('res after upload: ', res.data);
                $window.location.reload();
            }, err => {
                console.log('err when upload file: ', err);
            })
        }
    }

}

function ppageCtrl($scope, $state, $rootScope, $stateParams, Project, Account) {
    console.log('ppageCtrl loaded');
    $scope.state = {};
    $scope.state.isTheUser = false;
    var uriUserId = $stateParams.userId;
    if (uriUserId == $scope.currentUser._id) {
        $scope.state.isTheUser = true;
    }
    if ($scope.state.isTheUser) {
        console.log('isTheUser');
    } else {
        console.log('is not TheUser');
    }

    Account.getUserData(uriUserId).then(res => {
        // console.log('projects: ', res.data);
        $scope.user = res.data;
        $scope.projects = res.data.projects.reverse();
        console.log('cards here: ', res.data.projects);
        if (res.data) {
            $scope.starred = () => {
                var starredResult = 0;
                res.data.projects.forEach(project => {
                    starredResult += project.starred.length;
                })
                return starredResult;
            }
        }
    }, err => {
        console.log('err when get userData: ', err);
    })

    $scope.createTime = (createAtTime) => {
        return moment(createAtTime).fromNow();
    }

    $scope.follow = (currentUser, followTarget) => {
        console.log('followEvent triggered');
        console.log('currentUser: ', currentUser);
        console.log('followTarget: ', followTarget);
        if(currentUser !== followTarget){
            console.log('fire the event!');
            Account.follow(currentUser, followTarget).then(res => {
                if(res.data.eventType == 'follow'){
                    console.log('res from behavior of follwing: ', res.data);
                }else if(res.data.eventType == 'unfollow'){
                    console.log('res from behavior of unfollwing: ', res.data);
                }
            }, err => {
                console.log('err: ', err);
                // console.log('err when ', currentUser, ' follow ', followTarget);
            })
        }
    }

}

function navCtrl($http, $scope, $auth, Account, $rootScope, $timeout, $window, $state, focus, Project) {
    // console.log('navCtrl loaded');
    $scope.currentUser = '';
    $scope.loginloading = false;
    $scope.logoutloading = false;
    $rootScope.hideNav = false;
    $rootScope.createModal = false;

    $scope.authenticate = (provider) => {
            $scope.loginloading = true;
            $auth.authenticate(provider).then(data => {
                Account.getCurrentUser().then(res => {
                    console.log('user logged in: ', res.data);
                    $scope.currentUser = res.data;
                    $scope.loginloading = false;
                    console.log('$scope.currentUser._id: ', $scope.currentUser._id);
                    if ($state.current.name == 'home') {
                        $state.go('ppage', {
                            userId: $scope.currentUser._id
                        });
                    } else {
                        $window.location.reload();
                    }
                }, err => {
                    console.log('user is not logged in.');
                })
            }, err => {
                console.log('err when log user in: ', err);
            })
        }
        // console.log('$auth.isAuthenticated()): ', $auth.isAuthenticated()));
    if ($auth.isAuthenticated()) {
        Account.getCurrentUser().then(res => {
            $scope.currentUser = res.data;
            console.log('navCtrl triggered and currentUser: ', $scope.currentUser);
        }, err => {
            console.log('user is not logged in.');
        })
    }

    $scope.isAuthenticated = () => {
        return $auth.isAuthenticated();
    }

    $scope.logout = () => {
        $scope.logoutloading = true;
        $auth.logout();
        $timeout(function() {
            $scope.logoutloading = false;
            // $state.go('home');
            $window.location.reload();
        }, 0)
    }

    $scope.create = () => {
        $scope.projectInitalizing = false;
        $scope.newProjectName = '';
        $scope.newProjectPitch = '';
        $scope.createModal = true;
        $timeout(function() {
            focus('focusMe');
        }, 100)
    }
    $scope.createProject = () => {
        $scope.projectInitalizing = true;
        console.log('create project called: ', $scope.newProjectName);
        var newPojectObj = {
            title: $scope.newProjectName,
            pitch: $scope.newProjectPitch
        }
        Project.createOne(newPojectObj).then(res => {
            console.log('add new behavior[createNewProject]: ', res.data);
            $timeout(function() {
                $scope.projectInitalizing = false;
                $scope.createModal = false;
                if ($state.current.name == 'ppage') {
                    $window.location.reload();
                } else {
                    $state.go('ppage', {
                        userId: $scope.currentUser._id
                    });
                }
            }, Math.random() * 1500 + 300);
        }, err => {
            console.log('err when create project: ', err);
        })
    }
}
