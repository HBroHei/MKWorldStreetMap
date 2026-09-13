import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Overlay from 'ol/Overlay';
import Collection from 'ol/Collection';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Control from 'ol/control/Control';
import Attribution from 'ol/control/Attribution';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Circle from 'ol/style/Circle';
import { toLonLat, fromLonLat } from 'ol/proj';
import { getCenter } from 'ol/extent';

import { layersList, lyr_mkworldbuild_4, pointSelectSource } from '../layers/layers.js'; 
import { buildInfo } from './building-info.js';

var ignoreFeatureClick = false;
export function setIgnoreFeatureClick(val){
    ignoreFeatureClick = val;
}

export var map = new Map({
    target: 'map',
    renderer: 'canvas',
    layers: layersList,
    view: new View({
        maxZoom: 22,
        minZoom: 10
    })
});

// initial view - epsg:3857 coordinates if not "Match project CRS"
map.getView().fit([1655.995922, -3338.650938, 2215.234467, -2817.451231], map.getSize());

// full zooms only
map.getView().setProperties({ constrainResolution: true });

// change cursor
function pointerOnFeature(evt) {
    if (evt.dragging) {
        return;
    }
    var hasFeature = map.hasFeatureAtPixel(evt.pixel, {
        layerFilter: function (layer) {
            return layer && (layer.get("interactive"));
        }
    });
    map.getViewport().style.cursor = hasFeature ? "pointer" : "";
}
map.on('pointermove', pointerOnFeature);

function styleCursorMove() {
    map.on('pointerdrag', function () {
        map.getViewport().style.cursor = "move";
    });
    map.on('pointerup', function () {
        map.getViewport().style.cursor = "default";
    });
}
styleCursorMove();

//// small screen definition
var hasTouchScreen = map.getViewport().classList.contains('ol-touch');
var isSmallScreen = window.innerWidth < 650;

//// controls container

// top left container
var topLeftContainer = new Control({
    element: (() => {
        var topLeftContainer = document.createElement('div');
        topLeftContainer.id = 'top-left-container';
        return topLeftContainer;
    })(),
});
map.addControl(topLeftContainer);

// bottom left container
var bottomLeftContainer = new Control({
    element: (() => {
        var bottomLeftContainer = document.createElement('div');
        bottomLeftContainer.id = 'bottom-left-container';
        return bottomLeftContainer;
    })(),
});
map.addControl(bottomLeftContainer);

// top right container
var topRightContainer = new Control({
    element: (() => {
        var topRightContainer = document.createElement('div');
        topRightContainer.id = 'top-right-container';
        return topRightContainer;
    })(),
});
map.addControl(topRightContainer);

// bottom right container
var bottomRightContainer = new Control({
    element: (() => {
        var bottomRightContainer = document.createElement('div');
        bottomRightContainer.id = 'bottom-right-container';
        return bottomRightContainer;
    })(),
});
map.addControl(bottomRightContainer);

// popup
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
// var closer = document.getElementById('popup-closer');
var sketch;

const resList = document.getElementById("ul-search-res");

var infoDiv = document.getElementById("div-info");
// Place Image
var infoImg = document.getElementById("img-info");
var infoImgM = document.getElementById("img-info-m");
var detailImgM = document.getElementById("img-detail-m");
// Place Info Box
var infoTitleSpan = document.getElementById("span-info-title");
var infoTitleSpanM = document.getElementById("span-info-title-m");
var detailTitleSpanM = document.getElementById("span-detail-title-m");

var infoDesc = document.getElementById("p-info");
var detailDesc = document.getElementById("p-info-m");
//var infoDescM = document.getElementById("span-info-title-m");

function setInfoSpan(id, txt) {
    const placeInfo = buildInfo[id] ?? {img : null, info : null};

    infoTitleSpan.textContent = txt;
    infoTitleSpanM.textContent = txt;
    detailTitleSpanM.textContent = txt;

    infoImg.src = "./images/poi/" + (placeInfo.img ?? "unknown.png");
    infoImgM.src = "./images/poi/" + (placeInfo.img ?? "unknown.png");
    detailImgM.src = "./images/poi/" + (placeInfo.img ?? "unknown.png");
    
    infoDesc.innerHTML = placeInfo.info ?? txt;
    detailDesc.innerHTML = placeInfo.info ?? txt;
}

