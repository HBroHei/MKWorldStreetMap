import { createTextStyle } from "../resources/functions";
import { Style, Stroke, Fill } from "ol/style";

var size = 0;
var placement = 'point';

export var style_mkworldriver_3 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    
    var labelText = ""; 
    var value = feature.get("");
    var labelFont = "10px, sans-serif";
    var labelFill = "#000000";
    var bufferColor = "";
    var bufferWidth = 0;
    var textAlign = 'left';
    var offsetX = 8;
    var offsetY = 3;
    var overflow = false;
    var repeat = 0;
    var placement = 'point';
    if ("" !== null) {
        labelText = String("");
    }
    var style = [ new Style({
        stroke: new Stroke({color: 'rgba(35,35,35,0.496)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0.988}),fill: new Fill({color: 'rgba(166,206,227,0.496)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth, textAlign, offsetX, offsetY, overflow, repeat)
    })];

    return style;
};
