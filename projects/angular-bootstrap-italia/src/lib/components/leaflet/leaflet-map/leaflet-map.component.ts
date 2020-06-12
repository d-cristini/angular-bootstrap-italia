import { Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';

// Leaflet Draw
import 'leaflet-draw';
import drawLocales from 'leaflet-draw-locales';


@Component({
  selector: 'lib-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit, OnChanges {

  // @Input() mapId: string;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() bboxPolygon: any;
  @Input() shapePolygon: any;

  @Output() geoJson = new EventEmitter();

  private map;
  private userCenterMarker;

  private drawnLayers: any[];
  private locationBoundingBox;

  private editableLayers = new L.FeatureGroup();
  private options = {
    position: 'topright',
    draw: {
      marker: {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      },
      // rectangle: { showArea: false }, // disable showArea
      rectangle: false,
      polyline: false,
      polygon: true,
      circlemarker: false
    },
    edit: {
      featureGroup: this.editableLayers, // REQUIRED!!
      remove: true
    }
  };

  constructor() { }

  ngOnInit(): void {
    this.drawnLayers = [];

    // initialize Leaflet
    this.map = L.map('mapid', {
      center: [this.latitude, this.longitude],
      zoom: 6,
      scrollWheelZoom: true
    });

    // add the OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Center Marker
    // this.userCenterMarker = L.marker([this.latitude, this.longitude]).addTo(this.map);

    // show the scale bar on the lower left corner
    L.control.scale().addTo(this.map);

    // Automatically defines Leaflet.draw to the specified language
    drawLocales('it');

    this.map.addLayer(this.editableLayers);

    const drawControl = new L.Control.Draw(this.options);
    this.map.addControl(drawControl);

    this.map.on(L.Draw.Event.CREATED, (e) => {
      this.drawnLayers.push({ layer: e.layer, type: e.layerType });

      this.editableLayers.addLayer(e.layer);

      // Output GeoJSON
      this.updateMapGeoJson();
    });

    this.map.on(L.Draw.Event.DELETED, (e) => {
      e.layers.eachLayer(layer => {
        let lyIndex = -1;
        this.drawnLayers.forEach((value, index) => {
          if (value.layer._leaflet_id === layer._leaflet_id) {
            lyIndex = index;
          }
        });

        if (lyIndex > -1) {
          this.drawnLayers.splice(lyIndex, 1);
        }

        if (this.locationBoundingBox?._leaflet_id === layer._leaflet_id) {
          this.locationBoundingBox = null;
        }

        if (this.userCenterMarker?._leaflet_id === layer._leaflet_id) {
          this.userCenterMarker = null;
        }
      });

      this.updateMapGeoJson();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map && (changes.latitude || changes.longitude)) {
      this.map.setView([this.latitude, this.longitude], 6);

      if (this.userCenterMarker) {
        this.map.removeLayer(this.userCenterMarker);
      }

      this.userCenterMarker = L.marker(
        [this.latitude, this.longitude],
        {
          icon: L.icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'assets/marker-icon.png',
            shadowUrl: 'assets/marker-shadow.png'
          })
        });

      this.editableLayers.addLayer(this.userCenterMarker);
    }

    if (changes.bboxPolygon && this.bboxPolygon?.coordinates) {
      const bbox = this.getBoundBoxFromPolygon(this.bboxPolygon.coordinates);

      if (this.locationBoundingBox) {
        this.map.removeLayer(this.locationBoundingBox);
      }

      // add the bounding box to the map, and set the map extent to it
      // this.locationBoundingBox = L.rectangle(bbox);
      // this.editableLayers.addLayer(this.locationBoundingBox);
      this.map.fitBounds(bbox);
    }

    if (changes.shapePolygon && this.shapePolygon?.coordinates) {
      this.locationBoundingBox = L.geoJSON(this.shapePolygon);
      this.editableLayers.addLayer(this.locationBoundingBox);
    }

    this.updateMapGeoJson();
  }

  getBoundBoxFromPolygon(coordinates) {
    const lats = [];
    const lngs = [];

    for (const coordinate of coordinates[0]) {
      lats.push(coordinate[1]);
      lngs.push(coordinate[0]);
    }

    // calc the min and max lng and lat
    const minlat = Math.min.apply(null, lats);
    const maxlat = Math.max.apply(null, lats);
    const minlng = Math.min.apply(null, lngs);
    const maxlng = Math.max.apply(null, lngs);

    // create a bounding rectangle that can be used in leaflet
    return [[minlat, minlng], [maxlat, maxlng]];
  }

  layerToGeoJson(layer: any, layerType: any) {
    const geoJson = layer.toGeoJSON();
    if (layerType === 'circle') {
      const radius = layer.getRadius();
      geoJson.properties.radius = radius;
    }

    return geoJson;
  }

  updateMapGeoJson() {
    const drawnLayersGeoJson = [];

    if (this.drawnLayers) {
      this.drawnLayers.forEach(e => {
        const geojson = this.layerToGeoJson(e.layer, e.type);
        drawnLayersGeoJson.push(geojson);
      });
    }

    if (this.userCenterMarker) {
      drawnLayersGeoJson.push(this.userCenterMarker.toGeoJSON());
    }

    if (this.locationBoundingBox) {
      drawnLayersGeoJson.push(this.locationBoundingBox.toGeoJSON());
    }

    this.geoJson.emit(drawnLayersGeoJson);
  }
}
