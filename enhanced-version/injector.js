// Get active tab's hostname
const site = window.location.hostname;

// Function to inject inline JavaScript code
function injectJSCode(code) {
  // Create a new `<script>` element
  const scriptElement = document.createElement("script");
  // Set the `type` attribute to `text/javascript`
  scriptElement.setAttribute("type", "text/javascript");
  // Set the `textContent` property for the inline JavaScript code
  scriptElement.textContent = code;
  // Append the `<script>` element to the document's `documentElement` element (before </html>)
  document.documentElement.appendChild(scriptElement);
}

// Function to inject external JavaScript file
function injectJSLink(src) {
  // Create a new `<script>` element
  const scriptElement = document.createElement("script");
  // Set the `type` attribute to `text/javascript`
  scriptElement.setAttribute("type", "text/javascript");
  // Set the `src` attribute for the URL of the external JavaScript file
  scriptElement.setAttribute("src", src);
  // Append the `<script>` element to the document's `documentElement` element (before </html>)
  document.documentElement.appendChild(scriptElement);
}

/* -------------------------------------------------------------- */
/* -------------------------------------------------------------- */
/* Example #1: inject same code into list of websites using array */
/* -------------------------------------------------------------- */
/* -------------------------------------------------------------- */
// Websites list to inject
// const injectTo = ["127.0.0.1", "www.google.com", "www.youtube.com"];
const injectTo = [];

// Inject codes into websites list
if (injectTo.includes(site)) {
  injectJSCode(`
        alert('A JavaScript Alert!');
        console.log('Some Inline JavaScript Code! 1');
        console.log('Some Inline JavaScript Code! 2');
        console.log('Some Inline JavaScript Code! 3');
    `);

  // // Inject external JS file #1
  // injectJSLink("https://cdn.jsdelivr.net/npm/chart.js");
}

/* ------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------- */
/* Example #2: inject same code into multiple websites using Logical OR (||) */
/* ------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------- */
// if (
//   site.includes("127.0.0.1") ||
//   site.includes("www.google.com") ||
//   site.includes("www.youtube.com") ||
//   site.includes("www.wikipedia.org")
// ) {
//   // Put your injection process right here
// }

/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
/* Example #3: inject separate codes into separate websites */
/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
if (site.includes("ppss.kr")) {
  document.getElementById("genesis-sidebar-primary").style.display = "none";
  document.getElementById("genesis-content").style.width = "960px";
  const titles = document.getElementsByClassName("widgettitle");
  for (const e of titles) e.style.display = "none";
}

if (site.includes("www.youtube.com")) {
  if (window.location.href === "https://www.youtube.com/") {
    window.location.href = "https://www.youtube.com/feed/playlists";
  }

  const removeElement = (querySelector) => {
    const target = document.querySelector(querySelector);
    if (target) target.parentNode.removeChild(target);
  };
  const removeAllChildElement = (querySelector) => {
    const target = document.querySelector(querySelector);
    if (target) target.innerHTML = "";
  };

  const appendElementAsChild = (querySelector, element) => {
    const target = document.querySelector(querySelector);
    if (target) target.appendChild(element);
  };

  const styleElement = (element, style) => {
    Object.assign(element.style, style);
  };

  const removeObserved = (querySelector) => {
    const observer = new MutationObserver((_, observer) => {
      const target = document.querySelector(querySelector);
      if (target) {
        target.parentNode.removeChild(target);
        observer.disconnect();
      }
    });

    const targetNode = document.body;
    observer.observe(targetNode, { childList: true });
  };

  const observeSubscription = (querySelector) => {
    const observer = new MutationObserver((_, observer) => {
      const target = document.querySelector(querySelector);
      if (target) {
        document
          .querySelectorAll(
            ".yt-simple-endpoint.style-scope.ytd-guide-entry-renderer"
          )
          .forEach((element) => {
            if (element.getAttribute("title").includes("개 더보기")) {
              element.click();
            }
          });

        const outOfSubscription = document.querySelectorAll(
          "#sections > ytd-guide-section-renderer:not(:nth-child(2))"
        );
        outOfSubscription.forEach((section) => {
          section.parentNode.removeChild(section);
        });

        observer.disconnect();
      }
    });
    const targetNode = document.body;
    observer.observe(targetNode, { childList: true });
  };

  observeSubscription("#sections > ytd-guide-section-renderer:nth-child(2)");
  removeObserved("#footer");
  // #sections > ytd-guide-section-renderer:nth-child(2)
  // #sections > ytd-guide-section-renderer:nth-child(3)
  // removeAllChildElement("#guide-inner-content");

  removeAllChildElement("#start");

  styleElement(document.querySelector("#start"), {
    display: "flex",
    "flex-direction": "row",
    gap: "15px",
  });

  // create div elements
  const helloWorldDiv = (() => {
    const e = document.createElement("div");
    e.textContent = "Hello World!";
    e.style.fontSize = "20px";
    e.style.color = "white";
    return e;
  })();

  const playlistBtn = (() => {
    const e = document.createElement("a");
    e.textContent = "재생 목록";
    e.href = "https://www.youtube.com/feed/playlists";
    styleElement(e, {
      fontSize: "17px",
      color: "green",
      fontWeight: "400",
      textDecoration: "none",
      cursor: "pointer",
    });
    e.addEventListener("mouseover", () => {
      styleElement(e, { color: "red", fontWeight: "600" });
    });
    e.addEventListener("mouseout", () => {
      styleElement(e, { color: "green", fontWeight: "600" });
    });
    return e;
  })();

  const subscriptions = (() => {
    const e = document.createElement("a");
    e.textContent = "구독";
    e.href = "https://www.youtube.com/feed/subscriptions";
    styleElement(e, {
      fontSize: "17px",
      color: "green",
      fontWeight: "400",
      textDecoration: "none",
      cursor: "pointer",
    });
    e.addEventListener("mouseover", () => {
      styleElement(e, { color: "red", fontWeight: "600" });
    });
    e.addEventListener("mouseout", () => {
      styleElement(e, { color: "green", fontWeight: "600" });
    });
    return e;
  })();

  document.querySelector("#start").appendChild(helloWorldDiv);
  document.querySelector("#start").appendChild(playlistBtn);
  document.querySelector("#start").appendChild(subscriptions);

  removeObserved(
    "#page-header > yt-page-header-renderer > yt-page-header-view-model > div > div.page-header-view-model-wiz__page-header-headline > div > yt-dynamic-text-view-model > h1 > span"
  );

  // 플레이리스트_가운데_정렬
  (() => {
    const observer = new MutationObserver((_, observer) => {
      const target = document.querySelector("#primary");
      if (target) {
        styleElement(target, {
          padding: "40px",
          display: "flex",
          "flex-direction": "row",
        });

        observer.disconnect();
      }
    });
    const targetNode = document.body;
    observer.observe(targetNode, { childList: true });
  })();
}
