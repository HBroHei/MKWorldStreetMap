import GeoJSON from 'ol/format/GeoJSON';
import ImageLayer from 'ol/layer/Image';
import VectorLayer from 'ol/layer/Vector';
import { Style, Stroke, Circle, Fill } from 'ol/style';
import ImageStatic from 'ol/source/ImageStatic';
import VectorSource from 'ol/source/Vector';

// GeoJSON files
import {json_mkworldbuild_4} from './mkworldbuild_4';
import {json_mkworldbuildover_6} from './mkworldbuildover_6';
import {json_mkworldlands_2} from './mkworldlands_2';
import {json_mkworldplacelbl_8} from './mkworldplacelbl_8';
import {json_mkworldriver_3} from './mkworldriver_3';
import {json_mkworldroad_5} from './mkworldroad_5';
import {json_mkworldroads_over_7} from './mkworldroads_over_7';

// Map style files
import {style_mkworldbuild_4} from '../styles/mkworldbuild_4_style';
import {style_mkworldlands_2} from '../styles/mkworldlands_2_style';
import {style_mkworldplacelbl_8} from '../styles/mkworldplacelbl_8_style';
import {style_mkworldriver_3} from '../styles/mkworldriver_3_style';
import {style_mkworldroad_5} from '../styles/mkworldroad_5_style';

export var wms_layers = [];

export var lyr_Full_Map_Roads_0 = new ImageLayer({
    opacity: 1,
    title: 'Full_Map_Roads<br />',
    source: new ImageStatic({
        url: "./layers/Full_Map_Roads_0.png",
        attributions: ' ',
        projection: 'EPSG:3857',
        alwaysInRange: true,
        imageExtent: [-0.150404, -4240.735574, 4848.920933, -3.076554]
    })
});

export var lyr_satelite_yt = new ImageLayer({
    opacity: 1,
    title: 'Screenshot 2026-07-06 at 11.07.04 PM_modified<br />',
    source: new ImageStatic({
        url: "./src/layers/satelite_yt.png",
        attributions: ' ',
        projection: 'EPSG:3857',
        alwaysInRange: true,
        imageExtent: [-42.800276, -4622.971670, 4908.544709, 492.688267]
    })
});

