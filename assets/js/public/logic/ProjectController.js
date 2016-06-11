WebModule.controller('ProjectController', ['$scope', '$http', '$sessionStorage', '$routeParams', 'usefulService', function($scope, $http, $sessionStorage, $routeParams, usefulService) {

	$scope.currentStep = 0;
	$scope.prevStep = () => {
		if($scope.currentStep > 0)
			$scope.currentStep--;
	}
	$scope.nextStep = () => {
		$scope.currentStep++;
	}

	$scope.removeProject = (project) => {
		$http.post('/api/project/'+project.id+'/remove', {
			user: $sessionStorage.user.id
		})
		.then((response) => {
			if(response.data && response.data.status == 'success') {
				window.location.href = '/#/project'
			}
			else if(response.data && response.data.status == 'error') {
				$scope.error = response.data.error;
			}
		})
		.catch((response) => {
			$scope.error = response.data.error;
		});
	}

	$scope.createTask = (task) => {
		$scope.errorTask = undefined;
		if($sessionStorage.user.id == $scope.project.user.id) {
			$http.post('/api/task/create', {
				creator: $sessionStorage.user.id,
				project: $scope.project.id,
				name: task.name,
			})
			.then((response) => {
				if(response.data && response.data.status == 'success') {
					getTasks($scope.project.id, (err, tasks) => {
						if(err) {
							$scope.errorTask = err;
						}
						$scope.tasks = tasks;
					});
				}
				else if(response.data && response.data.status == 'error') {
					$scope.errorTask = response.data.error;
				}
			})
			.catch((response) => {
				$scope.errorTask = response.data.error;
			});
		}
		else {
			$scope.errorTask = 'You don\' have permission to create task!';
		}
	}

	$scope.removeTask = (task) => {
		$scope.errorTask = undefined;
		if($sessionStorage.user.id == $scope.project.user.id) {
			$http.post(`/api/task/${task.id}/remove`, {
				creator: $sessionStorage.user.id,
				project: $scope.project.id
			})
			.then((response) => {
				if(response.data && response.data.status == 'success') {
					getTasks($scope.project.id, (err, tasks) => {
						if(err) {
							$scope.errorTask = err;
						}
						$scope.tasks = tasks;
					});
				}
				else if(response.data && response.data.status == 'error') {
					$scope.errorTask = response.data.error;
				}
			})
			.catch((response) => {
				$scope.errorTask = response.data.error;
			});
		}
		else {
			$scope.errorTask = 'You don\' have permission to remove task!';
		}
	}

	$scope.addEmployee = (employee) => {
		$scope.errorEmployee = undefined;
		if($sessionStorage.user.id == $scope.project.user.id) {
			$http.post(`/api/project/${$scope.project.id}/employee/add`, {
				creator: $sessionStorage.user.id,
				project: $scope.project.id,
				user: employee.id
			})
			.then((response) => {
				if(response.data && response.data.status == 'success') {
					getEmployees($scope.project.id, (err, employees) => {
						if(err) {
							$scope.errorEmployee = err;
						}
						$scope.employees = employees;
					});
				}
				else if(response.data && response.data.status == 'error') {
					$scope.errorEmployee = response.data.error;
				}
			})
			.catch((response) => {
				$scope.errorEmployee = response.data.error;
			});
		}
		else {
			$scope.errorEmployee = 'You don\' have permission to add Employee!';
		}
	}

	$scope.removeEmployee = (employee) => {
		$scope.errorEmployee = undefined;
		if($sessionStorage.user.id == $scope.project.user.id) {
			$http.post(`/api/project/${$scope.project.id}/employee/remove`, {
				creator: $sessionStorage.user.id,
				project: $scope.project.id,
				user: employee.id
			})
			.then((response) => {
				if(response.data && response.data.status == 'success') {
					getEmployees($scope.project.id, (err, employees) => {
						if(err) {
							$scope.errorEmployee = err;
						}
						$scope.employees = employees;
					});
				}
				else if(response.data && response.data.status == 'error') {
					$scope.errorEmployee = response.data.error;
				}
			})
			.catch((response) => {
				$scope.errorEmployee = response.data.error;
			});
		}
		else {
			$scope.errorEmployee = 'You don\' have permission to remove Employee!';
		}
	}

	$scope.isProjectOfUser = () => {
		if($scope.project && $sessionStorage.user.id === $scope.project.user.id) {
			return true;
		}
		return false;
	}

	function getProject(projectId, callback) {
    $http.get(`/api/project/${projectId}`)
    .then((response) => {
			if(response.data && response.data.status == 'success') {
				let project = response.data.project;
				var datetime = usefulService.dateToStrings(new Date(project.date));
				project.date = datetime.date;
				callback(undefined, project);
			}
			else if(response.data && response.data.status == 'error') {
				callback(response.data.error, undefined);
			}
    })
    .catch((response) => {
			callback(response, undefined);
    });
  };

	function getUsers(callback) {
    $http.get(`/api/user`)
    .then((response) => {
			if(response.data && response.data.status == 'success') {
				callback(undefined, response.data.users);
			}
			else if(response.data && response.data.status == 'error') {
				callback(response.data.error, undefined);
			}
    })
    .catch((response) => {
			callback(response, undefined);
    });
  };

	function getEmployees(projectId, callback) {
    $http.get(`/api/project/${projectId}/employee`)
    .then((response) => {
			if(response.data && response.data.status == 'success') {
				callback(undefined, response.data.employees);
			}
			else if(response.data && response.data.status == 'error') {
				callback(response.data.error, undefined);
			}
    })
    .catch((response) => {
			callback(response, undefined);
    });
  };

	function getTasks(projectId, callback) {
    $http.get(`/api/project/${projectId}/task`)
    .then((response) => {
			if(response.data && response.data.status == 'success') {
				callback(undefined, response.data.tasks);
			}
			else if(response.data && response.data.status == 'error') {
				callback(response.data.error, undefined);
			}
    })
    .catch((response) => {
			callback(response, undefined);
    });
  };

	// ACTION
	var projectsGroups = [];

	getProject($routeParams.id, (err, project) => {
		if(err) {
			$scope.error = err;
		}
		$scope.project = project;
	});

	getTasks($routeParams.id, (err, tasks) => {
		if(err) {
			$scope.error = err;
		}
		$scope.tasks = tasks;
	});

	getEmployees($routeParams.id, (err, employees) => {
		if(err) {
			$scope.error = err;
		}
		$scope.employees = employees;
	});

	getUsers((err, users) => {
		if(err) {
			$scope.error = err;
		}
		$scope.users = users;
	});

	//jQuery

	(function( $ ) {

		$('#employee-criteria').graph(5, 200);

	}( jQuery ));

}]);