function stopMediaInPopup() {
    var mediaElements = container.querySelectorAll('audio, video');
    mediaElements.forEach(function (media) {
        media.pause();
        media.currentTime = 0;
    });
}

function closePopup() {
    container.style.display = 'none';
    // closer.blur();
    stopMediaInPopup();
    return false;
}

var overlayPopup = new Overlay({
    element: container,
    autoPan: true
});
map.addOverlay(overlayPopup);

var NO_POPUP = 0;
var ALL_FIELDS = 1;

/**
 * Returns either NO_POPUP, ALL_FIELDS or the name of a single field to use for
 * a given layer
 * @param layerList {Array} List of Layer instances
 * @param layer {Layer} Layer to find field info about
 */
function getPopupFields(layerList, layer) {
    var idx = layersList.indexOf(layer) - (layersList.length - popupLayers.length);
    return popupLayers[idx];
}

// highlight collection
var collection = new Collection();
var featureOverlay = new VectorLayer({
    map: map,
    source: new VectorSource({
        features: collection,
        useSpatialIndex: false
    }),
    style: [new Style({
        stroke: new Stroke({
            color: '#f00',
            width: 1
        }),
        fill: new Fill({
            color: 'rgba(255,0,0,0.1)'
        }),
    })],
    updateWhileAnimating: true,
    updateWhileInteracting: true
});

var doHighlight = false;
var doHover = false;

var highlight;

function onPointerMove(evt) {
    if (!doHover && !doHighlight) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var currentFeature;
    var currentLayer;
    var currentFeatureKeys;
    var clusteredFeatures;
    var clusterLength;
    var popupText = '<ul>';

    // Collect all features and their layers at the pixel
    var featuresAndLayers = [];
    map.forEachFeatureAtPixel(pixel, function (feature, layer) {
        if (layer && feature instanceof Feature && (layer.get("interactive") || layer.get("interactive") === undefined)) {
            featuresAndLayers.push({ feature, layer });
        }
    });

    // Iterate over the features and layers in reverse order
    for (var i = featuresAndLayers.length - 1; i >= 0; i--) {
        var feature = featuresAndLayers[i].feature;
        var layer = featuresAndLayers[i].layer;
        var doPopup = false;
        // Check if need to show popup
        for (let k in layer.get('fieldImages')) {
            if (layer.get('fieldImages')[k] != "Hidden") {
                doPopup = true;
            }
        }
        currentFeature = feature;
        currentLayer = layer;
        clusteredFeatures = feature.get("features");
        if (clusteredFeatures) {
            clusterLength = clusteredFeatures.length;
        }
        if (typeof clusteredFeatures !== "undefined") {
            if (doPopup) {
                for (var n = 0; n < clusteredFeatures.length; n++) {
                    currentFeature = clusteredFeatures[n];
                    currentFeatureKeys = currentFeature.getKeys();
                    popupText += '<li><table>';
                    popupText += '<a><b>' + layer.get('popuplayertitle') + '</b></a>';
                    //popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                    popupText += '</table></li>';
                }
            }
        } else {
            console.log("Hello");
            currentFeatureKeys = currentFeature.getKeys();
            if (doPopup) {
                popupText += '<li><table>';
                popupText += '<a><b>' + layer.get('popuplayertitle') + '</b></a>';
                //popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                popupText += '</table></li>';
            }
        }
    }

    if (popupText == '<ul>') {
        popupText = '';
    } else {
        popupText += '</ul>';
    }

    // Highlight feature
    if (doHighlight) {
        if (currentFeature !== highlight) {
            if (highlight) {
                featureOverlay.getSource().removeFeature(highlight);
            }
            if (currentFeature) {
                var featureStyle;
                var highlightStyle;
                if (typeof clusteredFeatures == "undefined") {
                    var style = currentLayer.getStyle();
                    var styleFunction = typeof style === 'function' ? style : function () { return style; };
                    featureStyle = styleFunction(currentFeature)[0];
                } else {
                    featureStyle = currentLayer.getStyle().toString();
                }

                if (currentFeature.getGeometry().getType() == 'Point' || currentFeature.getGeometry().getType() == 'MultiPoint') {
                    var radius;
                    if (typeof clusteredFeatures == "undefined") {
                        radius = featureStyle.getImage().getRadius();
                    } else {
                        radius = parseFloat(featureStyle.split('radius')[1].split(' ')[1]) + clusterLength;
                    }

                    highlightStyle = new Style({
                        image: new Circle({
                            fill: new Fill({
                                color: "rgba(255, 255, 0, 1.00)"
                            }),
                            radius: radius
                        })
                    });
                } else if (currentFeature.getGeometry().getType() == 'LineString' || currentFeature.getGeometry().getType() == 'MultiLineString') {
                    var featureWidth = featureStyle.getStroke().getWidth();

                    highlightStyle = new Style({
                        stroke: new Stroke({
                            color: 'rgba(255, 255, 0, 1.00)',
                            lineDash: null,
                            width: featureWidth
                        })
                    });

                } else {
                    highlightStyle = new Style({
                        fill: new Fill({
                            color: 'rgba(255, 255, 0, 1.00)'
                        })
                    });
                }
                featureOverlay.getSource().addFeature(currentFeature);
                featureOverlay.setStyle(highlightStyle);
            }
            highlight = currentFeature;
        }
    }

    if (doHover) {
        if (popupText) {
            content.innerHTML = popupText;
            container.style.display = 'block';
            overlayPopup.setPosition(coord);
        } else {
            container.style.display = 'none';
            // closer.blur();
        }
    }
}

