function CustomMarker(latlng, map, name, url, args) {
	this.latlng = latlng;	
	this.args = args;
	this.url=url;	
	this.name=name;	
	this.setMap(map);	
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function() {
	
	var self = this;
	
	var div = this.div;
	var backImage = this.backImage;
	if (!div) {
	
		div = this.div = document.createElement('div');
		div.className = 'marker';
		div.style.position = 'absolute';
		div.style.width = '80px';
		div.style.height = '110px';
		div.style.background = 'transparent';

		backImage = this.backImage = document.createElement('img');
		backImage.src = "ic_home_child_location.png";
		backImage.style.maxWidth = '100%';
		backImage.style.maxHeight = '100%';
		backImage.style.position = 'absolute';

		cImage = document.createElement('img');
		cImage.src = this.url;
		cImage.style.maxWidth = '50px';
		cImage.style.maxHeight = '50px';
		cImage.style.borderRadius = '25px';
		cImage.style.marginTop = '10px';
		cImage.style.marginLeft = '14px';
		cImage.style.position = 'absolute';
		
		cImage = this.div = document.createElement('img');
		cImage.src = "http://api-toggr.magnasoft.com/profile/f8947180/7259108949.jpg";
		cImage.style.maxWidth = '50px';
		cImage.style.maxHeight = '50px';
		cImage.style.borderRadius = '25px';
		cImage.style.marginTop = '10px';
		cImage.style.marginLeft = '15px';
		cImage.style.position = 'absolute';

		label = document.createElement("label");
		label.style.position = 'absolute';
		label.style.maxWidth = '100%';
		label.style.maxHeight = '30px';
		label.style.marginTop = '90px';
		label.innerHTML = '<h2>'+this.name+'</h2>';

		if (typeof(self.args.marker_id) !== 'undefined') {
			div.dataset.marker_id = self.args.marker_id;
		}
		google.maps.event.addDomListener(div, "click", function(event) {
			google.maps.event.trigger(self, "click");
		});

		this.div = div;
		this.backImage = backImage;
		var panes = this.getPanes();
		div.appendChild(backImage);
		div.appendChild(cImage);
		div.appendChild(label);
		panes.overlayImage.appendChild(div);
	}
	
	var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
	
	if (point) {
		div.style.left = (point.x - 40) + 'px';
		div.style.top = (point.y - 110) + 'px';
		console.log('called');
	}
};

CustomMarker.prototype.remove = function() {
	if (this.div) {
		this.div.parentNode.removeChild(this.div);
		this.div = null;
	}	
};

CustomMarker.prototype.getPosition = function() {
	return this.latlng;	
};

CustomMarker.prototype.setPosition = function(latlng) {
	this.latlng = latlng;
	var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
	if (point) {
		this.div.style.left = (point.x - 40) + 'px';
		this.div.style.top = (point.y - 110) + 'px';
	}
};