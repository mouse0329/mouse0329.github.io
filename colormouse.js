window.onload = function () {
    const targetDiv = document.getElementById('colorTarget');
    const speechBubble = document.getElementById('speechBubble');

    function updateGreeting() {
        const hour = new Date().getHours();
        let greeting = "こんにちはチュー！";
        if (hour < 3) {
            greeting = "寝る時間チュー！早く寝るチュー！";
        } else if (hour < 5) {
            greeting = "早起きだねチュー！";
        } else if (hour < 11) {
            greeting = "おはようチュー！";
        } else if (hour < 18) {
            greeting = "こんにちはチュー！";
        } else {
            greeting = "こんばんはチュー！";
        }
        speechBubble.textContent = greeting;
    }
    updateGreeting();

    // 色データ（RGB）
    let current1 = { r: 128, g: 128, b: 128 };
    let target1 = randomColor();

    let current2 = { r: 128, g: 128, b: 128 };
    let target2 = randomColor();

    function randomColor() {
        return {
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256)
        };
    }

    function updateGradient() {
        const step = 0.5; // 色の変化量

        function stepColor(current, target) {
            ['r', 'g', 'b'].forEach((key) => {
                if (current[key] < target[key]) {
                    current[key] = Math.min(current[key] + step, target[key]);
                } else if (current[key] > target[key]) {
                    current[key] = Math.max(current[key] - step, target[key]);
                }
            });
        }

        stepColor(current1, target1);
        stepColor(current2, target2);

        // 色文字列に変換
        const color1 = `rgb(${current1.r}, ${current1.g}, ${current1.b})`;
        const color2 = `rgb(${current2.r}, ${current2.g}, ${current2.b})`;

        // 適用チュー！
        targetDiv.style.background = `linear-gradient(to right, ${color1}, ${color2})`;

        // 両方の色が目標に到達したら、新しい目標色チュー！
        const reached1 = current1.r === target1.r && current1.g === target1.g && current1.b === target1.b;
        const reached2 = current2.r === target2.r && current2.g === target2.g && current2.b === target2.b;

        if (reached1) target1 = randomColor();
        if (reached2) target2 = randomColor();

        requestAnimationFrame(updateGradient);
    }

    requestAnimationFrame(updateGradient);
}
