const playButton = document.getElementById('playButton');
const playIcon = document.getElementById('playIcon');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const problemArea = document.getElementById('problemArea');
const titleArea = document.querySelector('.title-area h2');

//====================================================
// 定数定義
//====================================================
const STAGE_NAMES = [
    "Do",
    "Coming Soon 2",
    "Coming Soon 3",
    "Coming Soon 4",
    "Coming Soon 5",
    "Coming Soon 6",
    "Coming Soon 7",
    "Coming Soon 8"
];

const STAGE_URLS = [
    "https://souchan917.github.io/Do/",    // Doのリンク
    "#",                         // Coming Soon
    "#",                         // Coming Soon
    "#",                         // Coming Soon
    "#",                         // Coming Soon
    "#",                         // Coming Soon
    "#",                         // Coming Soon
    "#"                          // Coming Soon
];

// サムネイル画像のパス定義
const PUZZLE_IMAGES = {
    0: "assets/images/puzzles/Do.png",      // Doのサムネイル
    1: "assets/images/puzzles/coming_soon.png",       // Coming Soon用サムネイル
    2: "assets/images/puzzles/coming_soon.png",
    3: "assets/images/puzzles/coming_soon.png",
    4: "assets/images/puzzles/coming_soon.png",
    5: "assets/images/puzzles/coming_soon.png",
    6: "assets/images/puzzles/coming_soon.png",
    7: "assets/images/puzzles/coming_soon.png"
};

//====================================================
// ゲーム状態管理
//====================================================
let currentStage = 0;
const MAX_STAGES = 8;

//====================================================
// リズムドット関連の機能
//====================================================
function createRhythmDots() {
    const dotsContainer = document.getElementById('rhythmDots');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    const dotCount = 8;

    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'rhythm-dot';
        if (i === currentStage) {
            dot.classList.add('active');
        }
        dotsContainer.appendChild(dot);
    }
}

//====================================================
// UI更新関数
//====================================================
function updatePuzzleImage() {
    let existingImage = problemArea.querySelector('.puzzle-image');
    if (existingImage) {
        existingImage.remove();
    }

    const imagePath = PUZZLE_IMAGES[currentStage];
    if (imagePath) {
        const imageElement = document.createElement('img');
        imageElement.src = imagePath;
        imageElement.className = 'puzzle-image';
        imageElement.alt = `Thumbnail ${currentStage}`;
        problemArea.insertBefore(imageElement, problemArea.firstChild);
    }
}

function updateStageContent() {
    titleArea.textContent = STAGE_NAMES[currentStage];
    updatePuzzleImage();
    updateBackgroundColor();
    createRhythmDots();
}

function updateBackgroundColor() {
    document.body.className = `stage-${currentStage}`;
}

//====================================================
// イベントリスナー
//====================================================
playButton.addEventListener('click', () => {
    if (STAGE_URLS[currentStage] !== "#") {
        window.location.href = STAGE_URLS[currentStage];
    }
});

prevButton.addEventListener('click', () => {
    if (currentStage > 0) {
        currentStage--;
        updateStageContent();
    }
});

nextButton.addEventListener('click', () => {
    if (currentStage < MAX_STAGES - 1) {
        currentStage++;
        updateStageContent();
    }
});

// ウィンドウリサイズ時の処理
window.addEventListener('resize', () => {
    createRhythmDots();
});

//====================================================
// 初期化
//====================================================
updateStageContent();