map.on('pointermove', onPointerMove);

var popupContent = '';
var popupCoord = null;
var featuresPopupActive = false;
var featureSelected = [];
export function getFeatureSelected(){
    return featureSelected;
}

function updatePopup() {
    if (popupContent) {
        content.innerHTML = popupContent;
        container.style.display = 'block';
        overlayPopup.setPosition(popupCoord);
    } else {
        container.style.display = 'none';
        // closer.blur();
        stopMediaInPopup();
    }
}

function showFeatureInfo(currentFeature, doPopup){
    const currentFeatureKeys = currentFeature.getKeys();
    if (doPopup && currentFeature.get("showtype") !== "hidden") {
        console.log(currentFeature.get("id"));
        resList.classList.add("hidden");
        document.getElementById("div-route-finder").classList.add('hidden');
        document.getElementById("div-topbar").classList.add('hidden');
        // Change About to About location
        document.getElementById("btn-about").style.backgroundImage = "url('images/aboutloc.png')";
        document.getElementById("btn-routes").style.backgroundImage = "url('images/routehere.png')";
        document.getElementById("btn-about").innerHTML = "<span>Location<br>Detail</span>";
        document.getElementById("btn-routes").innerHTML = "<span>Direction<br>to here</span>";
        
        setInfoSpan(currentFeature.get("id"), currentFeature.get("text"));
        infoDiv.classList.add("showinfo");

        // Pan to feature
        const featureCentre = getCenter(currentFeature.getGeometry().getExtent());
        console.log(featureCentre);
        map.getView().fit(currentFeature.getGeometry());
        
        // Highlight point
        featureSelected.push(currentFeature);
        // Add point
        pointSelectSource.addFeature(new Feature({
            geometry: new Point(featureCentre)
        }));
    }
}

