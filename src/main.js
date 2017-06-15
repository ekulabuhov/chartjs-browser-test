import Chart from 'chart.js';
import CanvasRenderingContext2D from 'react-native-canvas';

//Create context
var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
var gl = canvas.getContext('webgl');

// These are calculated by chartjs based on the parent
var canvasWidth = 800,
  canvasHeight = 400;

var myCtx = new CanvasRenderingContext2D(gl, canvasWidth, canvasHeight);
myCtx
  .loadFontAsync('node_modules/react-native-canvas/node_modules/pureimage/tests/fonts/SourceSansPro-Regular.ttf')
  .then(initChartJs);

function initChartJs() {
  var ctx = document.createElement('canvas').getContext('2d');
  Object.defineProperty(ctx, 'canvas', {
    get: function() {
      return ctx._canvas;
    },
    set: function(value) {
      ctx._canvas = value;
    }
  });
  ctx.canvas = canvas;
  canvas.getContext = () => ctx;


  // Copy all the methods and functions from original CanvasRenderingContext2D
  // Wrap it in a function that also logs the name and arguments

  // Specify additional params we want to log for each function
  let extraParams = {
    'fillText': ['textBaseline', 'textAlign', 'font']
  }

  Reflect.ownKeys(CanvasRenderingContext2D.prototype).forEach((key) => {
    ctx[key] = function() {
      // Gather extra params
      let extras = {};
      if (extraParams[key]) {
        extraParams[key].forEach((paramKey) => extras[paramKey] = this[paramKey]);
      }

      console.log(key, arguments, extras);
      return CanvasRenderingContext2D.prototype[key].apply(ctx, arguments);
    }
  })
  Object.keys(myCtx).forEach((key) => {
    ctx[key] = myCtx[key];
  })

  //ctx.fillText('Helloo', 0, 0);
  var ctx = canvas.getContext("2d");
  window.ctx = ctx;

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
