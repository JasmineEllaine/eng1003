/*
function getCircumference(radius) {
    return 2*radius*Math.PI;
}

function getArea(radius) {
    return Math.PI*radius*radius
}
*/

let initRadius = 1, circumference, area, ratio;

circumference = 2*initRadius*Math.PI;
area = Math.PI*initRadius*initRadius;
ratio = area/circumference;
debug("Radius,", initRadius, "ratio:", ratio);

while (ratio < 30) {
    initRadius++
    circumference = 2*initRadius*Math.PI;
    area = Math.PI*initRadius*initRadius;
    ratio = area/circumference;
    debug("Radius,", initRadius, "ratio:", ratio);
}