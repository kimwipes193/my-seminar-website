console.log('JavaScriptが動いています');

gsap.registerPlugin(ScrollTrigger);

// タイトルを小さくするアニメーション
gsap.to(".logo", {
  scale: 0.5,
  x: 50,
  ease: "power10.out",
  scrollTrigger: {
    trigger: "html",
    start: "top top",
    end: "100 top",
    scrub: 1.5,
  },
});

// サブタイトルの位置移動
gsap.to(".sub-logo", {
  x: () => window.innerWidth * -0.007, // 画面幅の5%を基準に調整
  y: () => window.innerHeight * -0.08, // 画面高さの10%を基準に調整
  ease: "power2.out",
  scrollTrigger: {
    trigger: "html",
    start: "top top",
    end: "100 top",
    scrub: 1.5,
  },
});

// キャッチコピーをフェードアウト
gsap.to(".catch-copy", {
  opacity: 0,
  scrollTrigger: {
    trigger: "html",
    start: "top top",
    end: "100 top",
    scrub: 1.5,
  },
});

const texts = ["エントリーはこちらから", "選考フローを知ろう"]; // 切り替えるテキスト
let currentIndex = 0; // 現在のテキストのインデックス

document.addEventListener("DOMContentLoaded", function () {
  const typingTarget = document.getElementById("typing-text");

  if (!typingTarget) {
    console.error("'.typing-text' 要素が見つかりません。HTMLを確認してください。");
    return;
  }

  function typeText(text) {
    let index = 0;
    typingTarget.textContent = ""; // テキストをリセット

    function typing() {
      if (index < text.length) {
        typingTarget.textContent += text[index];
        index++;
        setTimeout(typing, 100); // タイピング速度
      }
    }

    typing();
  }

  function switchText() {
    // 次のテキストに切り替え
    currentIndex = (currentIndex + 1) % texts.length;
    typeText(texts[currentIndex]);
  }

  // 初回のテキストを表示
  typeText(texts[currentIndex]);
  setInterval(switchText, 10000); // 10秒ごとに切り替え
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollWindow = document.getElementById("scroll-window");
  const scrollText = scrollWindow.querySelector(".scroll-text");

  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    // 一番下に到達した場合
    if (scrollTop + clientHeight >= scrollHeight) {
      scrollWindow.classList.add("shrink"); // ウィンドウを潰す
      setTimeout(() => {
        scrollWindow.classList.remove("shrink");
        scrollWindow.classList.add("expand"); // 元に戻す

        // テキストを「PAGE TOP」に変更（重複を防ぐためにリセット）
        if (scrollText.textContent !== "PAGE TOP") {
          scrollText.textContent = "PAGE TOP";
        }
      }, 600); // 潰れるアニメーションの後に実行
    } else {
      scrollWindow.classList.remove("expand"); // 通常状態に戻す

      // テキストを「SCROLL DOWN」に戻す（重複を防ぐためにリセット）
      if (scrollText.textContent !== "SCROLL DOWN") {
        scrollText.textContent = "SCROLL DOWN";
      }
    }
  });

  // 「PAGE TOP」をクリックした際にトップへスクロール
  scrollWindow.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollWindow = document.getElementById("scroll-window");

  // スクロール時の位置変更を無効化
  window.removeEventListener("scroll", function () {
    // このイベントリスナーを削除して位置変更を防ぐ
  });

  // 固定位置を設定
  scrollWindow.style.position = "fixed";
  scrollWindow.style.bottom = "10%"; // 真下に固定
  scrollWindow.style.left = "5%"; // 左端から少し右に固定
});

document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.getElementById("loading-screen");
  const loadingPercentage = document.getElementById("loading-percentage");
  let progress = 0;

  // ロード進行状況をシミュレート
  const interval = setInterval(() => {
    progress += 1;
    loadingPercentage.textContent = progress;

    if (progress >= 100) {
      clearInterval(interval);

      // フェードアウト
      loadingScreen.style.transition = "opacity 1s ease"; // フェードアウトのアニメーション
      loadingScreen.style.opacity = "0";

      setTimeout(() => {
        loadingScreen.style.display = "none"; // 完全に非表示
      }, 1000); // フェードアウトの時間と一致
    }
  }, 30); // 30msごとに進行
});

document.addEventListener("click", (e) => {
  const effect = document.querySelector(".click-effect");
  effect.style.top = `${e.clientY}px`;
  effect.style.left = `${e.clientX}px`;
  effect.style.transform = "scale(1)";
  effect.style.opacity = "1";

  setTimeout(() => {
    effect.style.transform = "scale(0)";
    effect.style.opacity = "0";
  }, 300);
});

document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".cursor");
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});

document.addEventListener("DOMContentLoaded", function () {
  const highlight = document.querySelector(".catch-copy .highlight");

  if (highlight) {
    // 初回アニメーションを実行
    setTimeout(() => {
      highlight.classList.add("show");
    }, 500); // ページ読み込み後に少し遅れて実行
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollMessage = document.querySelector(".scroll-message");

  if (scrollMessage) {
    // GSAPを使用してスクロール時にメッセージを表示
    gsap.fromTo(
      scrollMessage,
      { opacity: 0, y: 50 }, // 初期状態
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: scrollMessage,
          start: "top 140%", // ビューポートの95%に達したら開始
          toggleActions: "play none none none", // 一度だけ再生
        },
      }
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const aboutTitle = document.querySelector(".about-title");
  const aboutDescription = document.querySelector(".about-description");

  // ABOUT US セクションが表示されたときにアニメーションを実行
  ScrollTrigger.create({
    trigger: "#about-us",
    start: "top 80%", // ビューポートの80%に達したら開始
    onEnter: () => {
      aboutTitle.classList.add("show");
      aboutDescription.classList.add("show");
    },
  });

  // ナビゲーションのABOUT USをクリックしたときに自動スクロール
  const aboutUsLink = document.querySelector('a[href="#about-us"]');
  aboutUsLink.addEventListener("click", (e) => {
    e.preventDefault(); // デフォルトのリンク動作を無効化
    document.querySelector("#about-us").scrollIntoView({
      behavior: "smooth", // スムーズスクロール
    });
  });
});

