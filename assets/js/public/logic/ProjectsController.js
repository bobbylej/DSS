WebModule.controller('ProjectsController', ['$scope', '$http', '$sessionStorage', 'usefulService', function($scope, $http, $sessionStorage, usefulService) {

	$scope.createProject = (project) => {
		if($sessionStorage.user.type == 'PM') {
			$http.post('/api/project/create', {
				user: $sessionStorage.user.id,
				name: project.name,
				date: project.date,
			})
			.then((response) => {
				if(response.data && response.data.status == 'success') {
					window.location.href = `/#/project/${response.data.project.id}`
					getProjects((err, projects) => {
						if(err) {
							$scope.error = err;
						}
						$scope.projects = projects;
					});
				}
				else if(response.data && response.data.status == 'error') {
					$scope.error = response.data.error;
				}
			})
			.catch((response) => {
				$scope.error = response.data.error;
			});
		}
		else {
			$scope.error = 'You don\' have permission to create project!';
		}
	}

	$scope.removeProject = (project) => {
		$http.post('/api/project/'+project.id+'/remove', {
			user: $sessionStorage.user.id
		})
		.then((response) => {
			if(response.data && response.data.status == 'success') {
				getProjects((err, projects) => {
					if(err) {
						$scope.error = err;
					}
					$scope.projects = projects;
				});
			}
			else if(response.data && response.data.status == 'error') {
				$scope.error = response.data.error;
			}
		})
		.catch((response) => {
			$scope.error = response.data.error;
		});
	}

  $scope.projectsToFilter = (projects) => {
      projectsGroups = [];
      return projects;
  }

  $scope.filterGroups = (project) => {
      var groupIsNew = projectsGroups.indexOf(project.date) == -1;
      if (groupIsNew) {
          projectsGroups.push(project.date);
      }
      return groupIsNew;
  }

	$scope.isProjectOfUser = (project) => {
		if(project.user.id == $sessionStorage.user.id) {
			return true;
		}
		return false;
	}

	$scope.isUserPM = () => {
		if($sessionStorage.user.type === 'PM') {
			return true;
		}
		return false;
	}

	function getProjects(callback) {
    $http.get('/api/project')
    .then((response) => {
			if(response.data && response.data.status == 'success') {
				let projects = response.data.projects;
				for(key in projects) {
					var datetime = usefulService.dateToStrings(new Date(projects[key].date));
					projects[key].date = datetime.date;
				}
				callback(undefined, projects);
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

	getProjects((err, projects) => {
		if(err) {
			$scope.error = err;
		}
		$scope.projects = projects;
	});

}]);
