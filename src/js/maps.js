import {
    globalData
} from "./conf";

import {
    shoot
} from "./utils";

import AlBasrahURL from "../img/heightmaps/al basrah.jpg";
import AnvilURL from "../img/heightmaps/anvil.jpg";
import BelayaURL from "../img/heightmaps/belaya.jpg";
import BlackCoastURL from "../img/heightmaps/black coast.jpg";
import ChoraURL from "../img/heightmaps/chora.jpg";
import FallujahURL from "../img/heightmaps/fallujah.jpg";
import FoolsRoadURL from "../img/heightmaps/fool's road.jpg";
import GooseBayURL from "../img/heightmaps/goose bay.jpg";
import GorodokURL from "../img/heightmaps/gorodok.jpg";
import HarjuURL from "../img/heightmaps/harju.jpg";
import KamdeshURL from "../img/heightmaps/kamdesh.jpg";
import KohatURL from "../img/heightmaps/kohat.jpg";
import KokanURL from "../img/heightmaps/kokan.jpg";
import LashkarURL from "../img/heightmaps/lashkar.jpg";
import LogarURL from "../img/heightmaps/logar.jpg";
import ManicouaganURL from "../img/heightmaps/manicouagan.jpg";
import MestiaURL from "../img/heightmaps/mestia.jpg";
import MutahaURL from "../img/heightmaps/mutaha.jpg";
import NarvaURL from "../img/heightmaps/narva.jpg";
import SkorpoURL from "../img/heightmaps/skorpo.jpg";
import SumariURL from "../img/heightmaps/sumari.jpg";
import TallilURL from "../img/heightmaps/tallil.jpg";
import YehorivkaURL from "../img/heightmaps/yehorivka.jpg";

// Each map has a different size and require scaling w, y and z when calculating height
// MAPS['Name', size, X-offset, Y-offset, z-scaling, mapURL]
export const MAPS = [
    ["Al Basrah", 3200, 432, 432, 0.02294, AlBasrahURL],
    ["Anvil", 3060, 0, 0, 0.2, AnvilURL],
    ["Belaya", 3904, 62, 62, 0.0726, BelayaURL],
    ["Black Coast", 4625, 0, 0, 0.35, BlackCoastURL],
    ["Chora", 4064, 0, 0, 0.064, ChoraURL],
    ["Fallujah", 4080, 5700, 3800, 0.0401, FallujahURL],
    ["Fool's Road", 1736, -150, 0, 0.15744, FoolsRoadURL],
    ["Goose Bay", 4065, 0, 0, 0.2, GooseBayURL],
    ["Gorodok", 4340, 200, 200, 0.119, GorodokURL],
    ["Harju", 4065, 0, 0, 0.1, HarjuURL],
    ["Kamdesh", 4032, 0, 0, 0.190215, KamdeshURL],
    ["Kohat", 4617, -1000, 0, 1, KohatURL],
    ["Kokan", 2496, 0, 0, 0.0164, KokanURL],
    ["Lashkar", 4334, 0, 0, 0.28215, LashkarURL],
    ["Logar", 1761, 0, 0, 0.13575, LogarURL],
    ["Manicouagan", 4065, 0, 0, 0.3564, ManicouaganURL],
    ["Mestia", 2400, 0, 0, 0.41028, MestiaURL],
    ["Mutaha", 2755, -70, -100, 0.07071, MutahaURL],
    ["Narva", 2800, -100, -100, 0.0583, NarvaURL],
    ["Skorpo", 7600, 0, 0, 2.14515, SkorpoURL],
    ["Sumari", 1300, 0, 0, 0.035925, SumariURL],
    ["Tallil", 4680, -200, -200, 0.05275, TallilURL],
    ["Yehorivka", 5000, -8300, -8300, 0.2732, YehorivkaURL]
];

/**
 * Load the maps to the menu
 */
export function loadMaps() {
    var i;
    const MAPSLENGTH = MAPS.length;
    const MAP_SELECTOR = $(".dropbtn");

    // Initiate select2 object (https://select2.org/)
    if (globalData.debug.active) {
        MAP_SELECTOR.select2({
            dropdownCssClass: "dropbtn",
            dropdownParent: $("#mapSelector"),
            minimumResultsForSearch: -1, // Disable search
            placeholder: "DEBUG MODE"
        });
    } else {
        MAP_SELECTOR.select2({
            dropdownCssClass: "dropbtn",
            dropdownParent: $("#mapSelector"),
            minimumResultsForSearch: -1, // Disable search
            placeholder: "SELECT A MAP"
        });
    }

    // load maps into select2
    for (i = 0; i < MAPSLENGTH; i += 1) {
        MAP_SELECTOR.append("<option value=\"" + i + "\">" + MAPS[i][0] + "</option>");
    }
    loadHeatmap();
}

/**
 * Draw the selected Heatmaps in a hidden canvas
 */
export function drawHeatmap() {
    const IMG = new Image(); // Create new img element

    globalData.activeMap = $(".dropbtn").val();
    IMG.src = MAPS[globalData.activeMap][5];

    IMG.addEventListener("load", function() { // wait for the image to load or it does crazy stuff
        globalData.canvas.obj.drawImage(IMG, 0, 0, globalData.canvas.size, globalData.canvas.size);
        shoot(); // just in case there is already coordinates in inputs
    }, false);
}


/**
 * Load the heatmap to the canvas
 */
function loadHeatmap() {
    const IMG = new Image();
    globalData.canvas.obj = document.getElementById("canvas").getContext("2d", {willReadFrequently: true});

    IMG.addEventListener("load", function() {
        globalData.canvas.obj.drawImage(IMG, 0, 0, globalData.canvas.size, globalData.canvas.size); // Draw img at good scale
    }, false);

    if (globalData.debug.active) {
        // when in debug mode, display the heightmap and prepare keypads
        $("#canvas").css("display", "flex");
        $("#mortar-location").val(globalData.debug.DEBUG_MORTAR_COORD);
        $("#target-location").val(globalData.debug.DEBUG_TARGET_COORD);
        shoot();
    }
}