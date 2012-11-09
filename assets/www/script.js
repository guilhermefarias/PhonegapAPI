var application = {
	setup: function(){
		Zepto('.menu').on('click', 'li', function(){
			var view = Zepto(this).attr('class'),
				viewUrl = "";
			switch(view){
				case 'accelerometer':
					viewUrl = 'view/accelerometer.html';
					api.accelerometer.setup();
					break;
				case 'camera':
					viewUrl = 'view/camera.html';
					api.camera.capturePhoto();				
					break;
				case 'compass':
					viewUrl = 'view/compass.html';
					api.compass.setup();				
					break;
				default:
					alert('ainda não foi implementado :(');
					return false;
					break;
			}
			Zepto('.content').load(viewUrl);
		});
	}
};

var api = {
	error: function(){
		alert('deu erro :(');
	},
	accelerometer: {
		setup: function(){
			var options = {
				frequency: 100
			}; 
			navigator.accelerometer.watchAcceleration(api.accelerometer.onSuccess, api.error, options);
		},
		onSuccess: function(acceleration){
			Zepto('.x span').text(Math.round(acceleration.x * 10));
			Zepto('.y span').text(Math.round(acceleration.y * 10));
			Zepto('.z span').text(Math.round(acceleration.z * 10));
		}
	},
	camera: {
		onPhotoDataSuccess: function(imageData) {
			var smallImage = document.getElementById('smallImage');
			smallImage.style.display = 'block';
			smallImage.src = "data:image/jpeg;base64," + imageData;
    	},
		capturePhoto: function(){
			var options = {
				quality: 50,
				destinationType: navigator.camera.DestinationType.DATA_URL
			};
			navigator.camera.getPicture(api.camera.onPhotoDataSuccess, api.error, options); 	
		}
	},
	compass: {
		setup: function(){
			var options = {
				frequency: 100
			};
			navigator.compass.watchHeading(api.compass.onSuccess, api.error, options);
		},
		onSuccess: function(heading){
			Zepto('.heading span').text(Math.round(heading.magneticHeading));
		}
	}
};
