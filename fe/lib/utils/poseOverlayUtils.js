"use client";

const ACCENT = "#8AA39B";           // main greenish accent
const LINE_COLOR = "#C29B59";       // warm amber highlight
const ERROR_COLOR = "#A45A52";      // soft red for mistakes

/**
 * Draw a pose skeleton on canvas
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} keypoints - Pose model output
 * @param {number} threshold - min confidence
 */
export function drawPose(ctx, keypoints, threshold = 0.3) {
  if (!keypoints) return;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  keypoints.forEach((kp) => {
    if (kp.score < threshold) return;

    const { x, y } = kp;

    // Draw keypoint dot
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = ACCENT;
    ctx.fill();
  });

  drawSkeleton(ctx, keypoints, threshold);
}

/**
 * Draw connection lines between keypoints
 */
export function drawSkeleton(ctx, keypoints, threshold) {
  const adjacentPairs = [
    // Torso
    [11, 12],
    [11, 23],
    [12, 24],
    [23, 24],

    // Left Arm
    [11, 13],
    [13, 15],

    // Right Arm
    [12, 14],
    [14, 16],

    // Left Leg
    [23, 25],
    [25, 27],

    // Right Leg
    [24, 26],
    [26, 28],
  ];

  ctx.lineWidth = 3;

  adjacentPairs.forEach(([a, b]) => {
    const ptA = keypoints[a];
    const ptB = keypoints[b];

    if (!ptA || !ptB || ptA.score < threshold || ptB.score < threshold) return;

    ctx.beginPath();
    ctx.moveTo(ptA.x, ptA.y);
    ctx.lineTo(ptB.x, ptB.y);
    ctx.strokeStyle = LINE_COLOR;
    ctx.stroke();
  });
}

/**
 * Highlight incorrect pose joints
 * @param {*} ctx 
 * @param {*} joints - array of indices to highlight
 * @param {*} keypoints 
 */
export function highlightErrors(ctx, joints, keypoints) {
  joints.forEach((idx) => {
    const kp = keypoints[idx];
    if (!kp) return;

    ctx.beginPath();
    ctx.arc(kp.x, kp.y, 8, 0, 2 * Math.PI);
    ctx.strokeStyle = ERROR_COLOR;
    ctx.lineWidth = 4;
    ctx.stroke();
  });
}
