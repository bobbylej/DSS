WebModule.controller('AuthController', ['$scope', '$http', '$sessionStorage', function($scope, $http, $sessionStorage) {

	OAuth.initialize('x9Rg0yXYXMDkXMQQBDq9Zmw5V08');
	$scope.user = $sessionStorage.user;

	$scope.loginLocal = () => {
    $http.put('/api/user/login_local', {
      name: $scope.loginForm.name,
      password: $scope.loginForm.password
    })
    .then((response) => {
			if(response.data && response.data.status == 'success') {
				$sessionStorage.user = response.data.user;
				$scope.user = response.data.user;
				window.location.href = '/#/project';
			}
    })
    .catch((response) => {
      if (response.status === 400 || 404) {
				$scope.error = 'Ivalid login or password';
				return;
      }

			$scope.error = 'Error';
			return;
    })
  };

	$scope.loginFacebook = () => {
		OAuth.popup('facebook')
	    .done((result) => {
				result.me()
			    .done((response) => {
						var dataUser = {
							uid: response.id,
							name: response.name,
							firstname: response.firstname,
							lastname: response.lastname,
							email: response.email,
							provider: 'facebook'
						};

						$http.put('/api/user/login_fb', dataUser)
						.then((response) => {
							if(response.data && response.data.status == 'success') {
								$sessionStorage.user = response.data.user;
								$scope.user = response.data.user;
								window.location.href = '/#/project';
							}
						})
						.catch((response) => {
							if (response.status === 400 || 404) {
								$scope.error = 'Ivalid login or password';
								return;
							}

							$scope.error = 'Error';
							return;
						})
			    })
			    .fail((err) => {
			        //handle error with err
			    });
	    })
	    .fail((err) => {
	      $scope.error = err;
		});
	}

	$scope.logout = () => {
		delete $sessionStorage.user;
		$scope.user = undefined;
		window.location.href = '/#/';
	}

	$scope.signup = () => {
		$http.post('/api/user/register', {
			name: $scope.signupForm.name,
			password: $scope.signupForm.password,
			firstname: $scope.signupForm.firstname,
			lastname: $scope.signupForm.lastname,
			email: $scope.signupForm.email,
			type: $scope.signupForm.type,
		})
		.then((response) => {
			if(response.data && response.data.status == 'success') {
				$sessionStorage.user = response.data.user;
				$scope.user = response.data.user;
				window.location.href = '/#/project';
			}
			else if(response.data && response.data.status == 'error') {
				$scope.error = response.data.error;
			}
		})
		.catch((response) => {
			if (response.status == 409) {
				$scope.error = 'That login has already been taken, please try again.';
				return;
			}
		})
	}

}]);