function onSingleClickFeatures(evt) {
    if (doHover || sketch || ignoreFeatureClick) {
        return;
    }
    featuresPopupActive = true;
    infoDiv.classList.remove("showinfo");
    resList.classList.add("hidden");
    document.getElementById("div-topbar").classList.remove('hidden');
    document.getElementById("btn-about").style.backgroundImage = "url('images/about.png')";
    document.getElementById("btn-routes").style.backgroundImage = "url('images/route.png')";
    document.getElementById("btn-about").innerHTML = "<span>About</span>";
    document.getElementById("btn-routes").innerHTML = "<span>Route</span>";

    featureSelected = [];
    pointSelectSource.clear();
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var currentFeature;
    var currentFeatureKeys;
    var clusteredFeatures;

    map.forEachFeatureAtPixel(pixel, function (feature, layer) {
        // Skip when array not empty
        if(featureSelected.length>0) return;
        console.log(feature.get("showtype"));
        if (layer && feature instanceof Feature && (layer.get("interactive") || layer.get("interactive") === undefined)) {
            var doPopup = false;
            // Check if needed to show popup
            for (var k in layer.get('fieldImages')) {
                if (layer.get('fieldImages')[k] !== "Hidden") {
                    doPopup = true;
                }
            }
            currentFeature = feature;
            clusteredFeatures = feature.get("features");
            // Cluster - currently unused
            if (typeof clusteredFeatures !== "undefined") {
                /*if (doPopup) {
                    for (var n = 0; n < clusteredFeatures.length; n++) {
                        currentFeature = clusteredFeatures[n];
                        currentFeatureKeys = currentFeature.getKeys();
                        popupText += '<li><table>';
                        popupText += '<a><b>' + layer.get('popuplayertitle') + '</b></a>';
                        popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                        popupText += '</table></li>';
                    }
                }*/
            }
            else {
                showFeatureInfo(currentFeature, doPopup);
            }
        }
    });
}

map.on('singleclick', onSingleClickFeatures);

// get container
var topLeftContainerDiv = document.getElementById('top-left-container');
var bottomLeftContainerDiv = document.getElementById('bottom-left-container');
var topRightContainerDiv = document.getElementById('top-right-container');
var bottomRightContainerDiv = document.getElementById('bottom-right-container');

// Search function section
export function isIncluded(txt, kw){
    return txt.toLowerCase().includes(kw.toLowerCase());
}

export function addToResList(foundFeat, onItemClick){
    const featData = buildInfo[foundFeat.get('id')]
    
    let resItem = document.createElement("li");
    let resBtn = document.createElement("button");
    let itemImg = document.createElement("img");
    if(featData){
        itemImg.src = "./images/poi/" + (featData.img ?? "unknown.png");
    }
    else{
        itemImg.src = "./images/poi/unknown.png";
    }
    resBtn.appendChild(itemImg);
    // Dummy bg DIV
    let imgBgDiv = document.createElement("div");
    imgBgDiv.style.gridColumn = "1 / span 4";
    imgBgDiv.style.gridRow = "1";
    imgBgDiv.style.backgroundColor = "green";
    imgBgDiv.style.width = "100%";
    imgBgDiv.style.height = "10px";

    let itemTextDiv = document.createElement("div");
    itemTextDiv.classList.add("center-clamp");
    
    let itemHead = document.createElement("h3");
    itemHead.textContent = foundFeat.get('text');
    resBtn.appendChild(itemHead);

    if(featData){
        let itemDesc = document.createElement("p")
        itemDesc.innerHTML = featData.info;
        itemTextDiv.appendChild(itemDesc);
        resBtn.appendChild(itemTextDiv);
    }

    // Set to hightlight feature on button click
    resBtn.addEventListener('click', onItemClick);

    resItem.appendChild(resBtn);
    resList.appendChild(resItem);
}
export function search(keyword_str, btnEvent){
    let keywords = keyword_str.split(" ");

    //Find feature via some(); If dataset becomes large, use forEach below
    let foundFeats = lyr_mkworldbuild_4.getSource().getFeatures().filter(feature =>
        keywords.some(keyword => {
            if(feature.get('showtype')==="hidden") return false;
            if(isIncluded(feature.get('text'), keyword))
                return true;
            else{
                const featId = feature.get("id");
                return buildInfo[featId] && isIncluded(buildInfo[featId].info, keyword)
            }
        })
    );
    /*lyr_mkworldbuild_4.getSource().forEachFeature(feature => {
        const featText = feature.get("text");
        // If feature got thet text, add it
        if(featText.includes(keywords[0])) foundFeats.push(feature);
        
        const featId = feature.get("id");
        
    });*/

    console.log(`${foundFeats.length} result found`);
    // Display result
    resList.innerHTML = "";
    if(foundFeats.length===0){
        resList.innerHTML = `<h2>No result found. Please try another keyword</h2>`
    }
    else{
        for(const foundFeat of foundFeats){
            addToResList(foundFeat, () => {btnEvent(foundFeat);});
        }
    }
    resList.classList.remove("hidden");
}

