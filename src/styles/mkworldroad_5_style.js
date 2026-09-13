import { createTextStyle } from "../resources/functions";
import { Style, Stroke } from "ol/style";

var size = 0;
var placement = 'point';
function categories_mkworldroad_5(feature, value, size, resolution, labelText,
                       labelFont, labelFill, bufferColor, bufferWidth,
                       placement, textAlign, offsetX, offsetY, overflow, repeat) {
    var valueStr = (value !== null && value !== undefined) ? value.toString() : 'default';
    switch(valueStr) {
        default:
            return [ new Style({
                stroke: new Stroke({color: 'rgba(14,88,193,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 12.26 / resolution}),
                text: createTextStyle(feature, resolution, labelText, labelFont, labelFill, placement, bufferColor, bufferWidth, textAlign, offsetX, offsetY, overflow, repeat)
            })];
            break;

        case 'canal':
            return [ new Style({
                stroke: new Stroke({color: 'rgba(166,206,227,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 18.0 / resolution}),
                text: createTextStyle(feature, resolution, labelText, labelFont, labelFill, placement, bufferColor, bufferWidth, textAlign, offsetX, offsetY, overflow, repeat)
            })];
            break;

        case 'des_l':
            return [ new Style({
                stroke: new Stroke({color: 'rgba(253,191,111,1.0)', lineDash: null, lineCap: 'round', lineJoin: 'round', width: 15.0 / resolution}),
                text: createTextStyle(feature, resolution, labelText, labelFont, labelFill, placement, bufferColor, bufferWidth, textAlign, offsetX, offsetY, overflow, repeat)
            })];
            break;

        case 'des_m':
            return [ new Style({
                stroke: new Stroke({color: 'rgba(253,191,111,1.0)', lineDash: null, lineCap: 'round', lineJoin: 'round', width: 12.0 / resolution}),
                text: createTextStyle(feature, resolution, labelText, labelFont, labelFill, placement, bufferColor, bufferWidth, textAlign, offsetX, offsetY, overflow, repeat)
            })];
            break;

        case 'des_s':
            return [ new Style({
                stroke: new Stroke({color: 'rgba(253,191,111,1.0)', lineDash: null, lineCap: 'round', lineJoin: 'round', width: 8.0 / resolution}),
                text: createTextStyle(feature, resolution, labelText, labelFont, labelFill, placement, bufferColor, bufferWidth, textAlign, offsetX, offsetY, overflow, repeat)
            })];
            break;

        case 'hway':
            return [ new Style({
                stroke: new Stroke({color: 'rgba(251,154,153,1.0)', lineDash: null, lineCap: 'round', lineJoin: 'round', width: 16.5 / resolution}),
                text: createTextStyle(feature, resolution, labelText, labelFont, labelFill, placement, bufferColor, bufferWidth, textAlign, offsetX, offsetY, overflow, repeat)
            })];
            break;

        case 'rd_l':
            return [ new Style({
                stroke: new Stroke({color: 'rgba(255,255,255,1.0)', lineDash: null, lineCap: 'round', lineJoin: 'round', width: 15.0 / resolution}),
                text: createTextStyle(feature, resolution, labelText, labelFont, labelFill, placement, bufferColor, bufferWidth, textAlign, offsetX, offsetY, overflow, repeat)
            })];
            break;

        case 'rd_m':
            return [ new Style({
                stroke: new Stroke({color: 'rgba(255,255,255,1.0)', lineDash: null, lineCap: 'round', lineJoin: 'round', width: 12.0 / resolution}),
                text: createTextStyle(feature, resolution, labelText, labelFont, labelFill, placement, bufferColor, bufferWidth, textAlign, offsetX, offsetY, overflow, repeat)
            })];
            break;

        case 'rd_s':
            return [ new Style({
                stroke: new Stroke({color: 'rgba(255,255,255,1.0)', lineDash: null, lineCap: 'round', lineJoin: 'round', width: 7.0 / resolution}),
                text: createTextStyle(feature, resolution, labelText, labelFont, labelFill, placement, bufferColor, bufferWidth, textAlign, offsetX, offsetY, overflow, repeat)
            })];
            break;

        case 'rail':
            return [ new Style({
                stroke: new Stroke({color: 'rgba(0,0,0,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 5.0 / resolution}),
                text: createTextStyle(feature, resolution, labelText, labelFont, labelFill, placement, bufferColor, bufferWidth, textAlign, offsetX, offsetY, overflow, repeat)
            }), new Style({
                stroke: new Stroke({color: 'rgba(255,255,255,1.0)', lineDash: [49.89172,24.94586], lineCap: 'square', lineJoin: 'bevel', width: 3.0 / resolution}),
                text: createTextStyle(feature, resolution, labelText, labelFont, labelFill, placement, bufferColor, bufferWidth, textAlign, offsetX, offsetY, overflow, repeat)
            })];
            break;
    }
};

export var style_mkworldroad_5 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    
    var labelText = ""; 
    var value = feature.get("type");
    var labelFont = "10px, sans-serif";
    var labelFill = "#000000";
    var bufferColor = "";
    var bufferWidth = 0;
    var textAlign = 'left';
    var offsetX = 8;
    var offsetY = 3;
    var overflow = false;
    var repeat = 0;
    var placement = 'line';
    if ("" !== null) {
        labelText = String("");
    }
    
    var style = categories_mkworldroad_5(feature, value, size, resolution, labelText,
                          labelFont, labelFill, bufferColor,
                          bufferWidth, placement, textAlign, offsetX, offsetY, overflow, repeat);

    return style;
};
