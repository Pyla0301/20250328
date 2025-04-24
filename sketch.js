let seaweeds = []; // 儲存水草的陣列
let colors = ['#006d77', '#83c5be', '#e7c6ff', '#ffddd2', '#e29578']; // 五種指定顏色

function setup() {
  // 設定畫布大小為視窗大小
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'absolute'); // 設定畫布為絕對定位
  canvas.style('z-index', '10'); // 設定畫布的 z-index 為 10，確保在 iframe 上層
  canvas.style('pointer-events', 'none'); // 讓畫布不攔截滑鼠事件，確保 iframe 可操作

  initializeSeaweeds(); // 初始化水草

  // 創建 iframe
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/'); // 設定 iframe 的內容
  iframe.style('position', 'absolute');
  iframe.style('top', '10%'); // 距離視窗頂部 10%
  iframe.style('left', '10%'); // 距離視窗左側 10%
  iframe.style('width', '80%'); // 寬度為視窗的 80%
  iframe.style('height', '80%'); // 高度為視窗的 80%
  iframe.style('border', 'none'); // 移除邊框
  iframe.style('z-index', '1'); // 設定 iframe 的 z-index 為 1，確保在畫布下層
}

function draw() {
  clear(); // 清除畫布背景，讓畫布透明

  // 繪製每條水草
  for (let i = 0; i < seaweeds.length; i++) {
    let seaweed = seaweeds[i];

    // 計算搖晃角度，越靠近底部搖晃越慢
    let swayAngle = sin(frameCount * seaweed.swayFrequency + seaweed.swayOffset) * 20;

    // 計算線的頂端位置
    let topX = seaweed.x + swayAngle;
    let topY = height - seaweed.height;

    // 設定水草顏色
    stroke(seaweed.color);
    strokeWeight(seaweed.thickness); // 設定水草的粗細

    // 繪製水草線
    line(seaweed.x, height, topX, topY);
  }
}

// 當視窗大小改變時重新調整畫布和水草
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 調整畫布大小
  initializeSeaweeds(); // 重新初始化水草
}

// 初始化水草
function initializeSeaweeds() {
  seaweeds = []; // 清空水草陣列
  for (let i = 0; i < 90; i++) {
    let x = random(width); // 隨機的 x 座標
    let height = random(40, 120); // 隨機高度介於 40 到 120
    let color = random(colors); // 從五種顏色中隨機選擇
    let thickness = random(10, 20); // 隨機粗細介於 10 到 20
    let swayFrequency = random(0.02, 0.08); // 隨機搖晃頻率
    let swayOffset = random(TWO_PI); // 隨機搖晃偏移量
    seaweeds.push({ x, height, color, thickness, swayFrequency, swayOffset });
  }
}