var qrcode = new QRCode("qrcode");


qrcode.makeCode('');





//
console.clear();

var myApp = angular.module('myApp', []);

myApp.controller('MedicalProfileCtrl', function($scope){
	$scope.dataModel = {
		
		medicalConditions: [
		]
	};
});


myApp.directive('medicalConditions', function(){
	return {
		scope: {
			model: "=",
			id: "="
		},
		link: function(scope){
			var labels = {
				mode: "agregar",
				medicamento: "medicamento",
				frecuencia: "frecuencia"
			};
			
			// models
			angular.extend(scope, {
				labels: labels,
				viewModel: scope.model,
				editModel: {}
			});
			
			// methods
			angular.extend(scope, {
				showEditModalFn: function(viewModel, index, editModalId){
					labels.mode = viewModel ? "Editar" : labels.mode;
					scope.editModel = viewModel ? angular.copy(viewModel) : {};
					scope.editModel.index = index;
					$(editModalId).modal('toggle');
				},
				saveEditFn: function(editModalId){
					// pass data back
					if (scope.editModel.index != null){
						scope.model[scope.editModel.index] = angular.copy(scope.editModel);
					} else {
						scope.model.push(angular.copy(scope.editModel));
					}
					//alert(angular.toJson(scope.model));
					qrcode.makeCode(angular.toJson(scope.model));
					// clean UI
					$(editModalId).modal('toggle');
				}
			});
		},
		template: $("#medicalConditionTemplate").html(),
		replace: true
	}
});

myApp.directive('displayText', function(){
	return {
		scope: {
			label: "=",
			model: "="
		},
		template: $("#displayTextTemplate").html(),
		replace: true
	}
});

myApp.directive('formInput', function(){
	return {
		scope: {
			label: "=",
			model: "=",
			type: "@",
			pattern: "@",
			title: "@"
		},
		link: function(scope, element, attributes){
			if (scope.type){ element.find("input").attr("type", scope.type); }
			if (scope.pattern){ element.find("input").attr("pattern", scope.pattern); }
			if (scope.title){ element.find("input").attr("title", scope.title); }
		},
		template: $("#formInputTemplate").html(),
		replace: true
	}
});	