// Main Search function
document.getElementById("btn-search").addEventListener('click', () => {
    search(document.getElementById("input-search").value, foundFeat => {showFeatureInfo(foundFeat, true)});
});

document.getElementById("input-search").addEventListener('keydown', evt => {
    if(evt.key==="Enter") search(document.getElementById("input-search").value, foundFeat => {showFeatureInfo(foundFeat, true)});
})

// attribution
var bottomAttribution = new Attribution({
    collapsible: false,
    collapsed: false,
    className: 'bottom-attribution'
});
map.addControl(bottomAttribution);

map.once('rendercomplete', function () {
    var bottomAttributionUl = bottomAttribution.element.querySelector('ul');
    bottomAttributionUl.style.textAlign = "left";
    if (bottomAttributionUl) {
        var layerAttrs = Array.from(bottomAttributionUl.querySelectorAll('li'))
            .map(function (li) { return li.innerHTML.trim(); }).filter(Boolean);
        var attribHtml = `Map not drawn to exact scale<br>Project not endorsed nor supported by Nintendo<br>Created by Hammer Bro Hei with 
    <a href="https://github.com/qgis2web/qgis2web">qgis2web</a> &middot;
    <a href="https://openlayers.org/">OpenLayers</a> &middot;
    <a href="https://qgis.org/">QGIS</a>`;
        if (layerAttrs.length > 0) { attribHtml += ' &nbsp;|&nbsp; ' + layerAttrs.join(', '); }
        bottomAttributionUl.innerHTML = '<li>' + attribHtml + '</li>';
    }
});

// Disable "popup on hover" or "highlight on hover" if ol-control mouseover
var preDoHover = doHover;
var preDoHighlight = doHighlight;
var isPopupAllActive = false;
document.addEventListener('DOMContentLoaded', function () {
    if (doHover || doHighlight) {
        var controlElements = document.getElementsByClassName('ol-control');
        for (var i = 0; i < controlElements.length; i++) {
            controlElements[i].addEventListener('mouseover', function () {
                doHover = false;
                doHighlight = false;
            });
            controlElements[i].addEventListener('mouseout', function () {
                doHover = preDoHover;
                if (isPopupAllActive) { return; }
                doHighlight = preDoHighlight;
            });
        }
    }

    // Dismiss loading dialog
    document.getElementById("div-loading").style.display = "none";
});

// move controls inside containers, in order
// zoom
var zoomControl = document.getElementsByClassName('ol-zoom')[0];
if (zoomControl) {
    topLeftContainerDiv.appendChild(zoomControl);
}
// measure
if (typeof measureControl !== 'undefined') {
    topLeftContainerDiv.appendChild(measureControl);
}
// scale line
var scaleLineControl = document.getElementsByClassName('ol-scale-line')[0];
if (scaleLineControl) {
    scaleLineControl.className += ' ol-control';
    bottomLeftContainerDiv.appendChild(scaleLineControl);
}

// About Page
document.getElementById("btn-about").addEventListener('click', () => {
    if(featureSelected.length>0){
        document.getElementById("div-detail-container").classList.toggle("hidden");
        document.getElementById("div-detail").classList.toggle("hidden");
    }
    else{
        document.getElementById("div-about-container").classList.toggle("hidden");
        document.getElementById("div-about").classList.toggle("hidden");
    }
});
document.getElementById("btn-about-d").addEventListener('click', () => {
    document.getElementById("div-about-container").classList.toggle("hidden");
    document.getElementById("div-about").classList.toggle("hidden");
});
document.getElementById("btn-about-close").addEventListener('click', () => {
    document.getElementById("div-about-container").classList.toggle("hidden");
    document.getElementById("div-about").classList.toggle("hidden");
});
document.getElementById("btn-detail-close").addEventListener('click', () => {
    document.getElementById("div-detail-container").classList.toggle("hidden");
    document.getElementById("div-detail").classList.toggle("hidden");
});