$.fn.graph = function(size, radius) {
  let points = [];
  let radiansDifference = Math.PI*2/size;
  console.log('rad', radiansDifference);

  $(this).append(`<div class="figure" style="width:${radius*2.5}px; height:${radius*2.5}px"></div>`);
  let center = new Point(0, 0);
  $(this).find(`.figure`).append(`<div class="point center" id="point-0"></div>`);
  for(let i=1; i<=size; i++) {
    let top = Math.cos(radiansDifference*(i-1)) * radius;
    let left = Math.sin(radiansDifference*(i-1)) * radius;
    console.log(i, top, left);
    points.push(new Point(top, left));
    $(this).find(`.figure .center`).append(`<div class="point" id="point-${i}" style="top:${top}px; left:${left}px"></div>`);
  }

  //pointer
  $(this).find(`.figure .center`).append(`<div class="point dragable" id="pointer" style="top:0; left:0"></div>`);
  $(this).find(`.figure .center .dragable`); //TODO
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

toRadians = (angle) => {
  return angle * (Math.PI / 180);
}
