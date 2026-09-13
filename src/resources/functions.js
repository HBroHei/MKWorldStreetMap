import { Text, Fill, Stroke } from 'ol/style';

export var createTextStyle = function(feature, resolution, labelText, labelFont,
                               labelFill, placement, bufferColor,
                               bufferWidth, textAlign, offsetX, offsetY, overflow, repeat) {

    const showtype = feature.get("showtype") ?? "hidden";
    // Check if need to show text
    if (feature.hide || !labelText || showtype==="hidden") {
        return; 
    }

    // Check if text need to be shown at current scale
    if(showtype==="in" && resolution>1){
        return;
    }
    if(showtype==="out" && resolution<=1){
        return;
    }
    
    if (bufferWidth == 0) {
        var bufferStyle = null;
    } else {
        var bufferStyle = new Stroke({
            color: bufferColor,
            width: bufferWidth
        })
    }
    
    var textStyle = new Text({
        font: labelFont,
        text: labelText,
        textBaseline: "middle",
        textAlign: textAlign,
        offsetX: offsetX,
        offsetY: offsetY,
        placement: placement,
        overflow: overflow,
        repeat: repeat,
        maxAngle: 0,
        fill: new Fill({
          color: labelFill
        }),
        stroke: bufferStyle
    });

    return textStyle;
};

export function stripe(stripeWidth, gapWidth, angle, color) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = screen.width;
    canvas.height = stripeWidth + gapWidth;
    context.fillStyle = color;
    context.lineWidth = stripeWidth;
    context.fillRect(0, 0, canvas.width, stripeWidth);
    innerPattern = context.createPattern(canvas, 'repeat');

    var outerCanvas = document.createElement('canvas');
    var outerContext = outerCanvas.getContext('2d');
    outerCanvas.width = screen.width;
    outerCanvas.height = screen.height;
    outerContext.rotate((Math.PI / 180) * angle);
    outerContext.translate(-(screen.width/2), -(screen.height/2));
    outerContext.fillStyle = innerPattern;
    outerContext.fillRect(0,0,screen.width,screen.height);

    return outerContext.createPattern(outerCanvas, 'no-repeat');
};
