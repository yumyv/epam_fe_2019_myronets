import Module from './Module';

class GoogleMap extends Module {
  init() {
    const myLatLng = new google.maps.LatLng(48.464718, 35.046185);
    const myOptions = {
      zoom: 12,
      center: myLatLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    const map = new google.maps.Map(this.selector, myOptions);
  }
}

export default GoogleMap;