var format_mkworldlands_2 = new GeoJSON();
var features_mkworldlands_2 = format_mkworldlands_2.readFeatures(json_mkworldlands_2, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_mkworldlands_2 = new VectorSource({
    attributions: ' ',
});
jsonSource_mkworldlands_2.addFeatures(features_mkworldlands_2);

export var lyr_mkworldlands_2 = new VectorLayer({
    declutter: false,
    source: jsonSource_mkworldlands_2,
    style: style_mkworldlands_2,
    popuplayertitle: 'mkworldlands',
    interactive: false,
    title: 'mkworldlands<br />\
    <img src="./src/styles/legend/mkworldlands_2_0.png" /> land<br />\
    <img src="./src/styles/legend/mkworldlands_2_1.png" /> aland<br />\
    <img src="./src/styles/legend/mkworldlands_2_2.png" /> dland<br />\
    <img src="./src/styles/legend/mkworldlands_2_3.png" /> gland<br />\
    <img src="./src/styles/legend/mkworldlands_2_4.png" /> iland<br />\
    <img src="./src/styles/legend/mkworldlands_2_5.png" /> lland<br />\
    <img src="./src/styles/legend/mkworldlands_2_6.png" /> sea<br />\
    <img src="./src/styles/legend/mkworldlands_2_7.png" /> <br />'
});

var format_mkworldriver_3 = new GeoJSON();
var features_mkworldriver_3 = format_mkworldriver_3.readFeatures(json_mkworldriver_3, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_mkworldriver_3 = new VectorSource({
    attributions: ' ',
});
jsonSource_mkworldriver_3.addFeatures(features_mkworldriver_3);

export var lyr_mkworldriver_3 = new VectorLayer({
    declutter: false,
    source: jsonSource_mkworldriver_3,
    style: style_mkworldriver_3,
    popuplayertitle: 'mkworldriver',
    interactive: false,
    title: '<img src="./src/styles/legend/mkworldriver_3.png" /> mkworldriver'
});

var format_mkworldbuild_4 = new GeoJSON();
var features_mkworldbuild_4 = format_mkworldbuild_4.readFeatures(json_mkworldbuild_4, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_mkworldbuild_4 = new VectorSource({
    attributions: ' ',
});
jsonSource_mkworldbuild_4.addFeatures(features_mkworldbuild_4);

export var lyr_mkworldbuild_4 = new VectorLayer({
    declutter: false,
    source: jsonSource_mkworldbuild_4,
    style: style_mkworldbuild_4,
    popuplayertitle: 'mkworldbuild',
    interactive: true,
    title: 'mkworldbuild<br />\
    <img src="./src/styles/legend/mkworldbuild_4_0.png" /> <br />\
    <img src="./src/styles/legend/mkworldbuild_4_1.png" /> gas<br />\
    <img src="./src/styles/legend/mkworldbuild_4_2.png" /> wip<br />\
    <img src="./src/styles/legend/mkworldbuild_4_3.png" /> yoshi<br />'
});

var format_mkworldroad_5 = new GeoJSON();
var features_mkworldroad_5 = format_mkworldroad_5.readFeatures(json_mkworldroad_5, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
export var jsonSource_mkworldroad_5 = new VectorSource({
    attributions: ' ',
});
jsonSource_mkworldroad_5.addFeatures(features_mkworldroad_5);

export var lyr_mkworldroad_5 = new VectorLayer({
    declutter: false,
    source: jsonSource_mkworldroad_5,
    style: style_mkworldroad_5,
    popuplayertitle: 'mkworldroad',
    interactive: false,
    title: 'mkworldroad<br />\
    <img src="./src/styles/legend/mkworldroad_5_0.png" /> Canal<br>\
    <img src="./src/styles/legend/mkworldroad_5_3.png" /> Dirt Road<br>\
    <img src="./src/styles/legend/mkworldroad_5_4.png" /> Highway<br>\
    <img src="./src/styles/legend/mkworldroad_5_7.png" /> Paved Road<br>\
    <img src="./src/styles/legend/mkworldroad_5_8.png" /> Rail Tracks<br>'
});

var format_mkworldbuildover_6 = new GeoJSON();
var features_mkworldbuildover_6 = format_mkworldbuildover_6.readFeatures(json_mkworldbuildover_6, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_mkworldbuildover_6 = new VectorSource({
    attributions: ' ',
});
jsonSource_mkworldbuildover_6.addFeatures(features_mkworldbuildover_6);

export var lyr_mkworldbuildover_6 = new VectorLayer({
    declutter: false,
    source: jsonSource_mkworldbuildover_6,
    style: style_mkworldbuild_4,
    popuplayertitle: 'mkworldbuild over',
    interactive: true,
    title: 'mkworldbuild over<br />\
    <img src="./src/styles/legend/mkworldbuildover_6_0.png" /> <br />\
    <img src="./src/styles/legend/mkworldbuildover_6_1.png" /> Gas Station<br />\
    <img src="./src/styles/legend/mkworldbuildover_6_2.png" /> Construction Site<br />\
    <img src="./src/styles/legend/mkworldbuildover_6_3.png" /> Yoshi\'s<br />'
});

var format_mkworldroads_over_7 = new GeoJSON();
var features_mkworldroads_over_7 = format_mkworldroads_over_7.readFeatures(json_mkworldroads_over_7, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_mkworldroads_over_7 = new VectorSource({
    attributions: ' ',
});
jsonSource_mkworldroads_over_7.addFeatures(features_mkworldroads_over_7);

export var lyr_mkworldroads_over_7 = new VectorLayer({
    declutter: false,
    source: jsonSource_mkworldroads_over_7,
    style: style_mkworldroad_5,
    popuplayertitle: 'mkworldroads_over',
    interactive: false,
    title: 'mkworldroads_over<br />\
    <img src="./src/styles/legend/mkworldroads_over_7_0.png" /> canal<br />\
    <img src="./src/styles/legend/mkworldroads_over_7_1.png" /> des_l<br />\
    <img src="./src/styles/legend/mkworldroads_over_7_2.png" /> des_m<br />\
    <img src="./src/styles/legend/mkworldroads_over_7_3.png" /> des_s<br />\
    <img src="./src/styles/legend/mkworldroads_over_7_4.png" /> hway<br />\
    <img src="./src/styles/legend/mkworldroads_over_7_5.png" /> rd_l<br />\
    <img src="./src/styles/legend/mkworldroads_over_7_6.png" /> rd_m<br />\
    <img src="./src/styles/legend/mkworldroads_over_7_7.png" /> rd_s<br />\
    <img src="./src/styles/legend/mkworldroads_over_7_8.png" /> rail<br />'
});

var format_mkworldplacelbl_8 = new GeoJSON();
var features_mkworldplacelbl_8 = format_mkworldplacelbl_8.readFeatures(json_mkworldplacelbl_8, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_mkworldplacelbl_8 = new VectorSource({
    attributions: ' ',
});
jsonSource_mkworldplacelbl_8.addFeatures(features_mkworldplacelbl_8);

export var lyr_mkworldplacelbl_8 = new VectorLayer({
    declutter: false,
    source: jsonSource_mkworldplacelbl_8,
    style: style_mkworldplacelbl_8,
    popuplayertitle: 'mkworldplacelbl',
    interactive: false,
    title: 'mkworldplacelbl'
});

lyr_Full_Map_Roads_0.setVisible(true);
lyr_satelite_yt.setVisible(false);
lyr_mkworldlands_2.setVisible(true);
lyr_mkworldriver_3.setVisible(true);
lyr_mkworldbuild_4.setVisible(true);
lyr_mkworldroad_5.setVisible(true);
lyr_mkworldbuildover_6.setVisible(true);
lyr_mkworldroads_over_7.setVisible(true);
lyr_mkworldplacelbl_8.setVisible(true);

// Point selected layer
export const pointSelectSource = new VectorSource();
export const pointLayer = new VectorLayer({
    source: pointSelectSource,
    style: new Style({
        image: new Circle({
            radius: 6,
            fill: new Fill({
                color: '#ff3333'
            }),
            stroke: new Stroke({
                color: '#ffffff', width: 2
            })
        })
    })
});

export var layersList = [
    lyr_mkworldlands_2,
    lyr_mkworldriver_3,
    lyr_mkworldbuild_4,
    lyr_mkworldroad_5,
    lyr_mkworldbuildover_6,
    lyr_mkworldroads_over_7,
    lyr_mkworldplacelbl_8,
    pointLayer
];

lyr_mkworldlands_2.set('fieldAliases', { 'id': 'id', 'desc': 'desc', 'type': 'type' });
lyr_mkworldriver_3.set('fieldAliases', { 'name': 'name', 'id': 'id' });
lyr_mkworldbuild_4.set('fieldAliases', { 'type': 'type', 'priority': 'priority', 'over': 'over', 'showtype': 'showtype', 'text': 'text' });
lyr_mkworldroad_5.set('fieldAliases', { 'id': 'id', 'type': 'type', 'priority': 'priority', 'name': 'name', 'over_build': 'over_build' });
lyr_mkworldbuildover_6.set('fieldAliases', { 'type': 'type', 'priority': 'priority', 'over': 'over', 'showtype': 'showtype', 'text': 'text' });
lyr_mkworldroads_over_7.set('fieldAliases', { 'id': 'id', 'type': 'type', 'priority': 'priority', 'name': 'name', 'over_build': 'over_build' });
lyr_mkworldplacelbl_8.set('fieldAliases', { 'id': 'id', 'Text': 'Text', 'showtype': 'showtype' });

lyr_mkworldlands_2.set('fieldImages', { 'id': 'TextEdit', 'desc': 'TextEdit', 'type': '' });
lyr_mkworldriver_3.set('fieldImages', { 'name': '', 'id': '' });
lyr_mkworldbuild_4.set('fieldImages', { 'type': 'TextEdit', 'priority': 'Range', 'over': 'CheckBox', 'showtype': 'TextEdit', 'text': 'TextEdit' });
lyr_mkworldroad_5.set('fieldImages', { 'id': 'TextEdit', 'type': 'TextEdit', 'priority': 'Range', 'name': 'TextEdit', 'over_build': 'CheckBox' });
lyr_mkworldbuildover_6.set('fieldImages', { 'type': 'TextEdit', 'priority': 'Range', 'over': 'CheckBox', 'showtype': 'TextEdit', 'text': 'TextEdit' });
lyr_mkworldroads_over_7.set('fieldImages', { 'id': 'TextEdit', 'type': 'TextEdit', 'priority': 'Range', 'name': 'TextEdit', 'over_build': 'CheckBox' });
lyr_mkworldplacelbl_8.set('fieldImages', { 'id': 'TextEdit', 'Text': 'TextEdit', 'showtype': 'TextEdit' });

lyr_mkworldlands_2.set('fieldLabels', { 'id': 'no label', 'desc': 'header label - always visible', 'type': 'no label' });
lyr_mkworldriver_3.set('fieldLabels', { 'name': 'no label', 'id': 'no label' });
lyr_mkworldbuild_4.set('fieldLabels', { 'type': 'no label', 'priority': 'no label', 'over': 'no label', 'showtype': 'no label', 'text': 'no label' });
lyr_mkworldroad_5.set('fieldLabels', { 'id': 'inline label - visible with data', 'type': 'no label', 'priority': 'no label', 'name': 'header label - visible with data', 'over_build': 'no label' });
lyr_mkworldbuildover_6.set('fieldLabels', { 'type': 'no label', 'priority': 'no label', 'over': 'no label', 'showtype': 'no label', 'text': 'no label' });
lyr_mkworldroads_over_7.set('fieldLabels', { 'id': 'inline label - visible with data', 'type': 'no label', 'priority': 'no label', 'name': 'header label - visible with data', 'over_build': 'no label' });
lyr_mkworldplacelbl_8.set('fieldLabels', { 'id': 'no label', 'Text': 'no label', 'showtype': 'no label' });

lyr_mkworldplacelbl_8.on('precompose', function (evt) {
    evt.context.globalCompositeOperation = 'normal';
});