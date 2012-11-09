var application = {
	setup: function(){
		Zepto('.menu').on('click', 'li', function(){
			var view = Zepto(this).attr('class'),
				viewUrl = "";
			switch(view){
				case 'accelerometer':
					viewUrl = 'view/accelerometer.html';
					Zepto('.content').load(viewUrl);
					api.accelerometer.setup();
					break;
				case 'camera':
					viewUrl = 'view/camera.html';
					Zepto('.content').load(viewUrl);
					api.camera.capturePhoto();
					break;
				case 'compass':
					viewUrl = 'view/compass.html';
					Zepto('.content').load(viewUrl);
					api.compass.setup();
					break;
				case 'connection':
					viewUrl = 'view/connection.html';
					Zepto('.content').load(viewUrl);
					api.connection.setup();
					break;
				case 'contacts':
					viewUrl = 'view/contacts.html';
					Zepto('.content').load(viewUrl);
					api.contacts.setup();
					break;
				case 'device':
					viewUrl = 'view/device.html';
					Zepto('.content').load(viewUrl);
					api.device.setup();
					break;
				default:
					alert('ainda não foi implementado :(');
					break;
			}
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
	},
	connection: {
		setup: function(){
			var networkState = navigator.connection.type;
			var states = {};
			states[Connection.UNKNOWN]  = 'Unknown connection';
		    states[Connection.ETHERNET] = 'Ethernet connection';
		    states[Connection.WIFI]     = 'WiFi connection';
		    states[Connection.CELL_2G]  = 'Cell 2G connection';
		    states[Connection.CELL_3G]  = 'Cell 3G connection';
		    states[Connection.CELL_4G]  = 'Cell 4G connection';
		    states[Connection.NONE]     = 'No network connection';
		    Zepto('.connection span').text(states[networkState]);
		}
	},
	contacts: {
		setup: function() {
			var options = new ContactFindOptions();
			var fields = ["displayName"];
			navigator.contacts.find(fields, api.contacts.onSuccess, api.error, options);
		},
		onSuccess: function(contacts){
			for (var i=0; i<contacts.length; i++) {
				Zepto('ul').append('<li>' + contacts[i].displayName + '</li>')
			}
		}
	},
	device: {
		setup: function(){
			setTimeout(function(){
				Zepto('.name').text(window.device.name);
				Zepto('.cordova').text(window.device.cordova);
				Zepto('.platform').text(window.device.platform);
				Zepto('.uuid').text(window.device.uuid);
				Zepto('.version').text(window.device.version);
			}, 500);
		}
	}
};
